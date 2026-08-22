"use client";

import { DomainFeatures } from "@/components/domain/DomainFeatures";
import { FeatureNav } from "@/components/domain/FeatureNav";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { FEATURE_DOMAINS } from "@/lib/data/features";
import { pickLang } from "@/lib/i18n";

const GOVERNMENT = {
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

const { features } = FEATURE_DOMAINS.government;

export function GovernmentPageContent() {
  const { prefs } = useAccessability();
  const language = prefs.language;

  return (
    <main className="section-x pb-16">
      <div className="mx-auto max-w-6xl pt-14 sm:pt-14 md:pt-16 lg:pt-16">
        <p className="caption text-xs font-semibold uppercase tracking-widest">
          {pickLang(GOVERNMENT.label, language)}
        </p>
        <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
          {pickLang(GOVERNMENT.title, language)}
        </h1>

        <FeatureNav
          features={features}
          domainKey="government"
          ariaLabel={pickLang(GOVERNMENT.featuresNav, language)}
        />

        <DomainFeatures
          features={features}
          domain="gov"
          domainKey="government"
        />
      </div>
    </main>
  );
}
