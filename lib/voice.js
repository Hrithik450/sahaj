const LANG_VOICES = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

export const VOICE_CAPTION_EVENT = "sahaj-voice-caption";

export const WELCOME_MESSAGES = {
  en: "Voice guidance is on. Sahaj will read instructions aloud and show captions on screen.",
  hi: "आवाज़ मार्गदर्शन चालू है। सहज निर्देश बोलेगा और कैप्शन स्क्रीन पर दिखाएगा।",
  kn: "Voice guidance is on. Sahaj will read instructions aloud and show captions on screen.",
};

export function getWelcomeMessage(language) {
  return WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en;
}

export function setCaption(text) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(VOICE_CAPTION_EVENT, { detail: { text } }),
  );
}

export function unlockVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;

  const utterance = new SpeechSynthesisUtterance("");
  utterance.volume = 0;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  setCaption("");
}

export function speak(text, { language = "en" } = {}) {
  if (!text) {
    setCaption("");
    return;
  }

  setCaption(text);

  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_VOICES[language] || LANG_VOICES.en;
  window.speechSynthesis.speak(utterance);
}
