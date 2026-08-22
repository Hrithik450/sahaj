const LANG_MAP = {
  en: "eng",
  hi: "hin+eng",
  kn: "kan+eng",
};

export async function extractTextFromImage(file, language = "en") {
  const { createWorker } = await import("tesseract.js");
  const langs = LANG_MAP[language] ?? LANG_MAP.en;
  const worker = await createWorker(langs);
  const { data } = await worker.recognize(file);
  await worker.terminate();
  return data.text.trim();
}
