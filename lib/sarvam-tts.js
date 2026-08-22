import { request as httpsRequest } from "node:https";

const LANGUAGE_CODES = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

/** Female voice closest to Gemini Kore  clear, warm, natural (bulbul:v3). */
const DEFAULT_SPEAKER = process.env.SARVAM_TTS_SPEAKER ?? "priya";
const DEFAULT_MODEL = process.env.SARVAM_TTS_MODEL ?? "bulbul:v3";
const REQUEST_TIMEOUT_MS = 60000;

const SARVAM_KEY_HINT =
  "SARVAM_API_KEY is missing or invalid. Create a key at https://dashboard.sarvam.ai/key-management  it should start with sk_, not your Gemini/Google key (AQ.*).";

export function readSarvamApiKey() {
  const raw = process.env.SARVAM_API_KEY?.trim();
  if (!raw) return null;

  const key = raw.replace(/^["']|["']$/g, "");
  if (key.startsWith("AQ.")) return null;
  return key;
}

function postJson(url, headers, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = httpsRequest(
      url,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
        timeout: REQUEST_TIMEOUT_MS,
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 500,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );

    req.on("timeout", () => {
      req.destroy(new Error("Sarvam TTS request timed out"));
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

export async function synthesizeSarvamSpeech(
  text,
  { language = "en", speaker = DEFAULT_SPEAKER, model = DEFAULT_MODEL } = {},
) {
  const apiKey = readSarvamApiKey();
  if (!apiKey || !text?.trim()) {
    const err = new Error(SARVAM_KEY_HINT);
    err.code = "invalid_api_key_error";
    throw err;
  }

  const language_code = LANGUAGE_CODES[language] || LANGUAGE_CODES.en;

  const { status, body } = await postJson(
    "https://api.sarvam.ai/text-to-speech",
    { "api-subscription-key": apiKey },
    {
      text: text.trim(),
      language_code,
      model,
      speaker,
      speech_sample_rate: 24000,
      output_audio_codec: "wav",
    },
  );

  if (status < 200 || status >= 300) {
    let code = "sarvam_error";
    try {
      const parsed = JSON.parse(body);
      code = parsed?.error?.code || code;
    } catch {
      // ignore JSON parse errors
    }

    const err = new Error(
      code === "invalid_api_key_error"
        ? SARVAM_KEY_HINT
        : `Sarvam TTS failed (${status})`,
    );
    err.code = code;
    throw err;
  }

  const payload = JSON.parse(body);
  const audioBase64 = payload?.audios?.[0];
  if (!audioBase64) {
    throw new Error("Sarvam TTS returned no audio data");
  }

  const wav = Buffer.from(audioBase64, "base64");
  return { wav, source: "sarvam", model };
}
