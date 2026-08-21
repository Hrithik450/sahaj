"use client";

import { useEffect, useRef } from "react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import {
  getWelcomeMessage,
  speak,
  stopSpeaking,
  unlockVoice,
} from "@/lib/voice";
import { LiveCaption } from "@/components/voice/LiveCaption";

export function VoiceShell({ children }) {
  const { prefs } = useAccessability();
  const lastSpokenLang = useRef(null);

  useEffect(() => {
    if (!prefs.voiceEnabled) {
      lastSpokenLang.current = null;
      return;
    }

    if (lastSpokenLang.current === prefs.language) return;

    speak(getWelcomeMessage(prefs.language), { language: prefs.language });
    lastSpokenLang.current = prefs.language;
  }, [prefs.language, prefs.voiceEnabled]);

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
