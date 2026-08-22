import {
  bankingPageVoiceAudioPath,
  featureVoiceAudioPath,
  governmentPageVoiceAudioPath,
  heroVoiceAudioPath,
  landingGovernmentFeaturesAudioPath,
  sampleNoticeAudioPath,
} from "@/lib/data/audio-paths";
import { sanitizeTextForSpeech } from "@/lib/speech-text";

let activeAudio = null;
let speakRequestId = 0;

export function unlockVoice() {
  if (typeof window === "undefined") return false;

  const silent = new Audio();
  silent.src =
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
  silent.play().catch(() => {});
  return true;
}

function stopActiveAudio() {
  if (!activeAudio) return;

  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio.removeAttribute("src");
  activeAudio.load();
  activeAudio = null;
}

export function stopSpeaking() {
  speakRequestId += 1;
  stopActiveAudio();
}

function playAudioUrl(url, { onEnd } = {}) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    activeAudio = audio;

    audio.addEventListener("ended", () => {
      if (activeAudio === audio) activeAudio = null;
      onEnd?.();
      resolve();
    });

    audio.addEventListener("error", () => {
      if (activeAudio === audio) activeAudio = null;
      reject(new Error("Audio playback failed"));
    });

    audio.play().catch(reject);
  });
}

async function synthesizeWithSarvam(text, language) {
  const response = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });

  if (!response.ok) return null;

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

async function playLiveSpeech(text, { language = "en", requestId } = {}) {
  if (!text || requestId !== speakRequestId) return false;

  const audioUrl = await synthesizeWithSarvam(text, language);
  if (requestId !== speakRequestId) {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    return false;
  }

  if (!audioUrl) return false;

  try {
    await playAudioUrl(audioUrl);
    URL.revokeObjectURL(audioUrl);
    return requestId === speakRequestId;
  } catch {
    URL.revokeObjectURL(audioUrl);
    return false;
  }
}

async function playPreRecorded(audioPath) {
  const requestId = speakRequestId;
  stopActiveAudio();

  try {
    const head = await fetch(audioPath, { method: "HEAD" });
    if (head.ok && requestId === speakRequestId) {
      await playAudioUrl(audioPath);
    }
  } catch {
    // Pre-recorded file missing — no live fallback.
  }
}

export async function playHeroIntro(language = "en") {
  stopSpeaking();
  await playPreRecorded(heroVoiceAudioPath(language));
}

export async function playGovernmentPageIntro(language = "en") {
  stopSpeaking();
  await playPreRecorded(governmentPageVoiceAudioPath(language));
}

export async function playBankingPageIntro(language = "en") {
  stopSpeaking();
  await playPreRecorded(bankingPageVoiceAudioPath(language));
}

export async function playFeatureIntro(domainKey, featureId, language = "en") {
  stopSpeaking();
  await playPreRecorded(featureVoiceAudioPath(domainKey, featureId, language));
}

export async function playSampleSimplifierSpeech(noticeId, language = "en") {
  stopSpeaking();
  await playPreRecorded(sampleNoticeAudioPath(noticeId, language));
}

/** Landing page #features section — one recording for government cards (not page feature intros). */
export async function playLandingGovernmentFeaturesIntro(language = "en") {
  stopSpeaking();
  await playPreRecorded(landingGovernmentFeaturesAudioPath(language));
}

/** Live Sarvam TTS (runtime). Pre-recorded files use Gemini-generated WAVs only. */
export async function speakSarvam(text, { language = "en" } = {}) {
  const spoken = sanitizeTextForSpeech(text);
  if (!spoken) return;

  stopSpeaking();
  const requestId = speakRequestId;
  await playLiveSpeech(spoken, { language, requestId });
}

/** @deprecated Use speakSarvam */
export async function speakLive(text, options = {}) {
  return speakSarvam(text, options);
}
