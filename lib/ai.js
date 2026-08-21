import { BANK_NOTICES } from "@/data/bank/notices";
import { BANK_TRANSACTIONS } from "@/data/bank/transactions";
import { GOV_NOTICES } from "@/data/gov/notices";
import { pickLang } from "@/lib/i18n";

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
    source: "fallback",
  };
}

export function findFallbackForText(text, domain, language = "en") {
  const notices = noticesForDomain(domain);
  const matched =
    notices.find((notice) => text.trim() === notice.text.trim()) ||
    notices.find((notice) => text.includes(notice.text.slice(0, 48))) ||
    notices[0];

  return formatNoticeFallback(matched, language);
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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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

function buildPrompt({ text, language, need, domain }) {
  return `You simplify government and banking notices for people in India.
Return ONLY valid JSON with this shape:
{"summary":"...","actions":["..."],"warnings":["..."],"documents":["..."],"plainTerms":[{"term":"...","meaning":"..."}]}

Rules:
- Language preference code: ${language}. Write summary and actions in that language when possible.
- Accessibility need: ${need || "general"}. Use short sentences and plain words.
- Domain: ${domain}.
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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
    source: "gemini",
  };
}
