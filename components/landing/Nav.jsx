"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home, Landmark } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { NavAuth } from "@/components/auth/NavAuth";
import { Logo } from "@/components/brand/Logo";
import { NavLanguageButton } from "@/components/landing/NavLanguageButton";
import { markNavVoiceIntent } from "@/components/voice/VoiceShell";
import { VoiceStartButton } from "@/components/voice/VoiceStartButton";
import { pickLang } from "@/lib/utils";
import { stopSpeaking } from "@/lib/tts/voice";

const NAV = {
  home: { en: "Home", hi: "होम", kn: "ಮುಖಪುಟ" },
  government: { en: "Government", hi: "सरकार", kn: "ಸರ್ಕಾರ" },
  banking: { en: "Banking", hi: "बैंकिंग", kn: "ಬ್ಯಾಂಕಿಂಗ್" },
  mainAria: { en: "Main", hi: "मुख्य", kn: "ಮುಖ್ಯ" },
  tagline: {
    en: "Digital services, made for you.",
    hi: "डिजिटल सेवाएं, आपके लिए।",
    kn: "ಡಿಜಿಟಲ್ ಸೇವೆಗಳು, ನಿಮಗಾಗಿ.",
  },
};

function handleNavClick(linkKey) {
  stopSpeaking();
  markNavVoiceIntent(linkKey);
}

const NAV_LINKS = [
  { key: "home", href: "/", icon: Home },
  { key: "government", href: "/government", icon: Landmark },
  { key: "banking", href: "/banking", icon: Building2 },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const { prefs } = useAccessability();
  const language = prefs.language;

  return (
    <header className="nav-pill section-x py-4 sm:py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3">
        <Logo
          showTagline
          size="sm"
          tagline={pickLang(NAV.tagline, language)}
          taglineClassName="hidden sm:block"
          className="min-w-0 shrink sm:justify-self-start"
        />

        <nav
          className="caption flex items-center justify-center sm:justify-self-center"
          aria-label={pickLang(NAV.mainAria, language)}
        >
          <div className="flex items-center gap-1 sm:hidden">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              const Icon = link.icon;
              const label = pickLang(NAV[link.key], language);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleNavClick(link.key)}
                  className="btn-ink flex h-9 w-9 items-center justify-center bg-white p-0"
                  style={{
                    borderColor: active ? "var(--blue)" : "var(--ink)",
                    color: active ? "var(--blue)" : "var(--muted)",
                  }}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-6 text-sm sm:flex sm:gap-8">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              const label = pickLang(NAV[link.key], language);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleNavClick(link.key)}
                  className="font-semibold transition-colors"
                  style={{
                    color: active ? "var(--blue)" : "var(--muted)",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div
          className="flex shrink-0 items-center justify-end gap-1.5 sm:col-start-3 sm:gap-3"
          id="nav-actions"
        >
          <NavLanguageButton />
          <VoiceStartButton />
          <NavAuth />
        </div>
      </div>
    </header>
  );
}
