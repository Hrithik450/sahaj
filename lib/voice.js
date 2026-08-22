import {
  heroVoiceAudioPath,
  heroVoicePrompt,
} from "@/lib/data/hero-voice";
import {
  governmentFeaturesVoiceAudioPath,
  governmentFeaturesVoicePrompt,
} from "@/lib/data/features-voice";

const LANG_VOICES = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

export const VOICE_CAPTION_EVENT = "sahaj-voice-caption";

let activeAudio = null;
let speakRequestId = 0;

export function setCaption(text) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(VOICE_CAPTION_EVENT, { detail: { text } }),
  );
}

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

  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  setCaption("");
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

async function synthesizeWithGemini(text, language) {
  const response = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });

  if (!response.ok) return null;

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

function speakWithBrowser(text, language) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_VOICES[language] || LANG_VOICES.en;
  window.speechSynthesis.speak(utterance);
}

async function playSpeech(text, { language = "en", requestId } = {}) {
  if (!text || requestId !== speakRequestId) return false;

  const geminiUrl = await synthesizeWithGemini(text, language);
  if (requestId !== speakRequestId) {
    if (geminiUrl) URL.revokeObjectURL(geminiUrl);
    return false;
  }

  if (geminiUrl) {
    try {
      await playAudioUrl(geminiUrl);
      URL.revokeObjectURL(geminiUrl);
      return requestId === speakRequestId;
    } catch {
      URL.revokeObjectURL(geminiUrl);
    }
  }

  if (requestId !== speakRequestId) return false;

  speakWithBrowser(text, language);
  return true;
}

async function playVoiceGuide({ language, audioPath, prompt }) {
  const requestId = ++speakRequestId;

  stopActiveAudio();
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  try {
    const head = await fetch(audioPath, { method: "HEAD" });
    if (head.ok && requestId === speakRequestId) {
      await playAudioUrl(audioPath);
      return;
    }
  } catch {
    // Fall through to live Gemini synthesis.
  }

  await playSpeech(prompt, { language, requestId });
}

export async function playHeroIntro(language = "en") {
  await playVoiceGuide({
    language,
    audioPath: heroVoiceAudioPath(language),
    prompt: heroVoicePrompt(language),
  });
}

export async function playGovernmentFeaturesIntro(language = "en") {
  await playVoiceGuide({
    language,
    audioPath: governmentFeaturesVoiceAudioPath(language),
    prompt: governmentFeaturesVoicePrompt(language),
  });
}

export async function speak(text, { language = "en" } = {}) {
  if (!text) {
    setCaption("");
    return;
  }

  const requestId = ++speakRequestId;
  stopActiveAudio();
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  setCaption(text);
  await playSpeech(text, { language, requestId });

  if (requestId === speakRequestId) {
    setCaption("");
  }
}
