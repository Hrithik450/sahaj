"use client";

import { Volume2 } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/utils";
import { playSampleSimplifierSpeech, speakSarvam } from "@/lib/tts/voice";

const LABEL = {
  en: "Listen again",
  hi: "फिर सुनें",
  kn: "ಮತ್ತೆ ಕೇಳಿ",
};

export function VoiceReplayButton({
  text,
  language: languageProp,
  sampleNoticeId,
  liveReplay = false,
  className = "",
  onClick,
}) {
  const { prefs } = useAccessability();
  const language = languageProp ?? prefs.language;

  if (!prefs.voiceEnabled) return null;
  if (!sampleNoticeId && !liveReplay) return null;
  if (liveReplay && !text?.trim()) return null;

  async function handleReplay(event) {
    event?.stopPropagation?.();
    onClick?.(event);

    if (sampleNoticeId) {
      await playSampleSimplifierSpeech(sampleNoticeId, language);
      return;
    }

    if (liveReplay) {
      await speakSarvam(text, { language });
    }
  }

  return (
    <button
      type="button"
      onClick={handleReplay}
      className={`btn-ink flex h-9 w-9 shrink-0 items-center justify-center bg-white p-0 ${className}`}
      aria-label={pickLang(LABEL, language)}
    >
      <Volume2 className="h-4 w-4" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
