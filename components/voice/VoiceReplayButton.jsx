"use client";

import { Mic } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/i18n";
import { speak } from "@/lib/voice";

const LABEL = {
  en: "Listen again",
  hi: "फिर सुनें",
  kn: "ಮತ್ತೆ ಕೇಳಿ",
};

export function VoiceReplayButton({ text, language: languageProp, className = "" }) {
  const { prefs } = useAccessability();
  const language = languageProp ?? prefs.language;

  if (!prefs.voiceEnabled || !text?.trim()) return null;

  return (
    <button
      type="button"
      onClick={() => speak(text, { language })}
      className={`btn-ink flex h-9 w-9 shrink-0 items-center justify-center bg-white p-0 ${className}`}
      aria-label={pickLang(LABEL, language)}
    >
      <Mic className="h-4 w-4" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
