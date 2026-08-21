"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function NavAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="caption text-xs font-semibold text-[var(--muted)]">
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="caption hidden max-w-[8rem] truncate text-xs font-semibold sm:inline">
          {session.user.name || session.user.email}
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn-ink bg-white px-3 py-1.5 text-xs sm:text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn-ink bg-white px-3 py-1.5 text-xs sm:text-sm">
      Sign in
    </Link>
  );
}
