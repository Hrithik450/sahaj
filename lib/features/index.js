function pickLang(value, language = "en") {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] || value.en || "";
}

export const FEATURES_SECTION_LABEL = {
  en: "What Sahaj offers",
  hi: "सहज क्या प्रदान करता है",
  kn: "ಸಹಜ ಏನು ನೀಡುತ್ತದೆ",
};

export const FEATURES_SECTION_TITLE = {
  en: "Simple, accessible ways to understand and complete government and banking tasks.",
  hi: "सरकारी और बैंकिंग कार्यों को समझने और पूरा करने के सरल, सुलभ तरीके।",
  kn: "ಸರ್ಕಾರಿ ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಪೂರ್ಣಗೊಳಿಸಲು ಸರಳ, ಸುಲಭ ಮಾರ್ಗಗಳು.",
};

export const LANDING_FEATURES_UI = {
  learnMore: { en: "Learn more", hi: "और जानें", kn: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ" },
  scrollLeft: {
    en: "Scroll features left",
    hi: "सुविधाएं बाईं स्क्रॉल करें",
    kn: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಎಡಕ್ಕೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ",
  },
  scrollRight: {
    en: "Scroll features right",
    hi: "सुविधाएं दाईं स्क्रॉल करें",
    kn: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಬಲಕ್ಕೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ",
  },
  domains: {
    government: { en: "Government", hi: "सरकार", kn: "ಸರ್ಕಾರ" },
    banking: { en: "Banking", hi: "बैंकिंग", kn: "ಬ್ಯಾಂಕಿಂಗ್" },
  },
};

export const LANDING_FEATURE_COPY = {
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

export const FEATURE_DOMAINS = {
  government: {
    label: "Government",
    href: "/government",
    features: [
      {
        id: "simplify",
        title: "Document Simplifier",
        navHint: "Plain notices",
        description:
          "Paste a notice or letter and get a plain-language summary with clear next steps.",
        accent: "#c9bdf4",
        iconBg: "#f1eefc",
        layerA: { rotate: -6, tx: -4, ty: 2 },
        layerB: { rotate: 5, tx: 4, ty: -2 },
      },
      {
        id: "form",
        title: "Guided Form",
        navHint: "Step-by-step forms",
        description:
          "Complete government forms one field at a time with voice prompts and simple help.",
        accent: "#aeead6",
        iconBg: "#eaf9f3",
        layerA: { rotate: -5, tx: -3, ty: -3 },
        layerB: { rotate: 6, tx: 4, ty: 2 },
      },
      {
        id: "finder",
        title: "Service Finder",
        navHint: "Find services",
        description:
          "Describe what you need and find the right service, documents, and where to go next.",
        accent: "#fff3d6",
        iconBg: "#fff8e8",
        layerA: { rotate: 6, tx: 3, ty: -2 },
        layerB: { rotate: -5, tx: -4, ty: 3 },
      },
      {
        id: "companion",
        title: "Voice Companion",
        navHint: "Ask anything",
        description:
          "Ask questions in plain language and get short, actionable answers with captions.",
        accent: "#ff806d",
        iconBg: "#fff1ec",
        layerA: { rotate: -4, tx: -3, ty: 2 },
        layerB: { rotate: 5, tx: 3, ty: -2 },
      },
      {
        id: "practice",
        title: "Practice Mode",
        navHint: "Safe to try",
        description:
          "Try a simulated form or task safely, learn from mistakes, and build confidence.",
        accent: "#a8d5f2",
        iconBg: "#eef6fc",
        layerA: { rotate: 5, tx: 4, ty: 2 },
        layerB: { rotate: -6, tx: -4, ty: -2 },
      },
    ],
  },
  banking: {
    label: "Banking",
    href: "/banking",
    features: [
      {
        id: "simplify",
        title: "Document Simplifier",
        navHint: "Plain notices",
        description:
          "Understand bank letters, EMI notices, and KYC messages in simple language.",
        accent: "#c9bdf4",
        iconBg: "#f1eefc",
        layerA: { rotate: -6, tx: -4, ty: 2 },
        layerB: { rotate: 5, tx: 4, ty: -2 },
      },
      {
        id: "task",
        title: "Guided Banking Task",
        navHint: "Banking steps",
        description:
          "Walk through banking tasks like KYC or reporting fraud with one step at a time.",
        accent: "#aeead6",
        iconBg: "#eaf9f3",
        layerA: { rotate: -5, tx: -3, ty: -3 },
        layerB: { rotate: 6, tx: 4, ty: 2 },
      },
      {
        id: "transaction",
        title: "Transaction Explainer",
        navHint: "Decode SMS alerts",
        description:
          "Paste an SMS or transaction alert and learn what happened and what to check.",
        accent: "#fff3d6",
        iconBg: "#fff8e8",
        layerA: { rotate: 6, tx: 3, ty: -2 },
        layerB: { rotate: -5, tx: -4, ty: 3 },
      },
      {
        id: "companion",
        title: "Voice Companion",
        navHint: "Ask anything",
        description:
          "Ask banking questions and get streaming help you can hear and read on screen.",
        accent: "#ff806d",
        iconBg: "#fff1ec",
        layerA: { rotate: -4, tx: -3, ty: 2 },
        layerB: { rotate: 5, tx: 3, ty: -2 },
      },
      {
        id: "practice",
        title: "Safe Practice Mode",
        navHint: "Safe to try",
        description:
          "Practice a fake UPI transfer or form submit with tips when something looks wrong.",
        accent: "#a8d5f2",
        iconBg: "#eef6fc",
        layerA: { rotate: 5, tx: 4, ty: 2 },
        layerB: { rotate: -6, tx: -4, ty: -2 },
      },
    ],
  },
};

export const DEFAULT_FEATURE_DOMAIN = "government";

export const LANDING_FEATURES_VOICE_EVENT = "sahaj:play-landing-features";

const GOVERNMENT_PAGE = {
  label: { en: "Government", hi: "सरकार", kn: "ಸರ್ಕಾರ" },
  title: {
    en: "Finish government tasks with guided, accessible tools",
    hi: "मार्गदर्शित, सुलभ उपकरणों से सरकारी कार्य पूरे करें",
    kn: "ಮಾರ್ಗದರ್ಶಿತ, ಸುಲಭ ಸಾಧನಗಳೊಂದಿಗೆ ಸರ್ಕಾರಿ ಕೆಲಸಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ",
  },
  featuresNav: {
    en: "Government features",
    hi: "सरकारी सुविधाएं",
    kn: "ಸರ್ಕಾರಿ ವೈಶಿಷ್ಟ್ಯಗಳು",
  },
};

const GOVERNMENT_DOMAIN = {
  domainLabel: {
    en: "Government service",
    hi: "सरकारी सेवा",
    kn: "ಸರ್ಕಾರಿ ಸೇವೆ",
  },
  features: {
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
      title: { en: "Guided Form", hi: "मार्गदर्शित फॉर्म", kn: "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್" },
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
};

export const governmentPage = {
  PAGE: GOVERNMENT_PAGE,
  DOMAIN: GOVERNMENT_DOMAIN,
  features: FEATURE_DOMAINS.government.features,
};

const BANKING_PAGE = {
  label: { en: "Banking", hi: "बैंकिंग", kn: "ಬ್ಯಾಂಕಿಂಗ್" },
  title: {
    en: "Manage banking tasks with clarity and confidence",
    hi: "स्पष्टता और विश्वास के साथ बैंकिंग कार्य संभालें",
    kn: "ಸ್ಪಷ್ಟತೆ ಮತ್ತು ವಿಶ್ವಾಸದೊಂದಿಗೆ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
  },
  featuresNav: {
    en: "Banking features",
    hi: "बैंकिंग सुविधाएं",
    kn: "ಬ್ಯಾಂಕಿಂಗ್ ವೈಶಿಷ್ಟ್ಯಗಳು",
  },
};

const BANKING_DOMAIN = {
  domainLabel: {
    en: "Banking service",
    hi: "बैंकिंग सेवा",
    kn: "ಬ್ಯಾಂಕಿಂಗ್ ಸೇವೆ",
  },
  features: {
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

export const bankingPage = {
  PAGE: BANKING_PAGE,
  DOMAIN: BANKING_DOMAIN,
  features: FEATURE_DOMAINS.banking.features,
};

export const COMPANION_PROMPTS = {
  gov: [
    {
      en: "What documents for birth certificate?",
      hi: "जन्म प्रमाण पत्र के लिए कौन से दस्तावेज़ चाहिए?",
      kn: "ಜನ್ಮ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?",
    },
    {
      en: "What does income certificate mean?",
      hi: "आय प्रमाण पत्र का क्या मतलब है?",
      kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಎಂದರೆ ಏನು?",
    },
    {
      en: "Where do I apply for ration card?",
      hi: "राशन कार्ड के लिए कहाँ आवेदन करूँ?",
      kn: "ರೇಶನ್ ಕಾರ್ಡಿಗೆ ಎಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು?",
    },
  ],
  bank: [
    {
      en: "What is KYC?",
      hi: "KYC क्या है?",
      kn: "KYC ಎಂದರೆ ಏನು?",
    },
    {
      en: "I got an unknown UPI debit",
      hi: "मुझे अज्ञात UPI डेबिट मिला",
      kn: "ನನಗೆ ಅಪರಿಚಿತ UPI ಡೆಬಿಟ್ ಬಂದಿದೆ",
    },
    {
      en: "How do I report fraud?",
      hi: "धोखाधड़ी की रिपोर्ट कैसे करूँ?",
      kn: "ವಂಚನೆಯನ್ನು ಹೇಗೆ ವರದಿ ಮಾಡುವುದು?",
    },
  ],
};

export const BANK_NOTICES = [
  {
    id: "kyc-update-letter",
    title: {
      en: "KYC update required",
      hi: "KYC अपडेट आवश्यक",
      kn: "KYC ನವೀಕರಣ ಅಗತ್ಯ",
    },
    text: `Dear Customer,

Periodic KYC for your savings account ending 4821 is due. Visit any branch with Aadhaar and PAN by 10 September 2026 to avoid temporary debit restrictions.

You may also complete video KYC through the bank mobile app under Profile > Update KYC.`,
    fallback: {
      summary: {
        en: "Your bank KYC is due. Update it by 10 September to avoid account restrictions.",
        hi: "आपका बैंक KYC देय है। खाता प्रतिबंध से बचने के लिए 10 सितंबर तक अपडेट करें।",
        kn: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ KYC ಬಾಕಿ ಇದೆ. ಖಾತೆ ನಿರ್ಬಂಧ ತಪ್ಪಿಸಲು 10 ಸೆಪ್ಟೆಂಬರ್ ಮೊದಲು ನವೀಕರಿಸಿ.",
      },
      actions: [
        {
          en: "Complete video KYC in the mobile app",
          hi: "मोबाइल ऐप में वीडियो KYC पूरा करें",
          kn: "ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ವೀಡಿಯೋ KYC ಪೂರ್ಣಗೊಳಿಸಿ",
        },
        {
          en: "Or visit branch with Aadhaar and PAN",
          hi: "या आधार और PAN के साथ शाखा में जाएं",
          kn: "ಅಥವಾ ಆಧಾರ್ ಮತ್ತು PAN ಒಯ್ದು ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ",
        },
      ],
    },
  },
];

export const BANK_TASKS = [
  {
    id: "report-fraud",
    title: {
      en: "Report unauthorized transaction",
      hi: "अनधिकृत लेनदेन की रिपोर्ट",
      kn: "ಅನಧಿಕೃತ ವಹಿವಾಟನ್ನು ವರದಿ ಮಾಡಿ",
    },
    steps: [
      {
        id: "account-last-four",
        label: {
          en: "Last 4 digits of account",
          hi: "खाते के अंतिम 4 अंक",
          kn: "ಖಾತೆಯ ಕೊನೆಯ 4 ಅಂಕಿಗಳು",
        },
        help: {
          en: "Find this on your passbook or mobile banking home screen.",
          hi: "यह पासबुक या mobile banking home screen पर मिलेगा।",
          kn: "ಇದು ಪಾಸ್‌ಬುಕ್ ಅಥವಾ mobile banking home screen ನಲ್ಲಿ ಸಿಗುತ್ತದೆ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "transaction-amount",
        label: {
          en: "Disputed amount (Rs)",
          hi: "विवादित राशि (रु.)",
          kn: "ವಿವಾದಿತ ಮೊತ್ತ (ರೂ.)",
        },
        help: {
          en: "Enter the exact amount shown in the SMS alert.",
          hi: "SMS alert में दिखी सटीक राशि दर्ज करें।",
          kn: "SMS alert ನಲ್ಲಿ ತೋರಿಸಿದ ನಿಖರ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ.",
        },
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "savings-kyc",
    title: {
      en: "Update savings account KYC",
      hi: "बचत खाता KYC अपडेट",
      kn: "ಉಳಿತಾಯ ಖಾತೆ KYC ಅಪ್‌ಡೇಟ್",
    },
    steps: [
      {
        id: "pan",
        label: {
          en: "PAN number",
          hi: "PAN नंबर",
          kn: "PAN ಸಂಖ್ಯೆ",
        },
        help: {
          en: "10-character PAN in uppercase letters and numbers.",
          hi: "10 अक्षरों का PAN, बड़े अक्षर और संख्या।",
          kn: "10 ಅಕ್ಷರಗಳ PAN, ದೊಡ್ಡ ಅಕ್ಷರಗಳು ಮತ್ತು ಸಂಖ್ಯೆಗಳು.",
        },
        type: "text",
        required: true,
      },
    ],
  },
];

export const BANK_PRACTICE = [
  {
    id: "upi-transfer-practice",
    title: {
      en: "Practice: send Rs 50 to family",
      hi: "अभ्यास: परिवार को Rs 50 भेजें",
      kn: "ಅಭ್ಯಾಸ: ಕುಟುಂಬಕ್ಕೆ Rs 50 ಕಳುಹಿಸಿ",
    },
    steps: [
      {
        id: "amount",
        label: { en: "Amount", hi: "राशि", kn: "ಮೊತ್ತ" },
        correct: "50",
        mistakeHint: {
          en: "Double-check the amount before confirming UPI payment.",
          hi: "UPI भुगतान से पहले राशि दोबारा जांचें।",
          kn: "UPI ಪಾವತಿ ದೃಢೀಕರಿಸುವ ಮೊದಲು ಮೊತ್ತವನ್ನು ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ.",
        },
      },
      {
        id: "upi-id",
        label: { en: "UPI ID", hi: "UPI ID", kn: "UPI ID" },
        correct: "amma@oksbi",
        mistakeHint: {
          en: "Verify the UPI ID belongs to the person you intend to pay.",
          hi: "पुष्टि करें कि UPI ID सही व्यक्ति की है।",
          kn: "ನೀವು ಪಾವತಿಸಲು ಬಯಸುವ ವ್ಯಕ್ತಿಯ UPI ID ಸರಿಯಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
        },
      },
    ],
  },
  {
    id: "fraud-report-practice",
    title: {
      en: "Practice: spot a wrong transaction amount",
      hi: "अभ्यास: गलत लेनदेन राशि पहचानें",
      kn: "ಅಭ್ಯಾಸ: ತಪ್ಪಾದ ವಹಿವಾಟು ಮೊತ್ತವನ್ನು ಗುರುತಿಸಿ",
    },
    prompt: {
      en: "SMS says Rs 5,000 debited but you only bought tea for Rs 50.",
      hi: "SMS में Rs 5,000 debit दिख रहा है, जबकि chai केवल Rs 50 की थी।",
      kn: "SMS ನಲ್ಲಿ Rs 5,000 debit ಎಂದಿದೆ, ಆದರೆ ನೀವು chai ಗೆ ಕೇವಲ Rs 50 ಕೊಟ್ಟಿದ್ದೀರಿ.",
    },
    correctAction: {
      en: "Report the transaction immediately and block UPI.",
      hi: "तुरंत लेनदेन की रिपोर्ट करें और UPI ब्लॉक करें।",
      kn: "ತಕ್ಷಣ ವಹಿವಾಟನ್ನು ವರದಿ ಮಾಡಿ ಮತ್ತು UPI ಅನ್ನು ನಿರ್ಬಂಧಿಸಿ.",
    },
    mistakeHint: {
      en: "Large unexpected debits should be reported right away, not ignored.",
      hi: "अप्रत्याशित बड़े debit को नजरअंदाज न करें, तुरंत रिपोर्ट करें।",
      kn: "ಅನಿರೀಕ್ಷಿತ ದೊಡ್ಡ debit ಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸಬೇಡಿ, ತಕ್ಷಣ ವರದಿ ಮಾಡಿ.",
    },
  },
];

export const BANK_TRANSACTIONS = [
  {
    id: "upi-debit-success",
    title: {
      en: "UPI payment successful",
      hi: "UPI भुगतान सफल",
      kn: "UPI payment successful",
    },
    text: "Rs 250.00 debited from A/c **9033 on 20-Aug-26. UPI/4829108821/Paid to FreshMart. Bal: Rs 12,440.18",
    fallback: {
      summary: {
        en: "Rs 250 was sent from your account ending 9033 to FreshMart via UPI.",
        hi: "9033 वाले खाते से FreshMart को UPI से Rs 250 भेजे गए।",
        kn: "Rs 250 was sent from your account ending 9033 to FreshMart via UPI.",
      },
      checks: [
        {
          en: "If you recognize FreshMart, no action is needed.",
          hi: "अगर FreshMart पहचानते हैं तो कोई कार्रवाई नहीं।",
          kn: "If you recognize FreshMart, no action is needed.",
        },
        {
          en: "If not you, block UPI and call bank fraud helpline immediately.",
          hi: "अगर आपने नहीं किया, UPI ब्लॉक करें और fraud helpline पर कॉल करें।",
          kn: "If not you, block UPI and call bank fraud helpline immediately.",
        },
      ],
    },
  },
  {
    id: "nach-debit",
    title: {
      en: "Auto-debit (NACH) alert",
      hi: "ऑटो-डेबिट (NACH) अलर्ट",
      kn: "Auto-debit (NACH) alert",
    },
    text: "NACH debit of Rs 599.00 scheduled on 22-Aug-26 for OTTPLUS Subscription from A/c **9033. Maintain balance to avoid bounce charges.",
    fallback: {
      summary: {
        en: "Rs 599 will be auto-debited on 22 August for an OTT subscription.",
        hi: "22 अगस्त को OTT subscription के लिए Rs 599 auto-debit होंगे।",
        kn: "Rs 599 will be auto-debited on 22 August for an OTT subscription.",
      },
      checks: [
        {
          en: "Cancel the subscription in the app if you no longer want it.",
          hi: "अगर नहीं चाहिए तो ऐप में subscription रद्द करें।",
          kn: "Cancel the subscription in the app if you no longer want it.",
        },
      ],
    },
  },
  {
    id: "salary-credit",
    title: {
      en: "Salary credit alert",
      hi: "वेतन जमा अलर्ट",
      kn: "Salary credit alert",
    },
    text: "INR 42,500.00 credited to A/c **9033 on 20-Aug-26. Info: SALARY AUG/ACME TECH. Avl Bal INR 54,940.18",
    fallback: {
      summary: {
        en: "Salary of Rs 42,500 from ACME TECH was credited to account ending 9033.",
        hi: "ACME TECH से Rs 42,500 वेतन 9033 खाते में जमा हुआ।",
        kn: "Salary of Rs 42,500 from ACME TECH was credited to account ending 9033.",
      },
      checks: [
        {
          en: "Verify amount matches your payslip.",
          hi: "राशि payslip से मेल खाती है या जांचें।",
          kn: "Verify amount matches your payslip.",
        },
      ],
    },
  },
];

export const GOV_NOTICES = [
  {
    id: "income-certificate-reminder",
    title: {
      en: "Income certificate application reminder",
      hi: "आय प्रमाण पत्र आवेदन अनुस्मारक",
      kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿ ನೆನಪು",
    },
    text: `Dear Applicant,

Your application for an Income Certificate (Ref: INC/2026/88421) is pending document upload. Please upload your Aadhaar and latest salary slip on the municipal portal before 30 August 2026.

If documents are not received, the application may be marked incomplete.

Municipal Citizen Services`,
    fallback: {
      summary: {
        en: "Your income certificate application is waiting for Aadhaar and salary slip uploads.",
        hi: "आपका आय प्रमाण पत्र आवेदन आधार और वेतन पर्ची अपलोड की प्रतीक्षा कर रहा है।",
        kn: "ನಿಮ್ಮ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿಯಲ್ಲಿ ಆಧಾರ್ ಮತ್ತು ಸ್ಯಾಲರಿ ಸ್ಲಿಪ್ ಅಪ್‌ಲೋಡ್ ಬಾಕಿ ಇದೆ.",
      },
      actions: [
        {
          en: "Upload Aadhaar and salary slip on the municipal portal",
          hi: "नगर पालिका पोर्टल पर आधार और वेतन पर्ची अपलोड करें",
          kn: "ನಗರ ಪಾಲಿಕೆ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಆಧಾರ್ ಮತ್ತು ಸ್ಯಾಲರಿ ಸ್ಲಿಪ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        },
        {
          en: "Complete upload before 30 August 2026",
          hi: "30 अगस्त 2026 से पहले अपलोड पूरा करें",
          kn: "30 ಆಗಸ್ಟ್ 2026 ರ ಮೊದಲು ಅಪ್‌ಲೋಡ್ ಪೂರ್ಣಗೊಳಿಸಿ",
        },
      ],
    },
  },
];

export const GOV_FORMS = [
  {
    id: "income-certificate",
    title: {
      en: "Apply for income certificate",
      hi: "आय प्रमाण पत्र के लिए आवेदन",
      kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಕ್ಕಾಗಿ ಅರ್ಜಿ",
    },
    steps: [
      {
        id: "full-name",
        label: {
          en: "Your full name",
          hi: "आपका पूरा नाम",
          kn: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
        },
        help: {
          en: "Write your name exactly as it appears on Aadhaar.",
          hi: "नाम वैसा ही लिखें जैसा आधार पर है।",
          kn: "ಆಧಾರ್‌ನಲ್ಲಿರುವಂತೆ ನಿಮ್ಮ ಹೆಸರನ್ನು ನಿಖರವಾಗಿ ಬರೆಯಿರಿ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "aadhaar",
        label: {
          en: "Aadhaar number",
          hi: "आधार नंबर",
          kn: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
        },
        help: {
          en: "Enter the 12-digit number without spaces.",
          hi: "12 अंकों का नंबर बिना space के दर्ज करें।",
          kn: "12 ಅಂಕಿಗಳ ಸಂಖ್ಯೆಯನ್ನು ಖಾಲಿ ಜಾಗ ಇಲ್ಲದೆ ನಮೂದಿಸಿ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "annual-income",
        label: {
          en: "Annual income (in rupees)",
          hi: "वार्षिक आय (रुपये में)",
          kn: "ವಾರ್ಷಿಕ ಆದಾಯ (ರೂಪಾಯಿಗಳಲ್ಲಿ)",
        },
        help: {
          en: "Enter your total yearly income before tax.",
          hi: "कर से पहले की कुल वार्षिक आय दर्ज करें।",
          kn: "ತೆರಿಗೆಗೂ ಮೊದಲಿನ ನಿಮ್ಮ ಒಟ್ಟು ವಾರ್ಷಿಕ ಆದಾಯವನ್ನು ನಮೂದಿಸಿ.",
        },
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "birth-certificate",
    title: {
      en: "Apply for birth certificate",
      hi: "जन्म प्रमाण पत्र के लिए आवेदन",
      kn: "ಜನ್ಮ ಪ್ರಮಾಣಪತ್ರಕ್ಕಾಗಿ ಅರ್ಜಿ",
    },
    steps: [
      {
        id: "child-name",
        label: {
          en: "Child's full name",
          hi: "बच्चे का पूरा नाम",
          kn: "ಮಗುವಿನ ಪೂರ್ಣ ಹೆಸರು",
        },
        help: {
          en: "Use the name given at birth registration.",
          hi: "जन्म पंजीकरण में दिया गया नाम उपयोग करें।",
          kn: "ಜನ್ಮ ನೋಂದಣಿಯಲ್ಲಿ ನೀಡಿದ ಹೆಸರನ್ನು ಬಳಸಿ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "date-of-birth",
        label: {
          en: "Date of birth",
          hi: "जन्म तिथि",
          kn: "ಜನ್ಮ ದಿನಾಂಕ",
        },
        help: {
          en: "Format: DD/MM/YYYY",
          hi: "प्रारूप: DD/MM/YYYY",
          kn: "ಸ್ವರೂಪ: DD/MM/YYYY",
        },
        type: "text",
        required: true,
      },
    ],
  },
];

export const GOV_PRACTICE = [
  {
    id: "income-form-practice",
    title: {
      en: "Practice: income certificate form",
      hi: "अभ्यास: आय प्रमाण पत्र फॉर्म",
      kn: "ಅಭ್ಯಾಸ: ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಫಾರ್ಮ್",
    },
    steps: [
      {
        id: "full-name",
        label: { en: "Full name", hi: "पूरा नाम", kn: "ಪೂರ್ಣ ಹೆಸರು" },
        correct: "Ananya Sharma",
        mistakeHint: {
          en: "Use the name exactly as on Aadhaar, not a nickname.",
          hi: "उपनाम नहीं, आधार जैसा नाम उपयोग करें।",
          kn: "ಆಧಾರ್‌ನಲ್ಲಿರುವ ಹೆಸರನ್ನು ನಿಖರವಾಗಿ ಬರೆಯಿರಿ, ಉಪನಾಮ ಅಲ್ಲ.",
        },
      },
      {
        id: "aadhaar",
        label: { en: "Aadhaar number", hi: "आधार नंबर", kn: "ಆಧಾರ್ ಸಂಖ್ಯೆ" },
        correct: "123456789012",
        mistakeHint: {
          en: "Aadhaar must be 12 digits with no spaces or dashes.",
          hi: "आधार 12 अंकों का हो, space या dash नहीं।",
          kn: "ಆಧಾರ್ 12 ಅಂಕಿಗಳಾಗಿರಬೇಕು, ಖಾಲಿ ಜಾಗ ಅಥವಾ dash ಇಲ್ಲದೆ.",
        },
      },
    ],
  },
  {
    id: "service-finder-practice",
    title: {
      en: "Practice: find the right service",
      hi: "अभ्यास: सही सेवा खोजें",
      kn: "ಅಭ್ಯಾಸ: ಸರಿಯಾದ ಸೇವೆ ಹುಡುಕಿ",
    },
    prompt: {
      en: "You need proof of yearly income for a college scholarship.",
      hi: "कॉलेज छात्रवृत्ति के लिए वार्षिक आय का प्रमाण चाहिए।",
      kn: "ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕಾಗಿ ವಾರ್ಷಿಕ ಆದಾಯದ ಪ್ರಮಾಣ ಬೇಕು.",
    },
    correctServiceId: "income-certificate",
    mistakeHint: {
      en: "Scholarships usually need an income certificate, not a birth certificate.",
      hi: "छात्रवृत्ति के लिए आमतौर पर आय प्रमाण पत्र चाहिए, जन्म प्रमाण पत्र नहीं।",
      kn: "ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗೆ ಸಾಮಾನ್ಯವಾಗಿ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಬೇಕು, ಜನ್ಮ ಪ್ರಮಾಣಪತ್ರ ಅಲ್ಲ.",
    },
  },
];

export const GOV_SERVICES = [
  {
    id: "birth-certificate",
    keywords: ["birth", "certificate", "janam", "born", "baby"],
    title: {
      en: "Birth certificate",
      hi: "जन्म प्रमाण पत्र",
      kn: "Birth certificate",
    },
    summary: {
      en: "Get an official record of birth for school admission, passport, or benefits.",
      hi: "स्कूल, पासपोर्ट या लाभ के लिए जन्म का आधिकारिक रिकॉर्ड प्राप्त करें।",
      kn: "Get an official record of birth for school admission, passport, or benefits.",
    },
    nextStep: {
      en: "Apply through the municipal registrar with hospital discharge papers.",
      hi: "अस्पताल की discharge papers के साथ नगर registrars के माध्यम से आवेदन करें।",
      kn: "Apply through the municipal registrar with hospital discharge papers.",
    },
  },
  {
    id: "income-certificate",
    keywords: ["income", "certificate", "aay", "scholarship", "subsidy"],
    title: {
      en: "Income certificate",
      hi: "आय प्रमाण पत्र",
      kn: "Income certificate",
    },
    summary: {
      en: "Prove yearly family income for scholarships, fee concessions, or schemes.",
      hi: "छात्रवृत्ति, शुल्क छूट या योजनाओं के लिए वार्षिक पारिवारिक आय साबित करें।",
      kn: "Prove yearly family income for scholarships, fee concessions, or schemes.",
    },
    nextStep: {
      en: "Apply at the tehsildar office or online citizen portal with income proof.",
      hi: "आय प्रमाण के साथ तहसीलदार कार्यालय या ऑनलाइन पोर्टल पर आवेदन करें।",
      kn: "Apply at the tehsildar office or online citizen portal with income proof.",
    },
  },
  {
    id: "ration-card",
    keywords: ["ration", "food", "pds", "card", "bpl"],
    title: {
      en: "Ration card update",
      hi: "राशन कार्ड अपडेट",
      kn: "Ration card update",
    },
    summary: {
      en: "Add a family member or correct details on your PDS ration card.",
      hi: "PDS राशन कार्ड पर परिवार के सदस्य को जोड़ें या विवरण सुधारें।",
      kn: "Add a family member or correct details on your PDS ration card.",
    },
    nextStep: {
      en: "Visit the fair price shop operator or state food portal with Aadhaar copies.",
      hi: "आधार की प्रति के साथ fair price shop या राज्य food portal पर जाएं।",
      kn: "Visit the fair price shop operator or state food portal with Aadhaar copies.",
    },
  },
  {
    id: "caste-certificate",
    keywords: ["caste", "category", "sc", "st", "obc"],
    title: {
      en: "Caste certificate",
      hi: "जाति प्रमाण पत्र",
      kn: "Caste certificate",
    },
    summary: {
      en: "Obtain caste proof for education seats, jobs, or reservation benefits.",
      hi: "शिक्षा, नौकरी या आरक्षण लाभ के लिए जाति प्रमाण प्राप्त करें।",
      kn: "Obtain caste proof for education seats, jobs, or reservation benefits.",
    },
    nextStep: {
      en: "Submit application with parent certificate and local verification at SDM office.",
      hi: "माता-पिता प्रमाण और स्थानीय सत्यापन के साथ SDM कार्यालय में आवेदन दें।",
      kn: "Submit application with parent certificate and local verification at SDM office.",
    },
  },
  {
    id: "property-tax",
    keywords: ["property", "tax", "house", "municipal", "bbmp"],
    title: {
      en: "Property tax payment",
      hi: "संपत्ति कर भुगतान",
      kn: "Property tax payment",
    },
    summary: {
      en: "Pay annual property tax for residential or commercial property.",
      hi: "आवासीय या व्यावसायिक संपत्ति का वार्षिक कर भुगतान करें।",
      kn: "Pay annual property tax for residential or commercial property.",
    },
    nextStep: {
      en: "Pay on the city municipal portal using property ID and last assessment number.",
      hi: "संपत्ति ID और पिछले assessment number से नगर पालिका पोर्टल पर भुगतान करें।",
      kn: "Pay on the city municipal portal using property ID and last assessment number.",
    },
  },
];

const SERVICE_PORTALS = {
  "birth-certificate": {
    portal: {
      en: "sevasindhu.karnataka.gov.in",
      hi: "sevasindhu.karnataka.gov.in",
      kn: "sevasindhu.karnataka.gov.in",
    },
    steps: {
      en: ["Home", "Citizen services", "Birth certificate", "Apply online"],
      hi: ["होम", "नागरिक सेवाएं", "जन्म प्रमाण पत्र", "ऑनलाइन आवेदन"],
      kn: ["ಮುಖಪುಟ", "ನಾಗರಿಕ ಸೇವೆಗಳು", "ಜನ್ಮ ಪ್ರಮಾಣಪತ್ರ", "ಆನ್‌ಲೈನ್ ಅರ್ಜಿ"],
    },
  },
  "income-certificate": {
    portal: {
      en: "umang.gov.in",
      hi: "umang.gov.in",
      kn: "umang.gov.in",
    },
    steps: {
      en: ["Home", "State services", "Income certificate", "New application"],
      hi: ["होम", "राज्य सेवाएं", "आय प्रमाण पत्र", "नया आवेदन"],
      kn: ["ಮುಖಪುಟ", "ರಾಜ್ಯ ಸೇವೆಗಳು", "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ", "ಹೊಸ ಅರ್ಜಿ"],
    },
  },
  "ration-card": {
    portal: {
      en: "nfsa.gov.in",
      hi: "nfsa.gov.in",
      kn: "nfsa.gov.in",
    },
    steps: {
      en: ["Home", "Ration card", "Member update", "Submit details"],
      hi: ["होम", "राशन कार्ड", "सदस्य अपडेट", "विवरण जमा करें"],
      kn: ["ಮುಖಪುಟ", "ರೇಶನ್ ಕಾರ್ಡ್", "ಸದಸ್ಯ ನವೀಕರಣ", "ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ"],
    },
  },
  "caste-certificate": {
    portal: {
      en: "edistrict.gov.in",
      hi: "edistrict.gov.in",
      kn: "edistrict.gov.in",
    },
    steps: {
      en: ["Home", "Certificate services", "Caste certificate", "Apply"],
      hi: ["होम", "प्रमाण पत्र सेवाएं", "जाति प्रमाण पत्र", "आवेदन करें"],
      kn: ["ಮುಖಪುಟ", "ಪ್ರಮಾಣಪತ್ರ ಸೇವೆಗಳು", "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ", "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ"],
    },
  },
  "property-tax": {
    portal: {
      en: "bbmponline.nic.in",
      hi: "bbmponline.nic.in",
      kn: "bbmponline.nic.in",
    },
    steps: {
      en: ["Home", "Property tax", "View bill", "Pay online"],
      hi: ["होम", "संपत्ति कर", "बिल देखें", "ऑनलाइन भुगतान"],
      kn: ["ಮುಖಪುಟ", "ಆಸ್ತಿ ತೆರಿಗೆ", "ಬಿಲ್ ನೋಡಿ", "ಆನ್‌ಲೈನ್ ಪಾವತಿ"],
    },
  },
};

const DEFAULT_PORTAL_ID = "income-certificate";

function portalConfig(serviceId) {
  return SERVICE_PORTALS[serviceId] ?? SERVICE_PORTALS[DEFAULT_PORTAL_ID];
}

export function servicePortalHost(serviceId, language = "en") {
  return pickLang(portalConfig(serviceId).portal, language);
}

export function servicePortalSteps(serviceId, language = "en") {
  return pickLang(portalConfig(serviceId).steps, language);
}

export function servicePortalPath(serviceId, language = "en") {
  const host = servicePortalHost(serviceId, language);
  const steps = servicePortalSteps(serviceId, language);
  return `${host} → ${steps.join(" → ")}`;
}

function joinStepsNaturally(steps, language) {
  if (steps.length === 0) return "";
  if (steps.length === 1) return steps[0];

  if (steps.length === 4) {
    const [a, b, c, d] = steps;
    if (language === "hi") {
      return `${a} पर जाएँ, ${b} खोलें, ${c} चुनें, और ${d} पर टैप करें`;
    }
    if (language === "kn") {
      return `${a} ಒತ್ತಿ, ${b} ತೆರೆಯಿರಿ, ${c} ಆಯ್ಕೆಮಾಡಿ, ಮತ್ತು ${d} ಒತ್ತಿ`;
    }
    return `start at ${a}, open ${b}, look for ${c} and tap it, then choose ${d}`;
  }

  const last = steps[steps.length - 1];
  const beforeLast = steps.slice(0, -1);

  if (language === "hi") {
    return `${beforeLast.join(", उसके बाद ")} और अंत में ${last}`;
  }

  if (language === "kn") {
    return `${beforeLast.join(", ಆದ ಮೇಲೆ ")} ಮತ್ತು ಕೊನೆಯಲ್ಲಿ ${last}`;
  }

  return `${beforeLast.join(", then ")} and finally ${last}`;
}

const VOICE_SCRIPTS = {
  en: (host, steps) => {
    const path = joinStepsNaturally(steps, "en");
    return `Let me walk you through this — don't worry, it's simpler than it looks. On your phone or computer, open ${host}. When the page loads, ${path}. That's the application page where you fill in your details and submit.`;
  },
  hi: (host, steps) => {
    const path = joinStepsNaturally(steps, "hi");
    return `मैं आपको आराम से रास्ता बताता हूँ। अपने phone या computer पर ${host} खोलें। साइट खुलने पर ${path}। वहाँ आवेदन फॉर्म मिलेगा — विवरण भरकर जमा कर दें।`;
  },
  kn: (host, steps) => {
    const path = joinStepsNaturally(steps, "kn");
    return `ನಾನು ನಿಮಗೆ ಸುಲಭವಾಗಿ ಮಾರ್ಗ ತೋರಿಸುತ್ತೇನೆ — ಭಯಬೇಡಿ, ಇದು ಸರಳವಾಗಿದೆ. ನಿಮ್ಮ phone ಅಥವಾ computer ನಲ್ಲಿ ${host} ತೆರೆಯಿರಿ. ಪುಟ ತೆರೆದ ನಂತರ ${path}. ಅಲ್ಲಿ ಅರ್ಜಿ ಫಾರ್ಮ್ ಸಿಗುತ್ತದೆ — ವಿವರಗಳನ್ನು ಪೂರಿಸಿ ಸಲ್ಲಿಸಿ.`;
  },
};

export function servicePortalVoice(service, language = "en") {
  const lang = language in VOICE_SCRIPTS ? language : "en";
  const host = servicePortalHost(service.id, lang);
  const steps = servicePortalSteps(service.id, lang);
  return VOICE_SCRIPTS[lang](host, steps);
}
