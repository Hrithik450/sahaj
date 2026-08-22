"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/utils";
import { SITE } from "@/lib/site";

const SETUP = {
  continue: {
    en: "Continue to",
    hi: "पर जारी रखें",
    kn: "ಗೆ ಮುಂದುವರಿಯಿರಿ",
  },
  chooseNeed: {
    en: "Choose how you would like Sahaj to work before continuing.",
    hi: "आगे बढ़ने से पहले चुनें कि सहज आपके लिए कैसे काम करे।",
    kn: "ಮುಂದುವರಿಯುವ ಮೊದಲು ಸಹಜ ನಿಮಗೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡಬೇಕು ಎಂದು ಆಯ್ಕೆಮಾಡಿ.",
  },
  privacy: {
    en: "Your preferences are private and safe with us.",
    hi: "आपकी पसंद हमारे साथ निजी और सुरक्षित है।",
    kn: "ನಿಮ್ಮ ಆದ್ಯತೆಗಳು ನಮ್ಮ ಬಳಿ ಖಾಸಗಿ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿವೆ.",
  },
};

function continueText(language) {
  const label = pickLang(SETUP.continue, language);

  if (language === "en") {
    return `${label} ${SITE.name}`;
  }

  if (language === "kn") {
    return `${SITE.name}${label}`;
  }

  return `${SITE.name} ${label}`;
}

export function SetupContinue() {
  const { prefs, completeSetup } = useAccessability();
  const language = prefs.language;
  const canContinue = Boolean(prefs.need);

  return (
    <div className="mt-6">
      <button
        id="hero-continue-btn"
        type="button"
        onClick={completeSetup}
        disabled={!canContinue}
        className="btn-ink flex w-full items-center justify-center gap-2 px-6 py-2.5 text-base text-white sm:py-3 sm:text-lg"
        style={{ backgroundColor: "var(--blue)" }}
      >
        {continueText(language)}
        <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
      </button>

      {!canContinue && (
        <p className="caption mt-2 text-center text-xs sm:text-left sm:text-sm">
          {pickLang(SETUP.chooseNeed, language)}
        </p>
      )}

      <p className="caption mt-3 flex items-center justify-center gap-1.5 text-xs sm:justify-start sm:text-sm">
        <Lock
          className="h-3.5 w-3.5 flex-none"
          strokeWidth={2.25}
          aria-hidden
        />
        {pickLang(SETUP.privacy, language)}
      </p>
    </div>
  );
}
