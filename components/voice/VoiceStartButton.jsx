"use client";

import { Volume2 } from "lucide-react";
import { useVoiceControl } from "@/components/voice/VoiceShell";

export function VoiceStartButton() {
  const { voiceEnabled, toggleVoice } = useVoiceControl();

  return (
    <button
      id="voice-start-btn"
      type="button"
      onClick={toggleVoice}
      aria-pressed={voiceEnabled}
      className="btn-ink flex items-center gap-2 bg-white px-4 py-2 text-sm font-bold sm:px-5"
      style={{
        borderColor: "var(--blue)",
        backgroundColor: voiceEnabled ? "var(--blue)" : "#ffffff",
        color: voiceEnabled ? "#ffffff" : "var(--blue)",
      }}
    >
      <Volume2 className="h-4 w-4" strokeWidth={2.25} aria-hidden />
      {voiceEnabled ? "Voice on" : "Start Voice"}
    </button>
  );
}
