"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function scrollBehavior() {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/** After feature-gate sign-in: /?focus=features → scroll to #features. */
export function FocusFeaturesScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname !== "/") return;
    if (searchParams.get("focus") !== "features") return;

    const el = document.getElementById("features");
    if (!el) return;

    const frame = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      window.history.replaceState(null, "", "/#features");
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, searchParams]);

  return null;
}
