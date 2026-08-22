import { pickLang } from "../i18n.js";

const TTS_STYLE = {
  en: "Speak in a warm, clear, calm Indian English voice. Read the following text exactly, pausing briefly between each sentence. Do not add extra words.",
  kn: "ಉಷ್ಣ, ಸ್ಪಷ್ಟ, ಶಾಂತ ಕನ್ನಡ ಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡಿ. ಕೆಳಗಿನ ಪಠ್ಯವನ್ನು ನಿಖರವಾಗಿ ಓದಿ, ಪ್ರತಿ ವಾಕ್ಯದ ನಡುವೆ ಸ್ವಲ್ಪ ವಿರಾಮವಿಡಿ. ಹೆಚ್ಚುವರಿ ಪದಗಳನ್ನು ಸೇರಿಸಬೇಡಿ.",
  hi: "गर्म, स्पष्ट, शांत हिंदी आवाज़ में बोलें। नीचे दिया गया पाठ बिल्कुल वैसा ही पढ़ें, हर वाक्य के बीच थोड़ा विराम दें। अतिरिक्त शब्द न जोड़ें।",
};

function formatNoticeFallbackSpeech(notice, language) {
  const parts = [pickLang(notice.fallback.summary, language)];
  for (const action of notice.fallback.actions ?? []) {
    parts.push(pickLang(action, language));
  }
  return parts.join(" ");
}

export function sampleNoticeSpeech(notice, language = "en") {
  return formatNoticeFallbackSpeech(notice, language);
}

export function sampleNoticeSpeechPrompt(notice, language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  const style = TTS_STYLE[lang];
  const body = formatNoticeFallbackSpeech(notice, lang);
  return `${style}\n\n${body}`;
}

export function sampleNoticeAudioPath(noticeId, language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  return `/audio/samples/${noticeId}-${lang}.wav`;
}
