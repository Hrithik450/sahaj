#!/usr/bin/env node

// Only run this local as it required node.js runtime
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LANGUAGES } from "../lib/data/languages.js";
import {
  bankingPageVoicePrompt,
  governmentPageVoicePrompt,
} from "../lib/data/page-voice.js";
import { synthesizeGeminiSpeech } from "../lib/gemini-tts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const VOICE_JOBS = [
  {
    name: "government page",
    outputDir: path.join(rootDir, "public/audio/pages"),
    fileName: (language) => `government-${language.id}.wav`,
    prompt: (language) => governmentPageVoicePrompt(language.id),
  },
  {
    name: "banking page",
    outputDir: path.join(rootDir, "public/audio/pages"),
    fileName: (language) => `banking-${language.id}.wav`,
    prompt: (language) => bankingPageVoicePrompt(language.id),
  },
];

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function generateJob(job) {
  await mkdir(job.outputDir, { recursive: true });

  for (const language of LANGUAGES) {
    const filePath = path.join(job.outputDir, job.fileName(language));

    if (await fileExists(filePath)) {
      console.log(`Skipping ${job.name} ${language.id} — already exists`);
      continue;
    }

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

  console.log("Done. Page voice audio is stored in public/audio/pages/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
