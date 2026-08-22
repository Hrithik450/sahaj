"use client";

import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { registerOnboardingTarget } from "@/lib/onboarding-targets";
import { LANGUAGES } from "@/lib/data/languages";

const LANGUAGE_SHORT = {
  en: "En",
  kn: "ಕ",
  hi: "हिं",
};

export function NavLanguageButton() {
  const { prefs, setLanguage } = useAccessability();
  const current =
    LANGUAGES.find((language) => language.id === prefs.language) ??
    LANGUAGES[0];

  function cycleLanguage() {
    const index = LANGUAGES.findIndex((language) => language.id === current.id);
    const next = LANGUAGES[(index + 1) % LANGUAGES.length];
    setLanguage(next.id);
  }

  return (
    <button
      id="nav-language-btn"
      ref={(node) => registerOnboardingTarget("nav-language-btn", node)}
      type="button"
      onClick={cycleLanguage}
      aria-label={`Language: ${current.label}. Click to change.`}
      className="btn-ink flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden bg-white p-0 text-xs font-bold"
    >
      {LANGUAGE_SHORT[current.id] ?? current.id}
    </button>
  );
}
