"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { SITE } from "@/lib/site";

export function SetupContinue() {
  const { prefs, completeSetup } = useAccessability();
  const canContinue = Boolean(prefs.need);

  return (
    <div className="mt-6">
      <button
        id="hero-continue-btn"
        type="button"
        onClick={completeSetup}
        disabled={!canContinue}
        className="btn-ink flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base text-white sm:py-4 sm:text-lg"
        style={{ backgroundColor: "var(--blue)" }}
      >
        Continue to {SITE.name}
        <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
      </button>

      {!canContinue && (
        <p className="caption mt-2 text-center text-xs sm:text-left sm:text-sm">
          Choose how you would like Sahaj to work before continuing.
        </p>
      )}

      <p className="caption mt-3 flex items-center justify-center gap-1.5 text-xs sm:justify-start sm:text-sm">
        <Lock
          className="h-3.5 w-3.5 flex-none"
          strokeWidth={2.25}
          aria-hidden
        />
        Your preferences are private and safe with us.
      </p>
    </div>
  );
}
