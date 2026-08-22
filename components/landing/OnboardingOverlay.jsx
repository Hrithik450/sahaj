"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { getOnboardingTarget } from "@/lib/onboarding-targets";
import { pickLang } from "@/lib/i18n";

const SPOT_PAD = 10;
const TIP_WIDTH = 272;
const TIP_MARGIN = 16;
const STORAGE_KEY = "sahaj-voice-onboarding-dismissed";
const STEP_KEY = "sahaj-onboarding-step";
const ONBOARDING_CHANGE = "sahaj-voice-onboarding-change";

export const languageOverlay = {
  id: "language",
  targetId: "nav-language-btn",
  eyebrow: {
    en: "Language",
    hi: "भाषा",
    kn: "ಭಾಷೆ",
  },
  title: {
    en: "Choose your language",
    hi: "अपनी भाषा चुनें",
    kn: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
  description: {
    en: "Tap the language button to switch between English, Kannada, and Hindi.",
    hi: "अंग्रेज़ी, कन्नड़ और हिंदी के बीच बदलने के लिए भाषा बटन दबाएं।",
    kn: "ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ ಮತ್ತು ಹಿಂದಿ ನಡುವೆ ಬದಲಾಯಿಸಲು ಭಾಷೆ ಬಟನ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ.",
  },
};

export const speakerOverlay = {
  id: "speaker",
  targetId: "voice-start-btn",
  eyebrow: {
    en: "Voice guidance",
    hi: "आवाज़ मार्गदर्शन",
    kn: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ",
  },
  title: {
    en: "Start with voice",
    hi: "आवाज़ से शुरू करें",
    kn: "ಧ್ವನಿಯಿಂದ ಪ್ರಾರಂಭಿಸಿ",
  },
  description: {
    en: "Tap the speaker to hear instructions and guidance across Sahaj. You can turn it off anytime.",
    hi: "सहज में निर्देश और मार्गदर्शन सुनने के लिए स्पीकर दबाएं। आप इसे कभी भी बंद कर सकते हैं।",
    kn: "ಸಹಜದಲ್ಲಿ ಸೂಚನೆಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ಕೇಳಲು ಸ್ಪೀಕರ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ. ನೀವು ಅದನ್ನು ಯಾವಾಗ ಬೇಕಾದರೂ ಆಫ್ ಮಾಡಬಹುದು.",
  },
};

function getViewportWidth() {
  if (typeof window === "undefined") return 0;
  return window.visualViewport?.width ?? window.innerWidth;
}

function readTargetRect(el) {
  const box = el.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left,
    width: box.width,
    height: box.height,
    right: box.right,
  };
}

function getTooltipStyle(rect) {
  const top = rect.top + rect.height + SPOT_PAD + 18;
  const viewportWidth = getViewportWidth();
  let left = rect.left + rect.width / 2 - TIP_WIDTH / 2;

  left = Math.max(
    TIP_MARGIN,
    Math.min(left, viewportWidth - TIP_WIDTH - TIP_MARGIN),
  );

  if (rect.right > viewportWidth - TIP_WIDTH - TIP_MARGIN * 2) {
    left = Math.max(TIP_MARGIN, rect.right - TIP_WIDTH);
  }

  return { top, left, width: TIP_WIDTH };
}

function subscribeOnboarding(callback) {
  window.addEventListener(ONBOARDING_CHANGE, callback);
  return () => window.removeEventListener(ONBOARDING_CHANGE, callback);
}

function getDismissedSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "1";
}

function getInitialOverlay() {
  if (localStorage.getItem(STEP_KEY) === "speaker") {
    return speakerOverlay;
  }
  return languageOverlay;
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function OnboardingOverlay() {
  const isClient = useIsClient();
  const { prefs } = useAccessability();
  const language = prefs.language;

  const persistentlyDismissed = useSyncExternalStore(
    subscribeOnboarding,
    getDismissedSnapshot,
    () => true,
  );
  const [activeOverlay, setActiveOverlay] = useState(getInitialOverlay);
  const [rect, setRect] = useState(null);
  const [rectTargetId, setRectTargetId] = useState(null);
  const [settledTargetId, setSettledTargetId] = useState(null);

  const visible = !persistentlyDismissed;
  const rectReady = rect && rectTargetId === activeOverlay.targetId;
  const positionSettled = settledTargetId === activeOverlay.targetId;

  const measure = useCallback(() => {
    const targetId = activeOverlay.targetId;
    const el = getOnboardingTarget(targetId);
    if (!el) return false;

    const next = readTargetRect(el);
    setRect((prev) => {
      if (
        prev &&
        prev.top === next.top &&
        prev.left === next.left &&
        prev.width === next.width &&
        prev.height === next.height
      ) {
        return prev;
      }
      return next;
    });
    setRectTargetId(targetId);
    return true;
  }, [activeOverlay.targetId]);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    let raf = 0;
    let stable = 0;

    const waitForTarget = async () => {
      await document.fonts?.ready;

      const tick = () => {
        if (cancelled) return;

        const found = measure();
        stable = found ? stable + 1 : 0;

        if (stable >= 2) {
          setSettledTargetId(activeOverlay.targetId);
          return;
        }

        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    waitForTarget();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [visible, measure, activeOverlay.targetId]);

  useEffect(() => {
    if (!visible || !positionSettled) return;

    let raf = 0;

    const scheduleMeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const el = getOnboardingTarget(activeOverlay.targetId);
    const navActions = document.getElementById("nav-actions");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;

    if (el) resizeObserver?.observe(el);
    if (navActions) resizeObserver?.observe(navActions);

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleMeasure);
    window.visualViewport?.addEventListener("scroll", scheduleMeasure);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure);
      window.visualViewport?.removeEventListener("resize", scheduleMeasure);
      window.visualViewport?.removeEventListener("scroll", scheduleMeasure);
    };
  }, [visible, positionSettled, measure, activeOverlay.targetId]);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    localStorage.removeItem(STEP_KEY);
    window.dispatchEvent(new Event(ONBOARDING_CHANGE));
  }, []);

  const goToSpeakerOverlay = useCallback(() => {
    localStorage.setItem(STEP_KEY, "speaker");
    setRect(null);
    setRectTargetId(null);
    setActiveOverlay(speakerOverlay);
  }, []);

  const skipOverlay = useCallback(() => {
    if (activeOverlay.id === languageOverlay.id) {
      goToSpeakerOverlay();
      return;
    }
    dismiss();
  }, [activeOverlay.id, dismiss, goToSpeakerOverlay]);

  useEffect(() => {
    if (!visible || !rectReady) return;

    const el = getOnboardingTarget(activeOverlay.targetId);
    if (!el) return;

    const proceed = () => {
      if (activeOverlay.id === languageOverlay.id) {
        goToSpeakerOverlay();
        return;
      }
      dismiss();
    };

    el.addEventListener("click", proceed);
    return () => el.removeEventListener("click", proceed);
  }, [visible, rectReady, activeOverlay, dismiss, goToSpeakerOverlay]);

  if (!isClient || !visible || !rectReady || !positionSettled) return null;

  const spotTop = rect.top - SPOT_PAD;
  const spotLeft = rect.left - SPOT_PAD;
  const spotWidth = rect.width + SPOT_PAD * 2;
  const spotHeight = rect.height + SPOT_PAD * 2;
  const spotBR = spotHeight / 2;
  const tooltip = getTooltipStyle(rect);

  return createPortal(
    <div>
      {[
        { top: 0, left: 0, right: 0, height: Math.max(spotTop, 0) },
        { top: spotTop + spotHeight, left: 0, right: 0, bottom: 0 },
        {
          top: spotTop,
          left: 0,
          width: Math.max(spotLeft, 0),
          height: spotHeight,
        },
        {
          top: spotTop,
          left: spotLeft + spotWidth,
          right: 0,
          height: spotHeight,
        },
      ].map((style, i) => (
        <div
          key={i}
          className="fixed z-[200] cursor-pointer"
          style={style}
          onClick={skipOverlay}
        />
      ))}

      <div
        className="fixed z-[201] pointer-events-none"
        style={{
          top: spotTop,
          left: spotLeft,
          width: spotWidth,
          height: spotHeight,
          borderRadius: spotBR,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.52)",
          outline: "1px solid rgba(255,255,255,0.32)",
          outlineOffset: 0,
        }}
      />

      <div
        className="fixed z-[202] pointer-events-auto"
        style={{
          top: tooltip.top,
          left: tooltip.left,
          width: tooltip.width,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-2xl border border-black/[0.07] bg-white p-5"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
        >
          <button
            type="button"
            className="absolute top-3.5 right-3.5 rounded-full p-1 transition-colors hover:bg-gray-100"
            onClick={skipOverlay}
            aria-label="Dismiss onboarding"
          >
            <X className="h-3.5 w-3.5 text-gray-400" />
          </button>

          <p
            className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--blue)" }}
          >
            {pickLang(activeOverlay.eyebrow, language)}
          </p>
          <h3 className="landing-strong mb-2 pr-5 text-sm leading-snug text-gray-800">
            {pickLang(activeOverlay.title, language)}
          </h3>
          <p className="text-sm leading-relaxed text-gray-500">
            {pickLang(activeOverlay.description, language)}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
