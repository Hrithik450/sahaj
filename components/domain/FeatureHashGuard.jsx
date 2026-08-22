"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  domainKeyFromPath,
  featureIdFromWindow,
  isFeatureId,
} from "@/lib/routes";
import { playFeatureIntro } from "@/lib/tts/voice";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";

function scrollToFeature(featureId) {
  document.getElementById(featureId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function FeatureHashGuard() {
  const { status } = useSession();
  const pathname = usePathname();
  const { prefs } = useAccessability();
  const domainKey = domainKeyFromPath(pathname);

  useEffect(() => {
    if (!domainKey) return;

    const featureId = featureIdFromWindow();
    if (!featureId || !isFeatureId(domainKey, featureId)) return;

    scrollToFeature(featureId);

    const next = `${pathname}#${featureId}`;
    if (
      `${window.location.pathname}${window.location.search}${window.location.hash}` !==
      next
    ) {
      window.history.replaceState(null, "", next);
    }

    if (status === "authenticated" && prefs.voiceEnabled) {
      void playFeatureIntro(domainKey, featureId, prefs.language);
    }
  }, [status, domainKey, pathname, prefs.voiceEnabled, prefs.language]);

  return null;
}
