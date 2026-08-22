#!/usr/bin/env node

// Only run this local as it required node.js runtime
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LANGUAGES } from "../lib/data/languages.js";
import { governmentFeaturesVoicePrompt } from "../lib/data/features-voice.js";
import { heroVoicePrompt } from "../lib/data/hero-voice.js";
import { synthesizeGeminiSpeech } from "../lib/gemini-tts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const VOICE_JOBS = [
  {
    name: "hero",
    outputDir: path.join(rootDir, "public/audio/hero"),
    fileName: (language) => `${language.id}.wav`,
    prompt: (language) => heroVoicePrompt(language.id),
  },
  {
    name: "government features",
    outputDir: path.join(rootDir, "public/audio/features"),
    fileName: (language) => `government-${language.id}.wav`,
    prompt: (language) => governmentFeaturesVoicePrompt(language.id),
  },
];

async function generateJob(job) {
  await mkdir(job.outputDir, { recursive: true });

  for (const language of LANGUAGES) {
    const prompt = job.prompt(language);
    console.log(`Generating ${job.name} ${language.id} (${language.label})...`);

    const result = await synthesizeGeminiSpeech(prompt, {
      language: language.id,
    });
    if (!result) {
      throw new Error(
        `Failed to generate ${job.name} audio for ${language.id}`,
      );
    }

    const filePath = path.join(job.outputDir, job.fileName(language));
    await writeFile(filePath, result.wav);
    console.log(`Wrote ${filePath} (${result.wav.length} bytes)`);
  }
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Set GEMINI_API_KEY before running this script.");
    process.exit(1);
  }

  for (const job of VOICE_JOBS) {
    await generateJob(job);
  }

  console.log("Done. Voice audio files are stored in public/audio/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
