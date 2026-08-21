"use client";

import dynamic from "next/dynamic";

const OnboardingOverlay = dynamic(
  () =>
    import("@/components/landing/OnboardingOverlay").then(
      (mod) => mod.OnboardingOverlay,
    ),
  { ssr: false },
);

export function ClientOnboardingOverlay() {
  return <OnboardingOverlay />;
}
