"use client";

import { DomainFeatures } from "@/components/domain/DomainFeatures";
import { FeatureHashGuard } from "@/components/domain/FeatureHashGuard";
import { FeatureNav } from "@/components/domain/FeatureNav";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { bankingPage } from "@/lib/features";
import { pickLang } from "@/lib/utils";

export function BankingPageContent() {
  const { prefs } = useAccessability();
  const language = prefs.language;

  return (
    <main className="section-x pb-16">
      <FeatureHashGuard />
      <div className="mx-auto max-w-6xl pt-14 sm:pt-14 md:pt-16 lg:pt-16">
        <p className="caption text-xs font-semibold uppercase tracking-widest">
          {pickLang(bankingPage.PAGE.label, language)}
        </p>
        <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
          {pickLang(bankingPage.PAGE.title, language)}
        </h1>

        <FeatureNav
          features={bankingPage.features}
          domainKey="banking"
          ariaLabel={pickLang(bankingPage.PAGE.featuresNav, language)}
        />

        <DomainFeatures
          features={bankingPage.features}
          domain="bank"
          domainKey="banking"
        />
      </div>
    </main>
  );
}
