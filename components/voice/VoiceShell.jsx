"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import {
  playBankingPageIntro,
  playFeatureIntro,
  playGovernmentPageIntro,
  playHeroIntro,
  stopSpeaking,
  unlockVoice,
} from "@/lib/tts/voice";

const NAV_VOICE_KEY = "sahaj-nav-voice";
const FEATURE_VOICE_KEY = "sahaj-feature-voice";

export function markNavVoiceIntent(domain) {
  if (typeof window === "undefined") return;
  if (domain === "government" || domain === "banking") {
    sessionStorage.setItem(NAV_VOICE_KEY, domain);
    sessionStorage.removeItem(FEATURE_VOICE_KEY);
  }
}

export function markFeatureVoiceIntent(domainKey, featureId) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(NAV_VOICE_KEY);
  sessionStorage.setItem(FEATURE_VOICE_KEY, `${domainKey}:${featureId}`);
}

export function clearFeatureVoiceIntent() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(FEATURE_VOICE_KEY);
  }
}

function readFeatureVoiceIntent() {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(FEATURE_VOICE_KEY);
  if (!raw) return null;
  const [domainKey, featureId] = raw.split(":");
  if (!domainKey || !featureId) return null;
  return { domainKey, featureId };
}

function domainKeyForPath(pathname) {
  if (pathname === "/government") return "government";
  if (pathname === "/banking") return "banking";
  return null;
}

export function VoiceShell({ children }) {
  const pathname = usePathname();
  const { prefs } = useAccessability();

  useEffect(() => {
    if (!prefs.voiceEnabled) {
      stopSpeaking();
      return;
    }

    if (pathname === "/") {
      playHeroIntro(prefs.language);
      return;
    }

    const domainKey = domainKeyForPath(pathname);
    if (!domainKey) return;

    const navVoice =
      typeof window !== "undefined"
        ? sessionStorage.getItem(NAV_VOICE_KEY)
        : null;
    if (navVoice === domainKey) {
      sessionStorage.removeItem(NAV_VOICE_KEY);
      if (domainKey === "government") {
        playGovernmentPageIntro(prefs.language);
      } else {
        playBankingPageIntro(prefs.language);
      }
      return;
    }

    const featureIntent = readFeatureVoiceIntent();
    if (featureIntent?.domainKey === domainKey) {
      clearFeatureVoiceIntent();
      playFeatureIntro(
        featureIntent.domainKey,
        featureIntent.featureId,
        prefs.language,
      );
      return;
    }

    const featureFromQuery =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("feature")
        : null;
    const hash =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const featureId = featureFromQuery || hash;
    if (featureId) {
      playFeatureIntro(domainKey, featureId, prefs.language);
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
