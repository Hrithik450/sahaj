import {
  bankingPageVoiceAudioPath,
  featureVoiceAudioPath,
  governmentPageVoiceAudioPath,
  heroVoiceAudioPath,
  landingGovernmentFeaturesAudioPath,
  sampleNoticeAudioPath,
  signInRequiredAudioPath,
} from "./audio-paths.js";
import { sanitizeTextForSpeech } from "./speech-text.js";

let activeAudio = null;
let speakRequestId = 0;
let gestureFallbackCleanup = null;
let lastFeatureIntroKey = "";
let lastFeatureIntroAt = 0;

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

function cancelGesturePlayback() {
  if (!gestureFallbackCleanup) return;
  gestureFallbackCleanup();
  gestureFallbackCleanup = null;
}

export function stopSpeaking() {
  speakRequestId += 1;
  cancelGesturePlayback();
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

function schedulePlayOnNextGesture(audioPath) {
  if (typeof window === "undefined") return;

  cancelGesturePlayback();

  const play = () => {
    cancelGesturePlayback();
    unlockVoice();
    void playAudioUrl(audioPath).catch(() => {});
  };

  const opts = { capture: true };
  window.addEventListener("pointerdown", play, opts);
  window.addEventListener("keydown", play, opts);

  gestureFallbackCleanup = () => {
    window.removeEventListener("pointerdown", play, opts);
    window.removeEventListener("keydown", play, opts);
  };
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

/**
 * @param {string} audioPath
 * @param {{ allowGestureFallback?: boolean }} [options]
 * @returns {Promise<boolean>} true if playback started
 */
async function playPreRecorded(
  audioPath,
  { allowGestureFallback = false } = {},
) {
  const requestId = speakRequestId;
  stopActiveAudio();

  try {
    const head = await fetch(audioPath, { method: "HEAD" });
    if (!head.ok || requestId !== speakRequestId) return false;

    try {
      await playAudioUrl(audioPath);
      return true;
    } catch {
      // OAuth / full-page redirects block autoplay  wait for next tap.
      if (allowGestureFallback && requestId === speakRequestId) {
        schedulePlayOnNextGesture(audioPath);
      }
      return false;
    }
  } catch {
    return false;
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
  const key = `${domainKey}:${featureId}:${language}`;
  const now = Date.now();
  // Avoid double-play when VoiceShell + FeatureHashGuard both fire after auth.
  if (lastFeatureIntroKey === key && now - lastFeatureIntroAt < 2500) {
    return;
  }
  lastFeatureIntroKey = key;
  lastFeatureIntroAt = now;

  stopSpeaking();
  unlockVoice();
  await playPreRecorded(featureVoiceAudioPath(domainKey, featureId, language), {
    allowGestureFallback: true,
  });
}

export async function playSampleSimplifierSpeech(noticeId, language = "en") {
  stopSpeaking();
  await playPreRecorded(sampleNoticeAudioPath(noticeId, language));
}

export async function playLandingGovernmentFeaturesIntro(language = "en") {
  stopSpeaking();
  await playPreRecorded(landingGovernmentFeaturesAudioPath(language));
}

export async function playSignInRequiredIntro(language = "en") {
  stopSpeaking();
  await playPreRecorded(signInRequiredAudioPath(language));
}

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
