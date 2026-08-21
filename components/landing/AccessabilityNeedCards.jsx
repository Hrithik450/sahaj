"use client";

import {
  ALargeSmall,
  BookOpen,
  ListOrdered,
  MousePointerClick,
  Volume2,
} from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { ACCESSIBILITY_NEEDS } from "@/lib/data/accessability-needs";
import { pickLang } from "@/lib/i18n";

const NEEDS = {
  heading: {
    en: "How would you like Sahaj to work for you?",
    hi: "आप सहज को कैसे उपयोग करना चाहेंगे?",
    kn: "ಸಹಜ ನಿಮಗೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡಬೇಕು?",
  },
  vision: {
    title: { en: "Larger Text", hi: "बड़ा टेक्स्ट", kn: "ದೊಡ್ಡ ಪಠ್ಯ" },
    description: {
      en: "Easier to read",
      hi: "पढ़ने में आसान",
      kn: "ಓದಲು ಸುಲಭ",
    },
  },
  hearing: {
    title: { en: "Voice Guidance", hi: "आवाज़ मार्गदर्शन", kn: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ" },
    description: {
      en: "Speak and listen",
      hi: "बोलें और सुनें",
      kn: "ಮಾತನಾಡಿ ಮತ್ತು ಕೇಳಿ",
    },
  },
  motor: {
    title: {
      en: "Easier Interaction",
      hi: "आसान इंटरैक्शन",
      kn: "ಸುಲಭ ಸಂವಹನ",
    },
    description: {
      en: "Bigger buttons, simple flow",
      hi: "बड़े बटन, सरल प्रवाह",
      kn: "ದೊಡ್ಡ ಬಟನ್‌ಗಳು, ಸರಳ ಹರಿವು",
    },
  },
  cognitive: {
    title: { en: "Simple Steps", hi: "सरल चरण", kn: "ಸರಳ ಹಂತಗಳು" },
    description: {
      en: "One step at a time",
      hi: "एक समय में एक कदम",
      kn: "ಒಂದು ಸಮಯದಲ್ಲಿ ಒಂದು ಹಂತ",
    },
  },
  literacy: {
    title: { en: "Simple Language", hi: "सरल भाषा", kn: "ಸರಳ ಭಾಷೆ" },
    description: {
      en: "Plain words and examples",
      hi: "सरल शब्द और उदाहरण",
      kn: "ಸರಳ ಪದಗಳು ಮತ್ತು ಉದಾಹರಣೆಗಳು",
    },
  },
};

const NEED_ICONS = {
  vision: ALargeSmall,
  hearing: Volume2,
  motor: MousePointerClick,
  cognitive: ListOrdered,
  literacy: BookOpen,
};

export function AccessibilityNeedCards() {
  const { prefs, setNeed } = useAccessability();
  const language = prefs.language;

  return (
    <div id="accessability-setup">
      <h2 className="landing-strong mb-4 text-lg sm:text-xl">
        {pickLang(NEEDS.heading, language)}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {ACCESSIBILITY_NEEDS.map((need) => {
          const isActive = prefs.need === need.id;
          const Icon = NEED_ICONS[need.id];
          const copy = NEEDS[need.id];

          return (
            <button
              key={need.id}
              type="button"
              onClick={() => setNeed(need.id)}
              aria-pressed={isActive}
              className="ink-card ink-lift flex items-center gap-2.5 p-3 text-left transition-colors sm:gap-3 sm:p-3.5"
              style={{
                backgroundColor: isActive ? "var(--blue)" : "#ffffff",
                color: isActive ? "#ffffff" : "var(--ink)",
                boxShadow: isActive
                  ? "var(--ink-shadow-hover)"
                  : "var(--ink-shadow)",
              }}
            >
              <span
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full sm:h-12 sm:w-12"
                style={{
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.22)"
                    : need.iconBg,
                  color: isActive ? "#ffffff" : need.accent,
                }}
                aria-hidden
              >
                <Icon
                  className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]"
                  strokeWidth={2.25}
                />
              </span>

              <span className="min-w-0">
                <span className="landing-strong block text-sm sm:text-[0.95rem]">
                  {pickLang(copy.title, language)}
                </span>
                <span
                  className="mt-0.5 block text-xs sm:text-sm"
                  style={{
                    color: isActive ? "rgba(255,255,255,0.88)" : "var(--muted)",
                  }}
                >
                  {pickLang(copy.description, language)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
