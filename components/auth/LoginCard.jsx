"use client";

import { signIn } from "next-auth/react";

export function LoginCard() {
  return (
    <div className="ink-card p-8 sm:p-10">
      <p className="caption text-xs font-semibold uppercase tracking-widest">
        Optional sign in
      </p>
      <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.25rem)]">
        Save your setup
      </h1>
      <p className="caption mt-3 text-sm leading-relaxed sm:text-base">
        Sahaj works without an account. Sign in with Google to sync your
        accessibility preferences across devices when you are ready.
      </p>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="btn-ink mt-8 w-full px-6 py-3 text-sm text-white sm:w-auto"
        style={{ backgroundColor: "var(--blue)" }}
      >
        Continue with Google
      </button>

      <p className="caption mt-4 text-xs leading-relaxed text-[var(--muted)]">
        Guest mode stays available. Your current setup is saved on this device
        even if you skip sign in.
      </p>
    </div>
  );
}
