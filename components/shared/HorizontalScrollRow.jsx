"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HorizontalScrollRow({
  children,
  className = "",
  innerClassName = "",
  hideArrowsFrom = "lg",
  snap = true,
  scrollAriaLabel,
  leftAriaLabel = "Scroll left",
  rightAriaLabel = "Scroll right",
}) {
  const ref = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(max > 4 && el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update, children]);

  function scroll(dir) {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.children);
    if (children.length === 0) return;

    const left = el.scrollLeft;
    const edge = 6;

    if (dir === "right") {
      const next = children.find((child) => child.offsetLeft > left + edge);
      el.scrollTo({
        left: next ? next.offsetLeft : el.scrollWidth,
        behavior: "smooth",
      });
      return;
    }

    const prev = [...children]
      .reverse()
      .find((child) => child.offsetLeft < left - edge);
    el.scrollTo({
      left: prev ? prev.offsetLeft : 0,
      behavior: "smooth",
    });
  }

  const arrowBp =
    hideArrowsFrom === "lg"
      ? "lg:hidden"
      : hideArrowsFrom === "md"
        ? "md:hidden"
        : hideArrowsFrom === "sm"
          ? "sm:hidden"
          : "";

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        className={`horizontal-scroll-row ${snap ? "horizontal-scroll-snap" : ""} ${innerClassName}`}
        aria-label={scrollAriaLabel}
        tabIndex={scrollAriaLabel ? 0 : undefined}
      >
        {children}
      </div>

      {canLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className={`scroll-hint scroll-hint-left ${arrowBp}`}
          aria-label={leftAriaLabel}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </button>
      )}

      {canRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className={`scroll-hint scroll-hint-right ${arrowBp}`}
          aria-label={rightAriaLabel}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </button>
      )}
    </div>
  );
}
