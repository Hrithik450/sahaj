"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  FileText,
  MessageCircle,
  Receipt,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  DEFAULT_FEATURE_DOMAIN,
  FEATURE_DOMAINS,
} from "@/data/features";

const FEATURE_ICONS = {
  simplify: FileText,
  form: ClipboardList,
  task: ClipboardList,
  finder: Search,
  transaction: Receipt,
  companion: MessageCircle,
  practice: ShieldCheck,
};

function FeatureCard({ feature, index, domainHref }) {
  const Icon = FEATURE_ICONS[feature.id] ?? FileText;

  return (
    <div className="relative p-4" data-feature-card>
      <div
        aria-hidden
        className="absolute inset-4 rounded-[1.75rem] border-2 border-[var(--ink)]"
        style={{
          backgroundColor: feature.accent,
          transform: `rotate(${feature.layerA.rotate}deg) translate(${feature.layerA.tx}px, ${feature.layerA.ty}px)`,
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-[1.75rem] border-2 border-[var(--ink)]"
        style={{
          top: 24,
          bottom: 24,
          left: 16,
          right: 16,
          backgroundColor: feature.accent,
          transform: `rotate(${feature.layerB.rotate}deg) translate(${feature.layerB.tx}px, ${feature.layerB.ty}px)`,
          zIndex: 1,
        }}
      />

      <article
        className="relative flex min-h-[280px] flex-col items-center rounded-[1.75rem] border-2 border-[var(--ink)] bg-white px-6 pb-8 pt-7 text-center"
        style={{ zIndex: 2 }}
      >
        <div
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-black/10"
          style={{ backgroundColor: feature.iconBg }}
        >
          <Icon
            className="h-10 w-10"
            strokeWidth={2}
            style={{ color: "var(--ink)" }}
            aria-hidden
          />
        </div>

        <h3 className="landing-strong text-lg sm:text-xl" style={{ color: "var(--ink)" }}>
          {index + 1}. {feature.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {feature.description}
        </p>

        <Link
          href={`${domainHref}#${feature.id}`}
          className="btn-ink mt-5 bg-white px-5 py-2 text-sm"
        >
          Learn more
        </Link>
      </article>
    </div>
  );
}

export function Features() {
  const [domain, setDomain] = useState(DEFAULT_FEATURE_DOMAIN);
  const scrollRef = useRef(null);
  const active = FEATURE_DOMAINS[domain];

  function scroll(dir) {
    const container = scrollRef.current;
    if (!container) return;
    const firstCard = container.querySelector("[data-feature-card]");
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(container).gap) || 24;
    const step = firstCard.offsetWidth + gap;
    container.scrollBy({
      left: dir === "right" ? step : -step,
      behavior: "smooth",
    });
  }

  return (
    <section id="features" className="overflow-hidden px-6 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="caption mb-2 text-xs font-semibold uppercase tracking-widest">
              What Sahaj offers
            </p>
            <h2 className="landing-strong text-[clamp(1.6rem,3.5vw,2.25rem)] leading-tight">
              Five ways to finish government and banking tasks
            </h2>
          </div>

          <div className="domain-toggle flex-none self-start sm:self-auto">
            {Object.entries(FEATURE_DOMAINS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                data-active={domain === key ? "true" : "false"}
                onClick={() => setDomain(key)}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 hidden justify-end gap-3 sm:flex lg:hidden">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] text-white"
            aria-label="Scroll features left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] text-white"
            aria-label="Scroll features right"
          >
            →
          </button>
        </div>
      </div>

      <div className="hidden gap-8 lg:grid lg:grid-cols-3 lg:px-6 xl:px-0">
        {active.features.slice(0, 3).map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
            domainHref={active.href}
          />
        ))}
      </div>
      <div className="mt-8 hidden gap-8 lg:grid lg:grid-cols-2 lg:px-6 xl:px-0">
        {active.features.slice(3).map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index + 3}
            domainHref={active.href}
          />
        ))}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 lg:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {active.features.map((feature, index) => (
          <div
            key={feature.id}
            className="w-[min(320px,82vw)] flex-none first:ml-6 last:mr-6"
          >
            <FeatureCard
              feature={feature}
              index={index}
              domainHref={active.href}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
