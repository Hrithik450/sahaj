"use client";

import { useEffect, useState } from "react";
import { VOICE_CAPTION_EVENT } from "@/lib/voice";

export function LiveCaption() {
  const [text, setText] = useState("");

  useEffect(() => {
    function handleCaption(event) {
      setText(event.detail?.text || "");
    }

    window.addEventListener(VOICE_CAPTION_EVENT, handleCaption);
    return () => window.removeEventListener(VOICE_CAPTION_EVENT, handleCaption);
  }, []);

  if (!text) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[150] w-[min(92vw,36rem)] -translate-x-1/2 px-4 py-3 sm:px-5 sm:py-3.5"
    >
      <div
        className="ink-card rounded-xl px-4 py-3 text-sm leading-relaxed sm:text-[0.95rem]"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
