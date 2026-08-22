"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/utils";

const NAV_AUTH = {
  signIn: { en: "Sign in", hi: "साइन इन", kn: "ಸೈನ್ ಇನ್" },
  signOut: { en: "Sign out", hi: "साइन आउट", kn: "ಸೈನ್ ಔಟ್" },
};

const NAV_AUTH_BTN_CLASS =
  "btn-ink flex h-9 w-9 items-center justify-center bg-white p-0 lg:h-auto lg:w-auto lg:px-4 lg:py-2 lg:text-sm lg:font-bold";

export function NavAuth() {
  const { data: session, status } = useSession();
  const { prefs } = useAccessability();
  const language = prefs.language;

  if (status === "loading") {
    return (
      <span
        className={`${NAV_AUTH_BTN_CLASS} w-9 text-xs font-semibold text-[var(--muted)] lg:min-w-[6.75rem]`}
        aria-hidden
      >
        …
      </span>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        aria-label={pickLang(NAV_AUTH.signOut, language)}
        className={NAV_AUTH_BTN_CLASS}
      >
        <LogOut
          className="h-4 w-4 lg:hidden"
          strokeWidth={2.25}
          aria-hidden
        />
        <span className="hidden lg:inline">
          {pickLang(NAV_AUTH.signOut, language)}
        </span>
      </button>
    );
  }

  return (
    <Link href="/login" className={NAV_AUTH_BTN_CLASS}>
      <LogIn className="h-4 w-4 lg:hidden" strokeWidth={2.25} aria-hidden />
      <span className="hidden lg:inline">
        {pickLang(NAV_AUTH.signIn, language)}
      </span>
    </Link>
  );
}
