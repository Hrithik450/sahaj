"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";

const SPOT_PAD = 10;
const VOICE_BTN_ID = "voice-start-btn";
const STORAGE_KEY = "sahaj-voice-onboarding-dismissed";
const ONBOARDING_CHANGE = "sahaj-voice-onboarding-change";

function subscribeOnboarding(callback) {
  window.addEventListener(ONBOARDING_CHANGE, callback);
  return () => window.removeEventListener(ONBOARDING_CHANGE, callback);
}

function getDismissedSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "1";
}

export function OnboardingOverlay() {
  const persistentlyDismissed = useSyncExternalStore(
    subscribeOnboarding,
    getDismissedSnapshot,
    () => true,
  );
  const [sessionHidden, setSessionHidden] = useState(false);
  const [rect, setRect] = useState(null);

  const visible = !persistentlyDismissed && !sessionHidden;

  const measure = useCallback(() => {
    const el = document.getElementById(VOICE_BTN_ID);
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
    });
  }, []);

  useEffect(() => {
    if (!visible) return;

    let frame = 0;
    let raf = 0;
    let lastTop = null;
    let steady = 0;

    const follow = () => {
      const el = document.getElementById(VOICE_BTN_ID);
      const top = el?.getBoundingClientRect().top ?? null;
      measure();
      steady = top !== null && top === lastTop ? steady + 1 : 0;
      lastTop = top;
      frame += 1;
      if (steady < 3 && frame < 90) raf = requestAnimationFrame(follow);
    };

    raf = requestAnimationFrame(follow);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [visible, measure]);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new Event(ONBOARDING_CHANGE));
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = document.getElementById(VOICE_BTN_ID);
    if (!el) return;

    const proceed = () => setSessionHidden(true);
    el.addEventListener("click", proceed);
    return () => el.removeEventListener("click", proceed);
  }, [visible, rect]);

  if (!visible || !rect) return null;

  const spotTop = rect.top - SPOT_PAD;
  const spotLeft = rect.left - SPOT_PAD;
  const spotWidth = rect.width + SPOT_PAD * 2;
  const spotHeight = rect.height + SPOT_PAD * 2;
  const spotBR = spotHeight / 2;

  const tipCenterX = Math.max(
    148,
    Math.min(rect.left + rect.width / 2, window.innerWidth - 148),
  );
  const tipTop = rect.top + rect.height + SPOT_PAD + 18;

  return (
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
          onClick={dismiss}
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
        className="fixed z-[202] w-[272px] pointer-events-auto"
        style={{
          top: tipTop,
          left: tipCenterX,
          transform: "translateX(-50%)",
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
            onClick={dismiss}
            aria-label="Dismiss onboarding"
          >
            <X className="h-3.5 w-3.5 text-gray-400" />
          </button>

          <p
            className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--blue)" }}
          >
            Voice guidance
          </p>
          <h3 className="landing-strong mb-2 pr-5 text-sm leading-snug text-gray-800">
            Start with voice
          </h3>
          <p className="text-xs leading-relaxed text-gray-500">
            Tap Start Voice to hear instructions and guidance across Sahaj. You
            can turn it off anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
