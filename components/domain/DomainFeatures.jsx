"use client";

import { CompanionChat } from "@/components/shared/CompanionChat";
import { PracticeRunner } from "@/components/shared/PracticeRunner";
import { Simplifier } from "@/components/shared/Simplifier";
import { StepWizard } from "@/components/shared/StepWizard";
import { ServiceFinder } from "@/components/shared/ServiceFinder";
import { TransactionExplainer } from "@/components/shared/TransactionExplainer";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { FeatureSection } from "@/components/domain/FeatureSection";
import { DOMAIN as BANKING_DOMAIN } from "@/lib/data/pages/banking/features";
import { DOMAIN as GOVERNMENT_DOMAIN } from "@/lib/data/pages/government/features";
import { BANK_NOTICES } from "@/lib/data/bank/notices";
import { BANK_PRACTICE } from "@/lib/data/bank/practice";
import { BANK_TASKS } from "@/lib/data/bank/tasks";
import { GOV_FORMS } from "@/lib/data/gov/forms";
import { GOV_NOTICES } from "@/lib/data/gov/notices";
import { GOV_PRACTICE } from "@/lib/data/gov/practice";
import { pickLang } from "@/lib/i18n";

const DOMAIN = {
  government: GOVERNMENT_DOMAIN,
  banking: BANKING_DOMAIN,
};

function FeatureBody({ feature, domain }) {
  if (feature.id === "simplify") {
    return (
      <Simplifier
        domain={domain}
        samples={domain === "bank" ? BANK_NOTICES : GOV_NOTICES}
      />
    );
  }

  if (feature.id === "form") {
    return <StepWizard templates={GOV_FORMS} />;
  }

  if (feature.id === "task") {
    return <StepWizard templates={BANK_TASKS} />;
  }

  if (feature.id === "finder" && domain === "gov") {
    return <ServiceFinder />;
  }

  if (feature.id === "transaction" && domain === "bank") {
    return <TransactionExplainer />;
  }

  if (feature.id === "companion") {
    return <CompanionChat domain={domain} />;
  }

  if (feature.id === "practice") {
    return (
      <PracticeRunner
        scenarios={domain === "bank" ? BANK_PRACTICE : GOV_PRACTICE}
      />
    );
  }

  return null;
}

export function DomainFeatures({ features, domain, domainKey }) {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const copy = DOMAIN[domainKey];

  return (
    <>
      {features.map((feature) => {
        const featureCopy = copy.features[feature.id] || {};
        return (
          <FeatureSection
            key={feature.id}
            id={feature.id}
            title={pickLang(featureCopy.title, language) || feature.title}
            description={
              pickLang(featureCopy.description, language) || feature.description
            }
            domainLabel={pickLang(copy.domainLabel, language)}
          >
            <FeatureBody feature={feature} domain={domain} />
          </FeatureSection>
        );
      })}
    </>
  );
}
