import { BANK_NOTICES } from "@/lib/data/bank/notices";
import { BANK_TRANSACTIONS } from "@/lib/data/bank/transactions";
import { GOV_NOTICES } from "@/lib/data/gov/notices";
import { findCompanionFallback } from "@/lib/companion";
import { naturalSpeechForNotice } from "@/lib/data/simplifier-speech";
import { pickLang } from "@/lib/i18n";

const GEMINI_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL ?? "gemini-3.6-flash";

function noticesForDomain(domain) {
  return domain === "bank" ? BANK_NOTICES : GOV_NOTICES;
}

export function formatNoticeFallback(notice, language = "en") {
  return {
    summary: pickLang(notice.fallback.summary, language),
    actions: notice.fallback.actions.map((item) => pickLang(item, language)),
    warnings: notice.fallback.warnings
      ? notice.fallback.warnings.map((item) => pickLang(item, language))
      : [],
    documents: notice.fallback.documents
      ? notice.fallback.documents.map((item) => pickLang(item, language))
      : [],
    plainTerms: notice.fallback.plainTerms || [],
    speech: naturalSpeechForNotice(notice, language),
    source: "fallback",
  };
}

export function findFallbackForText(text, domain, language = "en") {
  const notices = noticesForDomain(domain);
  const trimmed = text.trim();
  if (!trimmed) return null;

  const exact = notices.find((notice) => trimmed === notice.text.trim());
  if (exact) return formatNoticeFallback(exact, language);

  const partial = notices.find((notice) => {
    const noticeText = notice.text.trim();
    const prefix = noticeText.slice(0, 80);
    return (
      trimmed.includes(prefix) ||
      noticeText.includes(trimmed.slice(0, Math.min(trimmed.length, 80)))
    );
  });
  if (partial) return formatNoticeFallback(partial, language);

  return null;
}

export function formatTransactionFallback(transaction, language = "en") {
  return {
    summary: pickLang(transaction.fallback.summary, language),
    checks: transaction.fallback.checks.map((item) => pickLang(item, language)),
    suspicious: false,
    source: "fallback",
  };
}

export function findTransactionFallback(text, language = "en") {
  const matched =
    BANK_TRANSACTIONS.find((item) => text.trim() === item.text.trim()) ||
    BANK_TRANSACTIONS.find((item) => text.includes(item.text.slice(0, 40))) ||
    BANK_TRANSACTIONS[0];

  return formatTransactionFallback(matched, language);
}

function buildExplainPrompt({ text, language, need }) {
  return `You explain Indian bank SMS and UPI transaction alerts in plain language.
Return ONLY valid JSON:
{"summary":"...","checks":["..."],"suspicious":false}

Rules:
- Language preference code: ${language}.
- Accessibility need: ${need || "general"}. Use short actionable bullets.
- Explain what happened, what to verify, and when to call the bank.

Transaction text:
${text}`;
}

export async function explainTransaction({ text, language, need }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: buildExplainPrompt({ text, language, need }) }],
          },
        ],
      }),
    },
  );

  if (!response.ok) return null;

  const payload = await response.json();
  const rawText = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const parsed = parseModelJson(rawText);

  return {
    summary: parsed.summary || "",
    checks: Array.isArray(parsed.checks) ? parsed.checks : [],
    suspicious: Boolean(parsed.suspicious),
    source: "gemini",
  };
}

function buildChatSystemPrompt({ language, need, domain }) {
  const scope =
    domain === "bank"
      ? "Indian banking (accounts, UPI, KYC, fraud, loans)"
      : "Indian government services (certificates, forms, local offices)";

  return `You are Sahaj, a patient accessibility companion for ${scope}.
Language code: ${language}. Accessibility need: ${need || "general"}.
Use short sentences, plain words, and bullet points when helpful.
Give practical next steps. Stay under 120 words unless the user asks for more detail.
Do not invent official phone numbers.`;
}

function buildChatContents({ message, history = [] }) {
  const contents = [];

  for (const item of history.slice(-6)) {
    if (!item?.content) continue;
    contents.push({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content }],
    });
  }

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  return contents;
}

function createTextStream(text) {
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      const chunkSize = 24;
      let index = 0;

      function pushNext() {
        if (index >= text.length) {
          controller.close();
          return;
        }

        controller.enqueue(
          encoder.encode(text.slice(index, index + chunkSize)),
        );
        index += chunkSize;
        setTimeout(pushNext, 12);
      }

      pushNext();
    },
  });
}

async function createGeminiChatStream({
  message,
  language,
  need,
  domain,
  history,
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TEXT_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: buildChatSystemPrompt({ language, need, domain }) }],
        },
        contents: buildChatContents({ message, history }),
      }),
    },
  );

  if (!response.ok || !response.body) return null;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let previousText = "";

  return new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;

            const payload = line.slice(6).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              const parsed = JSON.parse(payload);
              const chunkText =
                parsed?.candidates?.[0]?.content?.parts?.[0]?.text || "";

              if (!chunkText) continue;

              const delta = chunkText.startsWith(previousText)
                ? chunkText.slice(previousText.length)
                : chunkText;
              previousText = chunkText;

              if (delta) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // Ignore malformed SSE chunks.
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });
}

export async function createChatStream({
  message,
  language = "en",
  need = null,
  domain = "gov",
  history = [],
}) {
  const geminiStream = await createGeminiChatStream({
    message,
    language,
    need,
    domain,
    history,
  });

  if (geminiStream) {
    return { stream: geminiStream, source: "gemini" };
  }

  const fallbackText = findCompanionFallback(message, domain, language);
  return { stream: createTextStream(fallbackText), source: "fallback" };
}

function simplifyLanguageRule(language) {
  if (language === "kn") {
    return "Language: kn (Kannada). Write summary, actions, warnings, and speech ENTIRELY in Kannada (ಕನ್ನಡ script). Use simple spoken Kannada. Only keep unavoidable terms like Aadhaar, PAN, KYC, UPI in Latin script. Do not mix English sentences.";
  }
  if (language === "hi") {
    return "Language: hi (Hindi). Write summary, actions, warnings, and speech ENTIRELY in Hindi (देवनागरी). Use simple spoken Hindi. Only keep unavoidable terms like Aadhaar, PAN, KYC, UPI in Latin script. Do not mix English sentences.";
  }
  return "Language: en (English). Write entirely in English.";
}

function buildPrompt({ text, language, need, domain }) {
  return `You simplify government and banking notices for people in India.
Return ONLY valid JSON with this shape:
{"summary":"...","actions":["..."],"warnings":["..."],"documents":["..."],"plainTerms":[{"term":"...","meaning":"..."}],"speech":"..."}

Rules:
- ${simplifyLanguageRule(language)}
- Accessibility need: ${need || "general"}. Use short sentences and plain words on screen.
- Domain: ${domain}.
- summary: one short plain-language sentence for the screen.
- actions: short bullet items for the screen (not for reading aloud as a list).
- speech: a separate natural conversational monologue for text-to-speech  warm, calm, like a friend explaining the letter. Use connected sentences in the requested language only, not bullets or numbered steps. Do not say "plain summary" or "what to do next". Weave the same facts into flowing speech (about 40–80 words).
- No markdown. No extra keys.

Text to simplify:
${text}`;
}

function parseModelJson(raw) {
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
}

export async function simplifyText({ text, language, need, domain }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TEXT_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: buildPrompt({ text, language, need, domain }) }],
          },
        ],
      }),
    },
  );

  if (!response.ok) return null;

  const payload = await response.json();
  const rawText = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const parsed = parseModelJson(rawText);

  return {
    summary: parsed.summary || "",
    actions: Array.isArray(parsed.actions) ? parsed.actions : [],
    warnings: Array.isArray(parsed.warnings) ? parsed.warnings : [],
    documents: Array.isArray(parsed.documents) ? parsed.documents : [],
    plainTerms: Array.isArray(parsed.plainTerms) ? parsed.plainTerms : [],
    speech: typeof parsed.speech === "string" ? parsed.speech.trim() : "",
    source: "gemini",
  };
}
