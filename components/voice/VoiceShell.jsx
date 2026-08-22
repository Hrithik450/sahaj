"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { playBankingPageIntro, playGovernmentPageIntro, playHeroIntro, stopSpeaking, unlockVoice } from "@/lib/voice";

const NAV_VOICE_KEY = "sahaj-nav-voice";

export function markNavVoiceIntent(domain) {
  if (typeof window === "undefined") return;
  if (domain === "government" || domain === "banking") {
    sessionStorage.setItem(NAV_VOICE_KEY, domain);
  }
}

export function VoiceShell({ children }) {
  const pathname = usePathname();
  const { prefs } = useAccessability();

  useEffect(() => {
    if (!prefs.voiceEnabled) return;

    if (pathname === "/") {
      playHeroIntro(prefs.language);
      return;
    }

    const navVoice =
      typeof window !== "undefined"
        ? sessionStorage.getItem(NAV_VOICE_KEY)
        : null;
    if (!navVoice) return;

    if (navVoice === "government" && pathname === "/government") {
      sessionStorage.removeItem(NAV_VOICE_KEY);
      playGovernmentPageIntro(prefs.language);
      return;
    }

    if (navVoice === "banking" && pathname === "/banking") {
      sessionStorage.removeItem(NAV_VOICE_KEY);
      playBankingPageIntro(prefs.language);
    }
  }, [prefs.voiceEnabled, prefs.language, pathname]);

  return <>{children}</>;
}

export function useVoiceControl() {
  const { prefs, setVoiceEnabled } = useAccessability();

  function toggleVoice() {
    if (prefs.voiceEnabled) {
      stopSpeaking();
      setVoiceEnabled(false);
      return;
    }

    unlockVoice();
    setVoiceEnabled(true);
  }

  return {
    voiceEnabled: prefs.voiceEnabled,
    toggleVoice,
  };
}
