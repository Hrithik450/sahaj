"use client";

import { ArrowRight, Lock } from "lucide-react";
import { SITE } from "@/lib/site";

export function SetupContinue({ onContinue }) {
  return (
    <div className="mt-6">
      <button
        id="hero-continue-btn"
        type="button"
        onClick={onContinue}
        className="btn-ink flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base text-white sm:py-4 sm:text-lg"
        style={{ backgroundColor: "var(--blue)" }}
      >
        Continue to {SITE.name}
        <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
      </button>

      <p className="caption mt-3 flex items-center justify-center gap-1.5 text-xs sm:justify-start sm:text-sm">
        <Lock className="h-3.5 w-3.5 flex-none" strokeWidth={2.25} aria-hidden />
        Your preferences are private and safe with us.
      </p>
    </div>
  );
}
