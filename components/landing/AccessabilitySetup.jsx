"use client";

import { AccessibilityNeedCards } from "@/components/landing/AccessabilityNeedCards";
import { LanguagePicker } from "@/components/landing/LanguagePicker";
import { SetupContinue } from "@/components/landing/SetupContinue";

export function AccessabilitySetup() {
  return (
    <>
      <AccessibilityNeedCards />
      <LanguagePicker />
      <SetupContinue />
    </>
  );
}
