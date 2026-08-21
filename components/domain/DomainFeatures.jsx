"use client";

import { CompanionChat } from "@/components/shared/CompanionChat";
import { PracticeRunner } from "@/components/shared/PracticeRunner";
import { Simplifier } from "@/components/shared/Simplifier";
import { StepWizard } from "@/components/shared/StepWizard";
import { ServiceFinder } from "@/components/shared/ServiceFinder";
import { TransactionExplainer } from "@/components/shared/TransactionExplainer";
import { BANK_NOTICES } from "@/data/bank/notices";
import { BANK_PRACTICE } from "@/data/bank/practice";
import { BANK_TASKS } from "@/data/bank/tasks";
import { GOV_FORMS } from "@/data/gov/forms";
import { GOV_NOTICES } from "@/data/gov/notices";
import { GOV_PRACTICE } from "@/data/gov/practice";
import { FeatureSection } from "@/components/domain/FeatureSection";

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

  return (
    <p className="text-sm leading-relaxed text-[var(--muted)]">
      Interactive tools for {feature.title.toLowerCase()} will appear here
      shortly.
    </p>
  );
}

export function DomainFeatures({ features, domain, domainLabel }) {
  return (
    <>
      {features.map((feature) => (
        <FeatureSection
          key={feature.id}
          feature={feature}
          domainLabel={domainLabel}
        >
          <FeatureBody feature={feature} domain={domain} />
        </FeatureSection>
      ))}
    </>
  );
}
