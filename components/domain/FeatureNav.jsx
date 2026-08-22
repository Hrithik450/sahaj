"use client";

import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { markFeatureVoiceIntent } from "@/components/voice/VoiceShell";
import { playFeatureIntro, stopSpeaking } from "@/lib/voice";
import { pickLang } from "@/lib/i18n";

const FEATURE_TITLES = {
  government: {
    simplify: {
      en: "Document Simplifier",
      hi: "दस्तावेज़ सरलीकरण",
      kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
    },
    form: { en: "Guided Form", hi: "मार्गदर्शित फॉर्म", kn: "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್" },
    finder: { en: "Service Finder", hi: "सेवा खोज", kn: "ಸೇವೆ ಹುಡುಕಾಟ" },
    companion: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
    practice: { en: "Practice Mode", hi: "अभ्यास मोड", kn: "ಅಭ್ಯಾಸ ವಿಧಾನ" },
  },
  banking: {
    simplify: {
      en: "Document Simplifier",
      hi: "दस्तावेज़ सरलीकरण",
      kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
    },
    task: {
      en: "Guided Banking Task",
      hi: "मार्गदर्शित बैंकिंग कार्य",
      kn: "ಮಾರ್ಗದರ್ಶಿತ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸ",
    },
    transaction: {
      en: "Transaction Explainer",
      hi: "लेनदेन व्याख्याकार",
      kn: "ವಹಿವಾಟು ವಿವರಣೆ",
    },
    companion: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
    practice: {
      en: "Safe Practice Mode",
      hi: "सुरक्षित अभ्यास मोड",
      kn: "ಸುರಕ್ಷಿತ ಅಭ್ಯಾಸ ವಿಧಾನ",
    },
  },
};

function scrollToFeature(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function FeatureNav({ features, domainKey, ariaLabel = "Features" }) {
  const { prefs } = useAccessability();
  const language = prefs.language;

  function handleFeatureClick(feature) {
    stopSpeaking();
    scrollToFeature(feature.id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${feature.id}`);
    }
    if (prefs.voiceEnabled) {
      playFeatureIntro(domainKey, feature.id, language);
    } else {
      markFeatureVoiceIntent(domainKey, feature.id);
    }
  }

  return (
    <nav
      className="flex flex-nowrap gap-4 overflow-x-auto scroll-smooth py-8 pb-4 sm:gap-5 lg:flex-wrap lg:overflow-visible lg:pb-8"
      aria-label={ariaLabel}
    >
      {features.map((feature) => (
        <button
          key={feature.id}
          type="button"
          onClick={() => handleFeatureClick(feature)}
          className="sticker-label ink-lift shrink-0 rounded-[1.75rem] border border-[var(--ink)] bg-transparent px-5 py-3 text-left shadow-[-1.5px_1.5px_0_0_var(--ink)] sm:px-6"
        >
          <span className="block leading-tight">
            {pickLang(FEATURE_TITLES[domainKey]?.[feature.id], language) ||
              feature.title}
          </span>
        </button>
      ))}
    </nav>
  );
}
