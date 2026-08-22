"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  buildLoginUrlForFeature,
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

/**
 * - Not signed in + deep link → login, then landing features (user navigates)
 * - Signed in + deep link → scroll to that task + play intro (normal navigation)
 */
export function FeatureHashGuard() {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { prefs } = useAccessability();
  const domainKey = domainKeyFromPath(pathname);

  useEffect(() => {
    if (status === "loading" || !domainKey) return;

    const featureId = featureIdFromWindow();
    if (!featureId || !isFeatureId(domainKey, featureId)) return;

    if (status === "unauthenticated") {
      router.replace(buildLoginUrlForFeature());
      return;
    }

    scrollToFeature(featureId);

    const next = `${pathname}#${featureId}`;
    if (
      `${window.location.pathname}${window.location.search}${window.location.hash}` !==
      next
    ) {
      window.history.replaceState(null, "", next);
    }

    if (prefs.voiceEnabled) {
      void playFeatureIntro(domainKey, featureId, prefs.language);
    }
  }, [
    status,
    domainKey,
    pathname,
    router,
    prefs.voiceEnabled,
    prefs.language,
  ]);

  return null;
}
