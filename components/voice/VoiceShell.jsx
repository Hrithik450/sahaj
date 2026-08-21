"use client";

import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { stopSpeaking, unlockVoice } from "@/lib/voice";
import { LiveCaption } from "@/components/voice/LiveCaption";

export function VoiceShell({ children }) {
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
