import { pickLang } from "../../i18n.js";

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
