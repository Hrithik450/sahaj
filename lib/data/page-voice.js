/** Page narration when user opens Government or Banking via the main nav. */

const TTS_STYLE = {
  en: "Speak in a warm, clear, calm Indian English voice. Read the following text exactly, pausing briefly between each sentence. Do not add extra words.",
  kn: "ಉಷ್ಣ, ಸ್ಪಷ್ಟ, ಶಾಂತ ಕನ್ನಡ ಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡಿ. ಕೆಳಗಿನ ಪಠ್ಯವನ್ನು ನಿಖರವಾಗಿ ಓದಿ, ಪ್ರತಿ ವಾಕ್ಯದ ನಡುವೆ ಸ್ವಲ್ಪ ವಿರಾಮವಿಡಿ. ಹೆಚ್ಚುವರಿ ಪದಗಳನ್ನು ಸೇರಿಸಬೇಡಿ.",
  hi: "गर्म, स्पष्ट, शांत हिंदी आवाज़ में बोलें। नीचे दिया गया पाठ बिल्कुल वैसा ही पढ़ें, हर वाक्य के बीच थोड़ा विराम दें। अतिरिक्त शब्द न जोड़ें।",
};

const GOVERNMENT_PAGE = {
  label: { en: "Government", hi: "सरकार", kn: "ಸರ್ಕಾರ" },
  title: {
    en: "Finish government tasks with guided, accessible tools",
    hi: "मार्गदर्शित, सुलभ उपकरणों से सरकारी कार्य पूरे करें",
    kn: "ಮಾರ್ಗದರ್ಶಿತ, ಸುಲಭ ಸಾಧನಗಳೊಂದಿಗೆ ಸರ್ಕಾರಿ ಕೆಲಸಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ",
  },
  continue: {
    en: "To continue, choose any one of the tasks below.",
    hi: "आगे बढ़ने के लिए, नीचे दिए गए कार्यों में से कोई एक चुनें।",
    kn: "ಮುಂದುವರಿಯಲು, ಕೆಳಗಿನ ಕೆಲಸಗಳಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  },
  features: [
    { en: "Document Simplifier", hi: "दस्तावेज़ सरलीकरण", kn: "ದಾಖಲೆ ಸರಳೀಕರಣ" },
    { en: "Guided Form", hi: "मार्गदर्शित फॉर्म", kn: "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್" },
    { en: "Service Finder", hi: "सेवा खोज", kn: "ಸೇವೆ ಹುಡುಕಾಟ" },
    { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
    { en: "Practice Mode", hi: "अभ्यास मोड", kn: "ಅಭ್ಯಾಸ ವಿಧಾನ" },
  ],
};

const BANKING_PAGE = {
  label: { en: "Banking", hi: "बैंकिंग", kn: "ಬ್ಯಾಂಕಿಂಗ್" },
  title: {
    en: "Manage banking tasks with clarity and confidence",
    hi: "स्पष्टता और विश्वास के साथ बैंकिंग कार्य संभालें",
    kn: "ಸ್ಪಷ್ಟತೆ ಮತ್ತು ವಿಶ್ವಾಸದೊಂದಿಗೆ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
  },
  continue: {
    en: "To continue, choose any one of the tasks below.",
    hi: "आगे बढ़ने के लिए, नीचे दिए गए कार्यों में से कोई एक चुनें।",
    kn: "ಮುಂದುವರಿಯಲು, ಕೆಳಗಿನ ಕೆಲಸಗಳಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  },
  features: [
    { en: "Document Simplifier", hi: "दस्तावेज़ सरलीकरण", kn: "ದಾಖಲೆ ಸರಳೀಕರಣ" },
    {
      en: "Guided Banking Task",
      hi: "मार्गदर्शित बैंकिंग कार्य",
      kn: "ಮಾರ್ಗದರ್ಶಿತ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸ",
    },
    {
      en: "Transaction Explainer",
      hi: "लेनदेन व्याख्याकार",
      kn: "ವಹಿವಾಟು ವಿವರಣೆ",
    },
    { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
    {
      en: "Safe Practice Mode",
      hi: "सुरक्षित अभ्यास मोड",
      kn: "ಸುರಕ್ಷಿತ ಅಭ್ಯಾಸ ವಿಧಾನ",
    },
  ],
};

function pickLang(table, language) {
  return table[language] ?? table.en;
}

function formatFeatureList(features, language) {
  const names = features.map((feature) => pickLang(feature, language));
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];

  const last = names[names.length - 1];
  const rest = names.slice(0, -1).join(", ");
  const lang = language in TTS_STYLE ? language : "en";
  const orWord =
    lang === "hi" ? "या" : lang === "kn" ? "ಅಥವಾ" : "or";
  return `${rest}, ${orWord} ${last}.`;
}

function buildPageVoiceLines(page, language) {
  const lang = language in TTS_STYLE ? language : "en";
  return [
    pickLang(page.label, lang),
    pickLang(page.title, lang),
    pickLang(page.continue, lang),
    formatFeatureList(page.features, lang),
  ];
}

function buildPageVoicePrompt(page, language) {
  const lang = language in TTS_STYLE ? language : "en";
  const style = TTS_STYLE[lang];
  const body = buildPageVoiceLines(page, lang).join(" ");
  return `${style}\n\n${body}`;
}

export function governmentPageVoiceLines(language = "en") {
  return buildPageVoiceLines(GOVERNMENT_PAGE, language);
}

export function governmentPageVoiceCaption(language = "en") {
  return governmentPageVoiceLines(language).join(" ");
}

export function governmentPageVoicePrompt(language = "en") {
  return buildPageVoicePrompt(GOVERNMENT_PAGE, language);
}

export function governmentPageVoiceStyle(language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  return TTS_STYLE[lang];
}

export function governmentPageVoiceAudioPath(language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  return `/audio/pages/government-${lang}.wav`;
}

export function bankingPageVoiceLines(language = "en") {
  return buildPageVoiceLines(BANKING_PAGE, language);
}

export function bankingPageVoiceCaption(language = "en") {
  return bankingPageVoiceLines(language).join(" ");
}

export function bankingPageVoicePrompt(language = "en") {
  return buildPageVoicePrompt(BANKING_PAGE, language);
}

export function bankingPageVoiceStyle(language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  return TTS_STYLE[lang];
}

export function bankingPageVoiceAudioPath(language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  return `/audio/pages/banking-${lang}.wav`;
}
