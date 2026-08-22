"use client";

import { DomainFeatures } from "@/components/domain/DomainFeatures";
import { FeatureNav } from "@/components/domain/FeatureNav";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import * as bankingFeatures from "@/lib/data/pages/banking/features";
import { pickLang } from "@/lib/i18n";

export function BankingPageContent() {
  const { prefs } = useAccessability();
  const language = prefs.language;

  return (
    <main className="section-x pb-16">
      <div className="mx-auto max-w-6xl pt-14 sm:pt-14 md:pt-16 lg:pt-16">
        <p className="caption text-xs font-semibold uppercase tracking-widest">
          {pickLang(bankingFeatures.PAGE.label, language)}
        </p>
        <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
          {pickLang(bankingFeatures.PAGE.title, language)}
        </h1>

        <FeatureNav
          features={bankingFeatures.features}
          domainKey="banking"
          ariaLabel={pickLang(bankingFeatures.PAGE.featuresNav, language)}
        />

        <DomainFeatures
          features={bankingFeatures.features}
          domain="bank"
          domainKey="banking"
        />
      </div>
    </main>
  );
}
