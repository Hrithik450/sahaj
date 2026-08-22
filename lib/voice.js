import {
  heroVoiceAudioPath,
  heroVoiceCaption,
  heroVoiceStyle,
} from "@/lib/data/hero-voice";
import {
  bankingPageVoiceAudioPath,
  bankingPageVoiceCaption,
  bankingPageVoiceStyle,
  governmentPageVoiceAudioPath,
  governmentPageVoiceCaption,
  governmentPageVoiceStyle,
} from "@/lib/data/page-voice";

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

async function synthesizeWithGemini(text, language, style) {
  const response = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language, style }),
  });

  if (!response.ok) return null;

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

async function playSpeech(text, { language = "en", requestId, style } = {}) {
  if (!text || requestId !== speakRequestId) return false;

  const geminiUrl = await synthesizeWithGemini(text, language, style);
  if (requestId !== speakRequestId) {
    if (geminiUrl) URL.revokeObjectURL(geminiUrl);
    return false;
  }

  if (!geminiUrl) return false;

  try {
    await playAudioUrl(geminiUrl);
    URL.revokeObjectURL(geminiUrl);
    return requestId === speakRequestId;
  } catch {
    URL.revokeObjectURL(geminiUrl);
    return false;
  }
}

async function playVoiceGuide({ language, audioPath, text, style }) {
  const requestId = ++speakRequestId;

  stopActiveAudio();

  try {
    const head = await fetch(audioPath, { method: "HEAD" });
    if (head.ok && requestId === speakRequestId) {
      await playAudioUrl(audioPath);
      return;
    }
  } catch {
    // Fall through to live Gemini synthesis.
  }

  await playSpeech(text, { language, requestId, style });
}

export async function playHeroIntro(language = "en") {
  await playVoiceGuide({
    language,
    audioPath: heroVoiceAudioPath(language),
    text: heroVoiceCaption(language),
    style: heroVoiceStyle(language),
  });
}

export async function playGovernmentPageIntro(language = "en") {
  await playVoiceGuide({
    language,
    audioPath: governmentPageVoiceAudioPath(language),
    text: governmentPageVoiceCaption(language),
    style: governmentPageVoiceStyle(language),
  });
}

export async function playBankingPageIntro(language = "en") {
  await playVoiceGuide({
    language,
    audioPath: bankingPageVoiceAudioPath(language),
    text: bankingPageVoiceCaption(language),
    style: bankingPageVoiceStyle(language),
  });
}

export async function speak(text, { language = "en" } = {}) {
  if (!text) return;

  const requestId = ++speakRequestId;
  stopActiveAudio();
  await playSpeech(text, { language, requestId });
}
