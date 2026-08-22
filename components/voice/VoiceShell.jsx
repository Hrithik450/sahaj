"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { playHeroIntro, stopSpeaking, unlockVoice } from "@/lib/voice";
import { LiveCaption } from "@/components/voice/LiveCaption";

export function VoiceShell({ children }) {
  const pathname = usePathname();
  const { prefs } = useAccessability();

  useEffect(() => {
    if (!prefs.voiceEnabled || pathname !== "/") return;
    playHeroIntro(prefs.language);
  }, [prefs.voiceEnabled, prefs.language, pathname]);

  return (
    <>
      {children}
      <LiveCaption />
    </>
  );
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
