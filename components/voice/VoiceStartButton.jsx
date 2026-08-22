"use client";

import { Volume2 } from "lucide-react";
import { registerOnboardingTarget } from "@/lib/onboarding-targets";
import { useVoiceControl } from "@/components/voice/VoiceShell";

export function VoiceStartButton() {
  const { voiceEnabled, toggleVoice } = useVoiceControl();

  return (
    <button
      id="voice-start-btn"
      ref={(node) => registerOnboardingTarget("voice-start-btn", node)}
      type="button"
      onClick={toggleVoice}
      aria-pressed={voiceEnabled}
      aria-label={voiceEnabled ? "Voice on" : "Start voice guidance"}
      className="btn-ink flex h-9 w-9 shrink-0 items-center justify-center bg-white p-0"
      style={{
        borderColor: "var(--blue)",
        backgroundColor: voiceEnabled ? "var(--blue)" : "#ffffff",
        color: voiceEnabled ? "#ffffff" : "var(--blue)",
      }}
    >
      <Volume2 className="h-4 w-4" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
