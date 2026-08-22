"use client";

import { DomainFeatures } from "@/components/domain/DomainFeatures";
import { FeatureNav } from "@/components/domain/FeatureNav";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import * as governmentFeatures from "@/lib/data/pages/government/features";
import { pickLang } from "@/lib/i18n";

export function GovernmentPageContent() {
  const { prefs } = useAccessability();
  const language = prefs.language;

  return (
    <main className="section-x pb-16">
      <div className="mx-auto max-w-6xl pt-14 sm:pt-14 md:pt-16 lg:pt-16">
        <p className="caption text-xs font-semibold uppercase tracking-widest">
          {pickLang(governmentFeatures.PAGE.label, language)}
        </p>
        <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
          {pickLang(governmentFeatures.PAGE.title, language)}
        </h1>

        <FeatureNav
          features={governmentFeatures.features}
          domainKey="government"
          ariaLabel={pickLang(governmentFeatures.PAGE.featuresNav, language)}
        />

        <DomainFeatures
          features={governmentFeatures.features}
          domain="gov"
          domainKey="government"
        />
      </div>
    </main>
  );
}
