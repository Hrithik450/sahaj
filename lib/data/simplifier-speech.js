import { pickLang } from "../i18n.js";

export const NATURAL_SIMPLIFIER_TTS_STYLE = {
  en: "Speak naturally and warmly, like a calm friend explaining a government or bank letter. Use conversational Indian English. Pause gently between ideas. Do not sound robotic or like a list. Read the following exactly:",
  hi: "सहज और गर्मजोशी से बोलें, जैसे कोई दोस्त सरकारी या बैंक पत्र समझा रहा हो। शांत हिंदी आवाज़। विचारों के बीच हल्का विराम। रोबोटिक या सूची जैसी न लगें। नीचे दिया पाठ बिल्कुल वैसा पढ़ें:",
  kn: "ಸರ್ಕಾರಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ಪತ್ರವನ್ನು ಒಬ್ಬ ಸ್ನೇಹಿತ ವಿವರಿಸುತ್ತಿರುವಂತೆ ಸ್ವಾಭಾವಿಕವಾಗಿ ಮತ್ತು ಉಷ್ಣವಾಗಿ ಮಾತನಾಡಿ. ಶಾಂತ ಕನ್ನಡ ಧ್ವನಿ. ಆಲೋಚನೆಗಳ ನಡುವೆ ಸ್ವಲ್ಪ ವಿರಾಮ. ರೋಬೋಟ್ ಅಥವಾ ಪಟ್ಟಿ ಶೈಲಿಯಲ್ಲಿ ಮಾತನಾಡಬೇಡಿ. ಕೆಳಗಿನ ಪಠ್ಯವನ್ನು ನಿಖರವಾಗಿ ಓದಿ:",
};

const NOTICE_NATURAL_SPEECH = {
  "income-certificate-reminder": {
    en: "So, your income certificate application is still waiting on two documents  your Aadhaar and your latest salary slip. When you get a moment, open the municipal portal and upload both there. Try to finish before 30 August 2026, otherwise they may mark the application as incomplete.",
    hi: "तो, आपका आय प्रमाण पत्र आवेदन अभी भी दो दस्तावेज़ों पर अटका है  आपका आधार और आपकी ताज़ा सैलरी स्लिप। जब समय मिले, नगर पालिका पोर्टल खोलें और दोनों वहाँ अपलोड कर दें। 30 अगस्त 2026 से पहले पूरा कर लें, otherwise आवेदन incomplete मार्क हो सकता है।",
    kn: "ನಿಮ್ಮ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿ ಇನ್ನೂ ಎರಡು ದಾಖಲೆಗಳ ಕಾಯುತ್ತಿದೆ  ನಿಮ್ಮ ಆಧಾರ್ ಮತ್ತು ಇತ್ತೀಚಿನ ಸ್ಯಾಲರಿ ಸ್ಲಿಪ್. ಸಮಯ ಸಿಕ್ಕಾಗ ನಗರ ಪಾಲಿಕೆ ಪೋರ್ಟಲ್ ತೆರೆದು ಎರಡನ್ನೂ ಅಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. 30 ಆಗಸ್ಟ್ 2026 ರ ಮೊದಲು ಮುಗಿಸಲು ಪ್ರಯತ್ನಿಸಿ, ಇಲ್ಲದಿದ್ದರೆ ಅರ್ಜಿಯನ್ನು ಅಪೂರ್ಣವಾಗಿ ಗುರುತಿಸಬಹುದು.",
  },
  "kyc-update-letter": {
    en: "Your bank KYC for that savings account is due for renewal. If you don't update by 10 September, they might temporarily restrict debits on the account. The quickest way is to open your bank app, go to Profile, and complete video KYC. Or you can visit any branch with your Aadhaar and PAN.",
    hi: "उस savings account का bank KYC renewal के लिए due है। 10 सितंबर तक update नहीं करेंगे तो account पर debit अस्थायी रोक लग सकती है। सबसे आसान तरीका bank app खोलें, Profile में जाएं और video KYC पूरा करें। या आधार और PAN लेकर किसी भी शाखा में जा सकते हैं।",
    kn: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ KYC ನವೀಕರಣ ಬಾಕಿ ಇದೆ. 10 ಸೆಪ್ಟೆಂಬರ್ ಮೊದಲು ನವೀಕರಿಸದಿದ್ದರೆ ಖಾತೆಯಲ್ಲಿ ತಾತ್ಕಾಲಿಕ ಡೆಬಿಟ್ ನಿರ್ಬಂಧ ಬರಬಹುದು. ಬ್ಯಾಂಕ್ ಅಪ್ಲಿಕೇಶನ್ ತೆರೆದು ಪ್ರೊಫೈಲ್‌ನಿಂದ ವೀಡಿಯೋ KYC ಪೂರ್ಣಗೊಳಿಸಬಹುದು. ಅಥವಾ ಆಧಾರ್ ಮತ್ತು PAN ಒಯ್ದು ಯಾವುದೇ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.",
  },
};

const NEXT_STEPS_INTRO = {
  en: "Here's what to do next.",
  hi: "आगे ये करें।",
  kn: "ಮುಂದೆ ಇದನ್ನು ಮಾಡಿ.",
};

const WARNINGS_INTRO = {
  en: "Please keep this in mind.",
  hi: "यह ध्यान में रखें।",
  kn: "ಇದನ್ನು ನೆನಪಿನಲ್ಲಿಡಿ.",
};

function ensurePeriod(text) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return /[.!?।]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function resolveText(value, language) {
  if (!value) return "";
  return typeof value === "string" ? value : pickLang(value, language);
}

function stitchSimplifierSpeech(result, language = "en") {
  const lang = language in NATURAL_SIMPLIFIER_TTS_STYLE ? language : "en";
  const parts = [];

  const summary = resolveText(result.summary, lang);
  if (summary) parts.push(ensurePeriod(summary));

  const actions = result.actions ?? [];
  if (actions.length > 0) {
    parts.push(pickLang(NEXT_STEPS_INTRO, lang));
    for (const action of actions) {
      const line = resolveText(action, lang);
      if (line) parts.push(ensurePeriod(line));
    }
  }

  const warnings = result.warnings ?? [];
  if (warnings.length > 0) {
    parts.push(pickLang(WARNINGS_INTRO, lang));
    for (const warning of warnings) {
      const line = resolveText(warning, lang);
      if (line) parts.push(ensurePeriod(line));
    }
  }

  return parts.join(" ");
}

export function naturalSpeechForNotice(notice, language = "en") {
  const lang = language in NATURAL_SIMPLIFIER_TTS_STYLE ? language : "en";
  const scripted = NOTICE_NATURAL_SPEECH[notice.id]?.[lang];
  if (scripted) return scripted;
  return stitchSimplifierSpeech(notice.fallback, lang);
}

export function formatSimplifierSpeech(result, language = "en") {
  if (typeof result.speech === "string" && result.speech.trim()) {
    return result.speech.trim();
  }

  const lang = language in NATURAL_SIMPLIFIER_TTS_STYLE ? language : "en";
  return stitchSimplifierSpeech(result, lang);
}

export function formatNoticeFallbackSpeech(notice, language = "en") {
  return naturalSpeechForNotice(notice, language);
}

export function simplifierSpeechStyle(language = "en") {
  const lang = language in NATURAL_SIMPLIFIER_TTS_STYLE ? language : "en";
  return NATURAL_SIMPLIFIER_TTS_STYLE[lang];
}

export function sampleNoticeSpeech(notice, language = "en") {
  return formatNoticeFallbackSpeech(notice, language);
}

export function sampleNoticeSpeechPrompt(notice, language = "en") {
  const lang = language in NATURAL_SIMPLIFIER_TTS_STYLE ? language : "en";
  const style = simplifierSpeechStyle(lang);
  const body = formatNoticeFallbackSpeech(notice, lang);
  return `${style}\n\n${body}`;
}
