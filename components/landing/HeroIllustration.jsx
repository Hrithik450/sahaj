"use client";

import Image from "next/image";
import { useState } from "react";

export const HERO_ILLUSTRATION_PATH = "/images/hero-illustration.png";

export function HeroIllustration() {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <p className="caption flex h-full w-full items-center justify-center p-8 text-center text-sm sm:text-base">
        Drop your artwork at{" "}
        <span className="mono ml-1 text-xs">public/hero-illustration.png</span>
      </p>
    );
  }

  return (
    <Image
      src={HERO_ILLUSTRATION_PATH}
      alt="Person using accessible government and banking services with voice guidance on screen"
      width={720}
      height={540}
      priority
      className="h-full w-full max-w-[95%] object-contain object-left object-bottom sm:max-w-[92%] md:max-w-[88%] lg:max-w-full lg:h-auto lg:scale-110 lg:object-center"
      sizes="(max-width: 1024px) 100vw, 62vw"
      onError={() => setMissing(true)}
    />
  );
}
