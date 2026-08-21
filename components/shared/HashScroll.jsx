"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollBehavior() {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function scrollToHash() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;

  const target = document.getElementById(hash);
  if (!target) return;

  target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = requestAnimationFrame(scrollToHash);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
