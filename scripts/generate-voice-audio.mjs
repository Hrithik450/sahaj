#!/usr/bin/env node

// Only run this local as it required node.js runtime
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BANK_NOTICES } from "../lib/data/bank/notices.js";
import { LANGUAGES } from "../lib/data/languages.js";
import {
  featureVoiceAudioFileName,
  featureVoicePrompt,
  listFeatureVoiceEntries,
  NATURAL_GUIDE_FEATURES,
} from "../lib/data/feature-voice.js";
import {
  bankingPageVoicePrompt,
  governmentPageVoicePrompt,
} from "../lib/data/page-voice.js";
import { sampleNoticeSpeechPrompt } from "../lib/data/sample-voice.js";
import { GOV_NOTICES } from "../lib/data/gov/notices.js";
import { synthesizeGeminiSpeech } from "../lib/gemini-tts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const args = process.argv.slice(2);
const naturalOnly = args.includes("--natural");
const force = args.includes("--force");

/** 3 tasks × 3 languages = 9 concurrent Gemini TTS calls per batch */
const TASKS_PER_BATCH = 3;
const BATCH_SIZE = TASKS_PER_BATCH * LANGUAGES.length;

const FEATURE_OUTPUT_DIR = path.join(rootDir, "public/audio/features");

const PAGE_JOBS = [
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

const ALL_FEATURE_JOBS = listFeatureVoiceEntries().map(({ domainKey, featureId }) => ({
  name: `${domainKey} ${featureId}`,
  outputDir: FEATURE_OUTPUT_DIR,
  fileName: (language) =>
    featureVoiceAudioFileName(domainKey, featureId, language.id),
  prompt: (language) => featureVoicePrompt(domainKey, featureId, language.id),
}));

const NATURAL_FEATURE_JOBS = NATURAL_GUIDE_FEATURES.map(
  ({ domainKey, featureId }) => ({
    name: `${domainKey} ${featureId} (natural)`,
    outputDir: FEATURE_OUTPUT_DIR,
    fileName: (language) =>
      featureVoiceAudioFileName(domainKey, featureId, language.id),
    prompt: (language) => featureVoicePrompt(domainKey, featureId, language.id),
  }),
);

const SAMPLE_JOBS = [
  {
    name: `gov sample ${GOV_NOTICES[0].id}`,
    outputDir: path.join(rootDir, "public/audio/samples"),
    fileName: (language) => `${GOV_NOTICES[0].id}-${language.id}.wav`,
    prompt: (language) => sampleNoticeSpeechPrompt(GOV_NOTICES[0], language.id),
  },
  {
    name: `bank sample ${BANK_NOTICES[0].id}`,
    outputDir: path.join(rootDir, "public/audio/samples"),
    fileName: (language) => `${BANK_NOTICES[0].id}-${language.id}.wav`,
    prompt: (language) => sampleNoticeSpeechPrompt(BANK_NOTICES[0], language.id),
  },
];

function resolveVoiceJobs() {
  if (naturalOnly) return NATURAL_FEATURE_JOBS;
  return [...PAGE_JOBS, ...ALL_FEATURE_JOBS, ...SAMPLE_JOBS];
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectPendingWork(jobs) {
  const pending = [];

  for (const job of jobs) {
    await mkdir(job.outputDir, { recursive: true });

    for (const language of LANGUAGES) {
      const filePath = path.join(job.outputDir, job.fileName(language));

      if (!force && (await fileExists(filePath))) {
        console.log(`Skipping ${job.name} ${language.id} — already exists`);
        continue;
      }

      pending.push({ job, language, filePath });
    }
  }

  return pending;
}

async function generateOne({ job, language, filePath }) {
  const label = `${job.name} ${language.id} (${language.label})`;
  console.log(`Generating ${label}...`);

  const prompt = job.prompt(language);
  const result = await synthesizeGeminiSpeech(prompt, {
    language: language.id,
  });

  if (!result) {
    throw new Error(`Failed to generate ${label}`);
  }

  await writeFile(filePath, result.wav);
  console.log(`Wrote ${filePath} (${result.wav.length} bytes)`);
}

function buildBatches(pending) {
  const byJob = new Map();

  for (const item of pending) {
    const key = item.job.name;
    if (!byJob.has(key)) byJob.set(key, { job: item.job, items: [] });
    byJob.get(key).items.push(item);
  }

  const jobGroups = [...byJob.values()];
  const batches = [];

  for (let i = 0; i < jobGroups.length; i += TASKS_PER_BATCH) {
    const slice = jobGroups.slice(i, i + TASKS_PER_BATCH);
    const batchItems = slice.flatMap((group) => group.items);
    batches.push({
      taskNames: slice.map((group) => group.job.name),
      items: batchItems,
    });
  }

  return batches;
}

async function runBatch(batchIndex, batch) {
  console.log(
    `\nBatch ${batchIndex + 1}: ${batch.taskNames.join(", ")} (${batch.items.length} files, max ${BATCH_SIZE})`,
  );

  const results = await Promise.allSettled(
    batch.items.map((item) => generateOne(item)),
  );

  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length > 0) {
    for (const result of failed) {
      console.error(result.reason?.message ?? result.reason);
    }
    throw new Error(
      `Batch ${batchIndex + 1} had ${failed.length} failed generation(s).`,
    );
  }
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Set GEMINI_API_KEY before running this script.");
    process.exit(1);
  }

  const voiceJobs = resolveVoiceJobs();
  const pending = await collectPendingWork(voiceJobs);

  if (pending.length === 0) {
    console.log("Nothing to generate — all audio files already exist.");
    return;
  }

  const modeLabel = naturalOnly ? "natural guided tasks only" : "all voice jobs";
  const forceLabel = force ? "force overwrite" : "skip existing";

  console.log(
    `Mode: ${modeLabel} (${forceLabel}). Pending: ${pending.length} file(s) (${TASKS_PER_BATCH} tasks × ${LANGUAGES.length} languages per batch)`,
  );

  const batches = buildBatches(pending);

  for (let i = 0; i < batches.length; i++) {
    await runBatch(i, batches[i]);
  }

  console.log("\nDone. Audio is stored under public/audio/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
