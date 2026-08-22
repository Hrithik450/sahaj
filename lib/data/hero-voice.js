import { SITE } from "../site.js";

export const HERO_VOICE_SCRIPTS = {
  en: [
    `Welcome to ${SITE.name}.`,
    "Digital services, simple for everyone.",
    "How would you like Sahaj to work for you?",
    "Larger text, which makes it easier to read.",
    "Voice guidance, where you can speak and listen.",
    "Or simple steps, one step at a time.",
    "Choose the option that fits you best.",
    `Then click Continue to ${SITE.name} to get started.`,
  ],
  kn: [
    `ಸಹಜಕ್ಕೆ ಸುಸ್ವಾಗತ.`,
    "ಡಿಜಿಟಲ್ ಸೇವೆಗಳು, ಎಲ್ಲರಿಗೂ ಸರಳ.",
    "ಸಹಜ ನಿಮಗೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡಬೇಕು?",
    "ದೊಡ್ಡ ಪಠ್ಯ, ಓದಲು ಸುಲಭ.",
    "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ, ಮಾತನಾಡಿ ಮತ್ತು ಕೇಳಿ.",
    "ಅಥವಾ ಸರಳ ಹಂತಗಳು, ಒಂದು ಸಮಯದಲ್ಲಿ ಒಂದು ಹಂತ.",
    "ನಿಮಗೆ ಸರಿಹೊಂದುವ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
    "ನಂತರ ಪ್ರಾರಂಭಿಸಲು ಸಹಜಕ್ಕೆ ಮುಂದುವರಿಯಿರಿ ಬಟನ್ ಅನ್ನು ಒತ್ತಿ.",
  ],
  hi: [
    `${SITE.name} में आपका स्वागत है।`,
    "डिजिटल सेवाएं, सभी के लिए आसान।",
    "आप सहज को कैसे उपयोग करना चाहेंगे?",
    "बड़ा टेक्स्ट, पढ़ने में आसान।",
    "आवाज़ मार्गदर्शन, बोलें और सुनें।",
    "या सरल चरण, एक समय में एक कदम।",
    "अपने लिए सही विकल्प चुनें।",
    "फिर शुरू करने के लिए सहज पर जारी रखें पर क्लिक करें।",
  ],
};

const TTS_STYLE = {
  en: "Speak in a warm, welcoming, calm Indian English voice. Read the following text exactly, pausing briefly between each sentence. Do not add extra words.",
  kn: "ಉಷ್ಣ, ಸ್ವಾಗತಾರ್ಹ, ಶಾಂತ ಕನ್ನಡ ಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡಿ. ಕೆಳಗಿನ ಪಠ್ಯವನ್ನು ನಿಖರವಾಗಿ ಓದಿ, ಪ್ರತಿ ವಾಕ್ಯದ ನಡುವೆ ಸ್ವಲ್ಪ ವಿರಾಮವಿಡಿ. ಹೆಚ್ಚುವರಿ ಪದಗಳನ್ನು ಸೇರಿಸಬೇಡಿ.",
  hi: "गर्म, स्वागतपूर्ण, शांत हिंदी आवाज़ में बोलें। नीचे दिया गया पाठ बिल्कुल वैसा ही पढ़ें, हर वाक्य के बीच थोड़ा विराम दें। अतिरिक्त शब्द न जोड़ें।",
};

export function heroVoiceCaption(language = "en") {
  const lines = HERO_VOICE_SCRIPTS[language] ?? HERO_VOICE_SCRIPTS.en;
  return lines.join(" ");
}

export function heroVoicePrompt(language = "en") {
  const style = TTS_STYLE[language] ?? TTS_STYLE.en;
  const body = heroVoiceCaption(language);
  return `${style}\n\n${body}`;
}

export function heroVoiceStyle(language = "en") {
  return TTS_STYLE[language] ?? TTS_STYLE.en;
}

export function heroVoiceAudioPath(language = "en") {
  const lang = HERO_VOICE_SCRIPTS[language] ? language : "en";
  return `/audio/hero/${lang}.wav`;
}
