"use client";

import { DomainFeatures } from "@/components/domain/DomainFeatures";
import { FeatureNav } from "@/components/domain/FeatureNav";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { FEATURE_DOMAINS } from "@/lib/data/features";
import { pickLang } from "@/lib/i18n";

const BANKING = {
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

const { features } = FEATURE_DOMAINS.banking;

export function BankingPageContent() {
  const { prefs } = useAccessability();
  const language = prefs.language;

  return (
    <main className="section-x pb-16">
      <div className="mx-auto max-w-6xl pt-14 sm:pt-14 md:pt-16 lg:pt-16">
        <p className="caption text-xs font-semibold uppercase tracking-widest">
          {pickLang(BANKING.label, language)}
        </p>
        <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
          {pickLang(BANKING.title, language)}
        </h1>

        <FeatureNav
          features={features}
          domainKey="banking"
          ariaLabel={pickLang(BANKING.featuresNav, language)}
        />

        <DomainFeatures features={features} domain="bank" domainKey="banking" />
      </div>
    </main>
  );
}
