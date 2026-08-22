import { BANK_NOTICES } from "./bank/notices.js";
import { BANK_TASKS } from "./bank/tasks.js";
import { GOV_FORMS } from "./gov/forms.js";
import { GOV_NOTICES } from "./gov/notices.js";

const TTS_STYLE = {
  en: "Speak in a warm, clear, calm Indian English voice. Read the following text exactly, pausing briefly between each sentence. Do not add extra words.",
  kn: "ಉಷ್ಣ, ಸ್ಪಷ್ಟ, ಶಾಂತ ಕನ್ನಡ ಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡಿ. ಕೆಳಗಿನ ಪಠ್ಯವನ್ನು ನಿಖರವಾಗಿ ಓದಿ, ಪ್ರತಿ ವಾಕ್ಯದ ನಡುವೆ ಸ್ವಲ್ಪ ವಿರಾಮವಿಡಿ. ಹೆಚ್ಚುವರಿ ಪದಗಳನ್ನು ಸೇರಿಸಬೇಡಿ.",
  hi: "गर्म, स्पष्ट, शांत हिंदी आवाज़ में बोलें। नीचे दिया गया पाठ बिल्कुल वैसा ही पढ़ें, हर वाक्य के बीच थोड़ा विराम दें। अतिरिक्त शब्द न जोड़ें।",
};

const NATURAL_TTS_STYLE = {
  en: "Speak naturally and warmly, like a calm friend helping someone use a government app. Use conversational Indian English. Pause gently between ideas. Do not sound robotic or like a list. Read the following exactly:",
  hi: "सहज और गर्मजोशी से बोलें, जैसे कोई दोस्त सरकारी ऐप में मदद कर रहा हो। शांत हिंदी आवाज़। विचारों के बीच हल्का विराम। रोबोटिक या सूची जैसी न लगें। नीचे दिया पाठ बिल्कुल वैसा पढ़ें:",
  kn: "ಒಬ್ಬ ಸ್ನೇಹಿತ ಸರ್ಕಾರಿ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತಿರುವಂತೆ ಸ್ವಾಭಾವಿಕವಾಗಿ ಮತ್ತು ಉಷ್ಣವಾಗಿ ಮಾತನಾಡಿ. ಶಾಂತ ಕನ್ನಡ ಧ್ವನಿ. ಆಲೋಚನೆಗಳ ನಡುವೆ ಸ್ವಲ್ಪ ವಿರಾಮ. ರೋಬೋಟ್ ಅಥವಾ ಪಟ್ಟಿ ಶೈಲಿಯಲ್ಲಿ ಮಾತನಾಡಬೇಡಿ. ಕೆಳಗಿನ ಪಠ್ಯವನ್ನು ನಿಖರವಾಗಿ ಓದಿ:",
};

/** Guided workflows that use natural conversational intro audio. */
export const NATURAL_GUIDE_FEATURES = [
  { domainKey: "government", featureId: "simplify" },
  { domainKey: "banking", featureId: "simplify" },
  { domainKey: "government", featureId: "form" },
  { domainKey: "banking", featureId: "task" },
];

const SIMPLIFY_SAMPLE = {
  government: GOV_NOTICES[0],
  banking: BANK_NOTICES[0],
};

const NATURAL_SCRIPTS = {
  government: {
    simplify: {
      en: (sampleTitle) =>
        `Let me walk you through Document Simplifier. I turn confusing notices into plain language. You can try our sample — ${sampleTitle} — or paste your letter in the box below. If you have a photo, upload it or snap one. When you're ready, tap Simplify for me and I'll explain what it means and what to do next.`,
      hi: (sampleTitle) =>
        `मैं आपको दस्तावेज़ सरलीकरण समझाता हूँ। मैं कठिन नोटिस को सरल भाषा में बताता हूँ। आप नमूना "${sampleTitle}" आज़माएं, या नीचे अपना पत्र चिपकाएं। फोटो है तो अपलोड करें या कैमरे से लें। तैयार होने पर मेरे लिए सरल करें दबाएं — मैं बताऊँगा क्या मतलब है और आगे क्या करें।`,
      kn: (sampleTitle) =>
        `ದಾಖಲೆ ಸರಳೀಕರಣವನ್ನು ನಾನು ನಿಮಗೆ ತೋರಿಸುತ್ತೇನೆ. ಗೊಂದಲದ ಸೂಚನೆಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸುತ್ತೇನೆ. "${sampleTitle}" ಮಾದರಿಯನ್ನು ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ಕೆಳಗೆ ನಿಮ್ಮ ಪತ್ರ ಅಂಟಿಸಿ. ಫೋಟೋ ಇದ್ದರೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ತೆಗೆಯಿರಿ. ಸಿದ್ಧವಾದಾಗ ನನ್ನಿಗಾಗಿ ಸರಳಗೊಳಿಸಿ ಒತ್ತಿ — ಏನು ಅರ್ಥವಾಗುತ್ತದೆ ಮತ್ತು ಮುಂದೆ ಏನು ಮಾಡಬೇಕು ಎಂದು ನಾನು ವಿವರಿಸುತ್ತೇನೆ.`,
    },
    form: {
      en: (workflows, firstLabel, firstHelp) =>
        `Welcome to Guided Form. You can choose any workflow available — ${workflows}. We'll go one step at a time, so nothing feels rushed. For example, you'll start with ${firstLabel} — ${firstHelp} Tap Next step whenever you're ready to continue.`,
      hi: (workflows, firstLabel, firstHelp) =>
        `मार्गदर्शित फॉर्म में आपका स्वागत है। आप कोई भी कार्यप्रवाह चुन सकते हैं — ${workflows}. हम एक-एक कदम चलेंगे। शुरू में ${firstLabel} — ${firstHelp} तैयार होने पर अगला चरण दबाएं।`,
      kn: (workflows, firstLabel, firstHelp) =>
        `ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್‌ಗೆ ಸುಸ್ವಾಗತ. ಯಾವುದೇ ಕೆಲಸದ ಹರಿವನ್ನು ಆಯ್ಕೆಮಾಡಬಹುದು — ${workflows}. ಒಂದೊಂದು ಹಂತದಲ್ಲಿ ಮುಂದುವರಿಯುತ್ತೇವೆ. ಮೊದಲು ${firstLabel} — ${firstHelp} ಸಿದ್ಧವಾದಾಗ ಮುಂದಿನ ಹಂತ ಒತ್ತಿ.`,
    },
  },
  banking: {
    simplify: {
      en: (sampleTitle) =>
        `Let me help with Document Simplifier. Bank letters and KYC notices can be confusing — I'll make them simple. Try our sample ${sampleTitle}, paste your text, or upload or snap a photo of the letter. When you're ready, tap Simplify for me.`,
      hi: (sampleTitle) =>
        `दस्तावेज़ सरलीकरण में मैं मदद करूँगा। बैंक पत्र और KYC संदेश कठिन लग सकते हैं — मैं सरल भाषा में समझाऊँगा। नमूना "${sampleTitle}" आज़माएं, पाठ चिपकाएं, या फोटो अपलोड या लें। तैयार होने पर मेरे लिए सरल करें दबाएं।`,
      kn: (sampleTitle) =>
        `ದಾಖಲೆ ಸರಳೀಕರಣದಲ್ಲಿ ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಬ್ಯಾಂಕ್ ಪತ್ರಗಳು ಮತ್ತು KYC ಸಂದೇಶಗಳು ಗೊಂದಲವಾಗಬಹುದು — ನಾನು ಸರಳವಾಗಿ ವಿವರಿಸುತ್ತೇನೆ. "${sampleTitle}" ಮಾದರಿ ಪ್ರಯತ್ನಿಸಿ, ಪಠ್ಯ ಅಂಟಿಸಿ, ಅಥವಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಅಥವಾ ತೆಗೆಯಿರಿ. ಸಿದ್ಧವಾದಾಗ ನನ್ನಿಗಾಗಿ ಸರಳಗೊಳಿಸಿ ಒತ್ತಿ.`,
    },
    task: {
      en: (workflows, firstLabel, firstHelp) =>
        `Welcome to Guided Banking Task. Pick any workflow you need — ${workflows}. We'll walk through it safely, one step at a time. For example, to report a transaction, you'll enter ${firstLabel} — ${firstHelp} Tap Next step when you're ready.`,
      hi: (workflows, firstLabel, firstHelp) =>
        `मार्गदर्शित बैंकिंग कार्य में आपका स्वागत है। कोई भी कार्यप्रवाह चुनें — ${workflows}. हम सुरक्षित रूप से एक-एक कदम चलेंगे। उदाहरण के लिए, ${firstLabel} — ${firstHelp} तैयार होने पर अगला चरण दबाएं।`,
      kn: (workflows, firstLabel, firstHelp) =>
        `ಮಾರ್ಗದರ್ಶಿತ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಕ್ಕೆ ಸುಸ್ವಾಗತ. ಯಾವುದೇ ಕೆಲಸದ ಹರಿವನ್ನು ಆಯ್ಕೆಮಾಡಿ — ${workflows}. ಸುರಕ್ಷಿತವಾಗಿ ಒಂದೊಂದು ಹಂತದಲ್ಲಿ ಮುಂದುವರಿಯುತ್ತೇವೆ. ಉದಾಹರಣೆಗೆ, ${firstLabel} — ${firstHelp} ಸಿದ್ಧವಾದಾಗ ಮುಂದಿನ ಹಂತ ಒತ್ತಿ.`,
    },
  },
};

const FEATURE_VOICE = {
  government: {
    simplify: {
      title: {
        en: "Document Simplifier",
        hi: "दस्तावेज़ सरलीकरण",
        kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
      },
      description: {
        en: "Paste a notice or letter and get a plain-language summary with clear next steps.",
        hi: "कोई नोटिस या पत्र चिपकाएं और स्पष्ट अगले कदमों के साथ सरल भाषा में सारांश पाएं।",
        kn: "ಸೂಚನೆ ಅಥವಾ ಪತ್ರ ಅಂಟಿಸಿ ಸ್ಪಷ್ಟ ಮುಂದಿನ ಹಂತಗಳೊಂದಿಗೆ ಸರಳ ಭಾಷೆಯ ಸಾರಾಂಶ ಪಡೆಯಿರಿ.",
      },
    },
    form: {
      title: {
        en: "Guided Form",
        hi: "मार्गदर्शित फॉर्म",
        kn: "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್",
      },
      description: {
        en: "Complete government forms one field at a time with voice prompts and simple help.",
        hi: "आवाज़ संकेत और सरल सहायता के साथ सरकारी फॉर्म एक-एक फ़ील्ड भरें।",
        kn: "ಧ್ವನಿ ಸೂಚನೆ ಮತ್ತು ಸರಳ ಸಹಾಯದೊಂದಿಗೆ ಸರ್ಕಾರಿ ಫಾರ್ಮ್‌ಗಳನ್ನು ಒಂದೊಂದು ಫೀಲ್ಡ್‌ನಲ್ಲಿ ಪೂರ್ಣಗೊಳಿಸಿ.",
      },
    },
    finder: {
      title: { en: "Service Finder", hi: "सेवा खोज", kn: "ಸೇವೆ ಹುಡುಕಾಟ" },
      description: {
        en: "Describe what you need and find the right service, documents, and where to go next.",
        hi: "अपनी जरूरत बताएं और सही सेवा, दस्तावेज़ और अगला कदम खोजें।",
        kn: "ನಿಮಗೆ ಬೇಕಾದದ್ದನ್ನು ವಿವರಿಸಿ ಸರಿಯಾದ ಸೇವೆ, ದಾಖಲೆಗಳು ಮತ್ತು ಮುಂದಿನ ಹಂತವನ್ನು ಹುಡುಕಿ.",
      },
    },
    companion: {
      title: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
      description: {
        en: "Ask questions in plain language and get short, actionable answers with captions.",
        hi: "सरल भाषा में सवाल पूछें और कैप्शन के साथ छोटे, उपयोगी जवाब पाएं।",
        kn: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಶೀರ್ಷಿಕೆಗಳೊಂದಿಗೆ ಚಿಕ್ಕ, ಉಪಯುಕ್ತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",
      },
    },
    practice: {
      title: { en: "Practice Mode", hi: "अभ्यास मोड", kn: "ಅಭ್ಯಾಸ ವಿಧಾನ" },
      description: {
        en: "Try a simulated form or task safely, learn from mistakes, and build confidence.",
        hi: "सुरक्षित रूप से अभ्यास करें, गलतियों से सीखें और आत्मविश्वास बढ़ाएं।",
        kn: "ಸಿಮ್ಯುಲೇಟೆಡ್ ಫಾರ್ಮ್ ಅಥವಾ ಕೆಲಸವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಯತ್ನಿಸಿ, ತಪ್ಪುಗಳಿಂದ ಕಲಿಯಿರಿ ಮತ್ತು ವಿಶ್ವಾಸ ಹೆಚ್ಚಿಸಿ.",
      },
    },
  },
  banking: {
    simplify: {
      title: {
        en: "Document Simplifier",
        hi: "दस्तावेज़ सरलीकरण",
        kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
      },
      description: {
        en: "Understand bank letters, EMI notices, and KYC messages in simple language.",
        hi: "बैंक पत्र, EMI नोटिस और KYC संदेश सरल भाषा में समझें।",
        kn: "ಬ್ಯಾಂಕ್ ಪತ್ರಗಳು, EMI ಸೂಚನೆಗಳು ಮತ್ತು KYC ಸಂದೇಶಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      },
    },
    task: {
      title: {
        en: "Guided Banking Task",
        hi: "मार्गदर्शित बैंकिंग कार्य",
        kn: "ಮಾರ್ಗದರ್ಶಿತ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸ",
      },
      description: {
        en: "Walk through banking tasks like KYC or reporting fraud with one step at a time.",
        hi: "KYC या धोखाधड़ी रिपोर्ट जैसे बैंकिंग कार्य एक-एक कदम में पूरे करें।",
        kn: "KYC ಅಥವಾ ವಂಚನೆ ವರದಿ ಮಾಡುವಂತಹ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಗಳನ್ನು ಒಂದೊಂದು ಹಂತದಲ್ಲಿ ಮಾಡಿ.",
      },
    },
    transaction: {
      title: {
        en: "Transaction Explainer",
        hi: "लेनदेन व्याख्याकार",
        kn: "ವಹಿವಾಟು ವಿವರಣೆ",
      },
      description: {
        en: "Paste an SMS or transaction alert and learn what happened and what to check.",
        hi: "SMS या लेनदेन अलर्ट चिपकाएं और जानें क्या हुआ और क्या जांचें।",
        kn: "SMS ಅಥವಾ ವಹಿವಾಟು ಎಚ್ಚರಿಕೆಯನ್ನು ಅಂಟಿಸಿ ಏನಾಯಿತು ಮತ್ತು ಏನನ್ನು ಪರಿಶೀಲಿಸಬೇಕು ಎಂದು ತಿಳಿಯಿರಿ.",
      },
    },
    companion: {
      title: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
      description: {
        en: "Ask banking questions and get streaming help you can hear and read on screen.",
        hi: "बैंकिंग सवाल पूछें और स्क्रीन पर सुन और पढ़ सकने वाली मदद पाएं।",
        kn: "ಬ್ಯಾಂಕಿಂಗ್ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಪರದೆಯಲ್ಲಿ ಕೇಳಬಹುದಾದ ಮತ್ತು ಓದಬಹುದಾದ ಸಹಾಯ ಪಡೆಯಿರಿ.",
      },
    },
    practice: {
      title: {
        en: "Safe Practice Mode",
        hi: "सुरक्षित अभ्यास मोड",
        kn: "ಸುರಕ್ಷಿತ ಅಭ್ಯಾಸ ವಿಧಾನ",
      },
      description: {
        en: "Practice a fake UPI transfer or form submit with tips when something looks wrong.",
        hi: "नकली UPI ट्रांसफर या फॉर्म सबमिट का अभ्यास करें और गलती पर सुझाव पाएं।",
        kn: "ನಕಲಿ UPI ವರ್ಗಾವಣೆ ಅಥವಾ ಫಾರ್ಮ್ ಸಲ್ಲಿಕೆಯ ಅಭ್ಯಾಸ ಮಾಡಿ ತಪ್ಪಾದಾಗ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
      },
    },
  },
};

const DOMAIN_PATHS = {
  government: "/government",
  banking: "/banking",
};

function pickLang(table, language) {
  return table[language] ?? table.en;
}

function isNaturalGuideFeature(domainKey, featureId) {
  return NATURAL_GUIDE_FEATURES.some(
    (entry) => entry.domainKey === domainKey && entry.featureId === featureId,
  );
}

function getFeatureCopy(domainKey, featureId, language) {
  const feature = FEATURE_VOICE[domainKey]?.[featureId];
  if (!feature) return null;
  const lang = language in TTS_STYLE ? language : "en";
  return {
    title: pickLang(feature.title, lang),
    description: pickLang(feature.description, lang),
  };
}

function joinWorkflowTitles(templates, language) {
  const lang = language in TTS_STYLE ? language : "en";
  const titles = templates.map((item) => pickLang(item.title, lang));
  if (titles.length <= 1) return titles[0] ?? "";
  const last = titles[titles.length - 1];
  const rest = titles.slice(0, -1).join(", ");
  const orWord = lang === "hi" ? "या" : lang === "kn" ? "ಅಥವಾ" : "or";
  return `${rest}, ${orWord} ${last}`;
}

function firstStepParts(template, language) {
  const step = template?.steps?.[0];
  if (!step) return { label: "", help: "" };
  const lang = language in TTS_STYLE ? language : "en";
  return {
    label: pickLang(step.label, lang),
    help: pickLang(step.help, lang),
  };
}

function buildNaturalSimplifyCaption(domainKey, language) {
  const lang = language in TTS_STYLE ? language : "en";
  const sample = SIMPLIFY_SAMPLE[domainKey];
  const sampleTitle = sample ? pickLang(sample.title, lang) : "";
  const scriptFn = NATURAL_SCRIPTS[domainKey]?.simplify?.[lang];
  return scriptFn ? scriptFn(sampleTitle) : "";
}

function buildNaturalFormCaption(language) {
  const lang = language in TTS_STYLE ? language : "en";
  const workflows = joinWorkflowTitles(GOV_FORMS, lang);
  const { label, help } = firstStepParts(GOV_FORMS[0], lang);
  const scriptFn = NATURAL_SCRIPTS.government.form[lang];
  return scriptFn ? scriptFn(workflows, label, help) : "";
}

function buildNaturalTaskCaption(language) {
  const lang = language in TTS_STYLE ? language : "en";
  const workflows = joinWorkflowTitles(BANK_TASKS, lang);
  const fraudTask =
    BANK_TASKS.find((task) => task.id === "report-fraud") ?? BANK_TASKS[0];
  const { label, help } = firstStepParts(fraudTask, lang);
  const scriptFn = NATURAL_SCRIPTS.banking.task[lang];
  return scriptFn ? scriptFn(workflows, label, help) : "";
}

export function featureVoiceCaption(domainKey, featureId, language = "en") {
  if (domainKey === "government" && featureId === "simplify") {
    return buildNaturalSimplifyCaption(domainKey, language);
  }
  if (domainKey === "banking" && featureId === "simplify") {
    return buildNaturalSimplifyCaption(domainKey, language);
  }
  if (domainKey === "government" && featureId === "form") {
    return buildNaturalFormCaption(language);
  }
  if (domainKey === "banking" && featureId === "task") {
    return buildNaturalTaskCaption(language);
  }

  const copy = getFeatureCopy(domainKey, featureId, language);
  if (!copy) return "";
  return `${copy.title}. ${copy.description}`;
}

export function featureVoicePrompt(domainKey, featureId, language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  const style = isNaturalGuideFeature(domainKey, featureId)
    ? NATURAL_TTS_STYLE[lang]
    : TTS_STYLE[lang];
  const body = featureVoiceCaption(domainKey, featureId, lang);
  return `${style}\n\n${body}`;
}

export function featureVoiceStyle(domainKey, featureId, language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  if (isNaturalGuideFeature(domainKey, featureId)) {
    return NATURAL_TTS_STYLE[lang];
  }
  return TTS_STYLE[lang];
}

export function featureVoiceAudioFileName(
  domainKey,
  featureId,
  language = "en",
) {
  const lang = language in TTS_STYLE ? language : "en";
  if (isNaturalGuideFeature(domainKey, featureId)) {
    return `${domainKey}-${featureId}-natural-${lang}.wav`;
  }
  return `${domainKey}-${featureId}-${lang}.wav`;
}

export function featureVoiceAudioPath(domainKey, featureId, language = "en") {
  const lang = language in TTS_STYLE ? language : "en";
  return `/audio/features/${featureVoiceAudioFileName(domainKey, featureId, lang)}`;
}

export function featurePathForDomain(domainKey) {
  return DOMAIN_PATHS[domainKey];
}

export function listFeatureVoiceEntries() {
  return Object.entries(FEATURE_VOICE).flatMap(([domainKey, features]) =>
    Object.keys(features).map((featureId) => ({ domainKey, featureId })),
  );
}
