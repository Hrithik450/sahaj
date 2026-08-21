"use client";

import Image from "next/image";
import { useState } from "react";

export const HERO_ILLUSTRATION_PATH = "/hero-illustration.png";

export function HeroIllustration() {
  const [missing, setMissing] = useState(false);

  return (
    <div
      className="ink-card relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[var(--cream)]"
      aria-label="Sahaj accessibility illustration"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, var(--sky) 0%, transparent 55%), radial-gradient(circle at 20% 80%, #e8e4ff 0%, transparent 50%)",
        }}
      />

      {!missing ? (
        <Image
          src={HERO_ILLUSTRATION_PATH}
          alt="Person using accessible government and banking services with voice guidance on screen"
          fill
          priority
          className="relative z-[1] object-contain p-4 sm:p-6"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setMissing(true)}
        />
      ) : (
        <p className="caption relative z-[1] flex h-full items-center justify-center p-8 text-center text-sm sm:text-base">
          Drop your artwork at{" "}
          <span className="mono ml-1 text-xs">public/hero-illustration.png</span>
        </p>
      )}
    </div>
  );
}
