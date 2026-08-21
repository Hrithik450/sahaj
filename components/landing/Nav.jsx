"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { VoiceStartButton } from "@/components/voice/VoiceStartButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Banking", href: "/banking" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="nav-pill px-6 py-5 sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center">
        <Logo showTagline className="justify-self-start" />

        <nav
          className="caption hidden items-center gap-6 text-sm sm:flex sm:gap-8"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold transition-colors"
                style={{
                  color: active ? "var(--blue)" : "var(--muted)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="col-start-3 justify-self-end" id="nav-actions">
          <VoiceStartButton />
        </div>
      </div>
    </header>
  );
}
