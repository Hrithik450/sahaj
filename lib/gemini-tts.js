export const GEMINI_TTS_MODEL =
  process.env.GEMINI_TTS_MODEL ?? "gemini-3.1-flash-tts-preview";

const LANGUAGE_CODES = {
  en: "en-IN",
  kn: "kn-IN",
  hi: "hi-IN",
};

const DEFAULT_VOICE = "Kore";

export function pcmToWav(
  pcmBuffer,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16,
) {
  const pcm = Buffer.isBuffer(pcmBuffer) ? pcmBuffer : Buffer.from(pcmBuffer);
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);

  return Buffer.concat([header, pcm]);
}

function parsePcmFromResponse(payload) {
  const part = payload?.candidates?.[0]?.content?.parts?.[0];
  const inlineData = part?.inlineData;
  if (!inlineData?.data) return null;

  const pcm = Buffer.from(inlineData.data, "base64");
  const mimeType = inlineData.mimeType || "";
  const rateMatch = mimeType.match(/rate=(\d+)/);
  const sampleRate = rateMatch ? Number(rateMatch[1]) : 24000;

  return { pcm, sampleRate };
}

export async function synthesizeGeminiSpeech(
  text,
  { language = "en", voice = DEFAULT_VOICE, model = GEMINI_TTS_MODEL, style } = {},
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !text?.trim()) return null;

  const languageCode = LANGUAGE_CODES[language] || LANGUAGE_CODES.en;
  const inputText = style?.trim()
    ? `${style.trim()}\n\n${text.trim()}`
    : text.trim();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: inputText }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            languageCode,
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice },
            },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    console.error("Gemini TTS error:", response.status, await response.text());
    return null;
  }

  const payload = await response.json();
  const parsed = parsePcmFromResponse(payload);
  if (!parsed) return null;

  return {
    wav: pcmToWav(parsed.pcm, parsed.sampleRate),
    sampleRate: parsed.sampleRate,
    source: "gemini",
    model,
  };
}
