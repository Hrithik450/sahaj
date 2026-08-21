"use client";

import {
  ALargeSmall,
  BookOpen,
  ListOrdered,
  MousePointerClick,
  Volume2,
} from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { ACCESSIBILITY_NEEDS } from "@/data/accessability-needs";

const NEED_ICONS = {
  vision: ALargeSmall,
  hearing: Volume2,
  motor: MousePointerClick,
  cognitive: ListOrdered,
  literacy: BookOpen,
};

export function AccessibilityNeedCards() {
  const { prefs, setNeed } = useAccessability();

  return (
    <div id="accessability-setup">
      <h2 className="landing-strong mb-4 text-lg sm:text-xl">
        How would you like Sahaj to work for you?
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {ACCESSIBILITY_NEEDS.map((need) => {
          const isActive = prefs.need === need.id;
          const Icon = NEED_ICONS[need.id];

          return (
            <button
              key={need.id}
              type="button"
              onClick={() => setNeed(need.id)}
              aria-pressed={isActive}
              className="ink-card ink-lift flex items-center gap-3 p-3.5 text-left transition-colors sm:p-4"
              style={{
                backgroundColor: isActive ? "var(--blue)" : "#ffffff",
                color: isActive ? "#ffffff" : "var(--ink)",
                boxShadow: isActive
                  ? "var(--ink-shadow-hover)"
                  : "var(--ink-shadow)",
              }}
            >
              <span
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full sm:h-12 sm:w-12"
                style={{
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.22)"
                    : need.iconBg,
                  color: isActive ? "#ffffff" : need.accent,
                }}
                aria-hidden
              >
                <Icon
                  className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]"
                  strokeWidth={2.25}
                />
              </span>

              <span className="min-w-0">
                <span className="landing-strong block text-sm sm:text-[0.95rem]">
                  {need.title}
                </span>
                <span
                  className="mt-0.5 block text-xs sm:text-sm"
                  style={{
                    color: isActive ? "rgba(255,255,255,0.88)" : "var(--muted)",
                  }}
                >
                  {need.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
