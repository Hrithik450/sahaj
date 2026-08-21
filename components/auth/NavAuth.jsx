"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

export function NavAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="caption flex h-9 w-9 items-center justify-center text-xs font-semibold text-[var(--muted)] sm:h-auto sm:w-auto">
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="caption hidden max-w-[8rem] truncate text-xs font-semibold sm:inline">
          {session.user.name || session.user.email}
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          aria-label="Sign out"
          className="btn-ink flex h-9 w-9 items-center justify-center bg-white p-0 sm:h-auto sm:w-auto sm:px-3 sm:py-1.5 sm:text-sm"
        >
          <LogOut className="h-4 w-4 sm:hidden" strokeWidth={2.25} aria-hidden />
          <span className="hidden text-xs sm:inline">Sign out</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      aria-label="Sign in"
      className="btn-ink flex h-9 w-9 items-center justify-center bg-white p-0 sm:h-auto sm:w-auto sm:px-3 sm:py-1.5 sm:text-sm"
    >
      <LogIn className="h-4 w-4 sm:hidden" strokeWidth={2.25} aria-hidden />
      <span className="hidden text-xs sm:inline">Sign in</span>
    </Link>
  );
}
