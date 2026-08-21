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
  intro: {
    en: "Pick a feature below or scroll through each section on this page. Everything runs here — no separate pages for each workflow.",
    hi: "नीचे एक सुविधा चुनें या इस पृष्ठ पर प्रत्येक अनुभाग देखें। सब कुछ यहीं चलता है — हर कार्य के लिए अलग पृष्ठ नहीं।",
    kn: "ಕೆಳಗೆ ಒಂದು ವೈಶಿಷ್ಟ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಈ ಪುಟದ ಪ್ರತಿ ವಿಭಾಗವನ್ನು ಓದಿ. ಎಲ್ಲವೂ ಇಲ್ಲಿಯೇ ನಡೆಯುತ್ತದೆ — ಪ್ರತಿ ಕೆಲಸಕ್ಕೆ ಬೇರೆ ಪುಟಗಳಿಲ್ಲ.",
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
        <p className="caption mt-4 max-w-2xl text-base leading-relaxed">
          {pickLang(BANKING.intro, language)}
        </p>

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
