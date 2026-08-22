"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  FileText,
  MessageCircle,
  Receipt,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import {
  DEFAULT_FEATURE_DOMAIN,
  FEATURE_DOMAINS,
  FEATURES_SECTION_LABEL,
  FEATURES_SECTION_TITLE,
  LANDING_FEATURE_COPY,
  LANDING_FEATURES_UI,
  LANDING_FEATURES_VOICE_EVENT,
} from "@/lib/features";
import { pickLang } from "@/lib/utils";
import { playLandingGovernmentFeaturesIntro } from "@/lib/tts/voice";
import { HorizontalScrollRow } from "@/components/shared/HorizontalScrollRow";

const FEATURE_ICONS = {
  simplify: FileText,
  form: ClipboardList,
  task: ClipboardList,
  finder: Search,
  transaction: Receipt,
  companion: MessageCircle,
  practice: ShieldCheck,
};

function getFeatureCopy(domain, featureId, language) {
  const copy = LANDING_FEATURE_COPY[domain]?.[featureId];
  if (!copy) return { title: "", description: "" };

  return {
    title: pickLang(copy.title, language),
    description: pickLang(copy.description, language),
  };
}

function FeatureCard({ feature, index, domainHref, domain, language }) {
  const Icon = FEATURE_ICONS[feature.id] ?? FileText;
  const copy = getFeatureCopy(domain, feature.id, language);

  return (
    <div className="relative p-4" data-feature-card>
      <div
        aria-hidden
        className="absolute inset-5 rounded-[1.75rem] border border-[var(--ink)]"
        style={{
          backgroundColor: feature.accent,
          transform: `rotate(${feature.layerA.rotate}deg) translate(${feature.layerA.tx}px, ${feature.layerA.ty}px)`,
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-[1.75rem] border border-[var(--ink)]"
        style={{
          top: 28,
          bottom: 28,
          left: 20,
          right: 20,
          backgroundColor: feature.accent,
          transform: `rotate(${feature.layerB.rotate}deg) translate(${feature.layerB.tx}px, ${feature.layerB.ty}px)`,
          zIndex: 1,
        }}
      />

      <article
        className="relative flex min-h-[280px] flex-col items-center rounded-[1.75rem] border border-[var(--ink)] bg-white px-6 pb-8 pt-7 text-center"
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

        <h3
          className="landing-strong text-lg sm:text-xl"
          style={{ color: "var(--ink)" }}
        >
          {index + 1}. {copy.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {copy.description}
        </p>

        <Link
          href={`${domainHref}?feature=${feature.id}`}
          className="btn-ink mt-5 bg-white px-5 py-2 text-sm"
        >
          {pickLang(LANDING_FEATURES_UI.learnMore, language)}
        </Link>
      </article>
    </div>
  );
}

export function Features() {
  const [domain, setDomain] = useState(DEFAULT_FEATURE_DOMAIN);
  const { prefs } = useAccessability();
  const language = prefs.language;
  const active = FEATURE_DOMAINS[domain];

  useEffect(() => {
    function onPlayLandingFeatures() {
      if (!prefs.voiceEnabled) return;
      setDomain("government");
      void playLandingGovernmentFeaturesIntro(prefs.language);
    }

    window.addEventListener(
      LANDING_FEATURES_VOICE_EVENT,
      onPlayLandingFeatures,
    );
    return () => {
      window.removeEventListener(
        LANDING_FEATURES_VOICE_EVENT,
        onPlayLandingFeatures,
      );
    };
  }, [prefs.voiceEnabled, prefs.language]);

  return (
    <section
      id="features"
      className="section-x pt-14 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <p className="caption mb-2 text-xs font-semibold uppercase tracking-widest">
              {pickLang(FEATURES_SECTION_LABEL, language)}
            </p>
            <h2 className="landing-strong max-w-[28rem] text-[clamp(1.6rem,3.5vw,2.25rem)] leading-[1.15] sm:max-w-[34rem] lg:max-w-[40rem]">
              {pickLang(FEATURES_SECTION_TITLE, language)}
            </h2>
          </div>

          <div className="domain-toggle flex-none self-start sm:self-auto">
            {Object.entries(FEATURE_DOMAINS).map(([key]) => (
              <button
                key={key}
                type="button"
                data-active={domain === key ? "true" : "false"}
                onClick={() => setDomain(key)}
              >
                {pickLang(LANDING_FEATURES_UI.domains[key], language)}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-3">
          {active.features.slice(0, 3).map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              domainHref={active.href}
              domain={domain}
              language={language}
            />
          ))}
        </div>

        <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-2 lg:mt-12">
          {active.features.slice(3).map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index + 3}
              domainHref={active.href}
              domain={domain}
              language={language}
            />
          ))}
        </div>

        <HorizontalScrollRow
          className="lg:hidden"
          innerClassName="flex gap-6 overflow-x-auto pb-4"
          leftAriaLabel={pickLang(LANDING_FEATURES_UI.scrollLeft, language)}
          rightAriaLabel={pickLang(LANDING_FEATURES_UI.scrollRight, language)}
        >
          {active.features.map((feature, index) => (
            <div
              key={feature.id}
              className="scroll-snap-item w-[min(100%,320px)] flex-none sm:w-[min(45%,320px)]"
            >
              <FeatureCard
                feature={feature}
                index={index}
                domainHref={active.href}
                domain={domain}
                language={language}
              />
            </div>
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
