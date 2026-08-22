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
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import {
  DEFAULT_FEATURE_DOMAIN,
  FEATURE_DOMAINS,
} from "@/lib/data/features";
import { markFeatureVoiceIntent } from "@/components/voice/VoiceShell";
import { pickLang } from "@/lib/i18n";

import {
  FEATURES_SECTION_LABEL,
  FEATURES_SECTION_TITLE,
} from "@/lib/data/features-voice";

const FEATURES = {
  learnMore: { en: "Learn more", hi: "और जानें", kn: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ" },
  scrollLeft: {
    en: "Scroll features left",
    hi: "सुविधाएं बाईं स्क्रॉल करें",
    kn: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಎಡಕ್ಕೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ",
  },
  scrollRight: {
    en: "Scroll features right",
    hi: "सुविधाएं दाईं स्क्रॉल करें",
    kn: "ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಬಲಕ್ಕೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ",
  },
  domains: {
    government: { en: "Government", hi: "सरकार", kn: "ಸರ್ಕಾರ" },
    banking: { en: "Banking", hi: "बैंकिंग", kn: "ಬ್ಯಾಂಕಿಂಗ್" },
  },
  government: {
    simplify: {
      title: {
        en: "Document Simplifier",
        hi: "दस्तावेज़ सरलीकरण",
        kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
      },
      description: {
        en: "Paste a notice or letter and get a plain-language summary with clear next steps.",
        hi: "कोई नोटिस या पत्र चिपकाएं और स्पष्ट अगले कदमों के साथ सरल भाषा में सारांश पाएं।",
        kn: "ಸೂಚನೆ ಅಥವಾ ಪತ್ರ ಅಂಟಿಸಿ ಸ್ಪಷ್ಟ ಮುಂದಿನ ಹಂತಗಳೊಂದಿಗೆ ಸರಳ ಭಾಷೆಯ ಸಾರಾಂಶ ಪಡೆಯಿರಿ.",
      },
    },
    form: {
      title: { en: "Guided Form", hi: "मार्गदर्शित फॉर्म", kn: "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್" },
      description: {
        en: "Complete government forms one field at a time with voice prompts and simple help.",
        hi: "आवाज़ संकेत और सरल सहायता के साथ सरकारी फॉर्म एक-एक फ़ील्ड भरें।",
        kn: "ಧ್ವನಿ ಸೂಚನೆ ಮತ್ತು ಸರಳ ಸಹಾಯದೊಂದಿಗೆ ಸರ್ಕಾರಿ ಫಾರ್ಮ್‌ಗಳನ್ನು ಒಂದೊಂದು ಫೀಲ್ಡ್‌ನಲ್ಲಿ ಪೂರ್ಣಗೊಳಿಸಿ.",
      },
    },
    finder: {
      title: { en: "Service Finder", hi: "सेवा खोज", kn: "ಸೇವೆ ಹುಡುಕಾಟ" },
      description: {
        en: "Describe what you need and find the right service, documents, and where to go next.",
        hi: "अपनी जरूरत बताएं और सही सेवा, दस्तावेज़ और अगला कदम खोजें।",
        kn: "ನಿಮಗೆ ಬೇಕಾದದ್ದನ್ನು ವಿವರಿಸಿ ಸರಿಯಾದ ಸೇವೆ, ದಾಖಲೆಗಳು ಮತ್ತು ಮುಂದಿನ ಹಂತವನ್ನು ಹುಡುಕಿ.",
      },
    },
    companion: {
      title: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
      description: {
        en: "Ask questions in plain language and get short, actionable answers with captions.",
        hi: "सरल भाषा में सवाल पूछें और कैप्शन के साथ छोटे, उपयोगी जवाब पाएं।",
        kn: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಶೀರ್ಷಿಕೆಗಳೊಂದಿಗೆ ಚಿಕ್ಕ, ಉಪಯುಕ್ತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",
      },
    },
    practice: {
      title: { en: "Practice Mode", hi: "अभ्यास मोड", kn: "ಅಭ್ಯಾಸ ವಿಧಾನ" },
      description: {
        en: "Try a simulated form or task safely, learn from mistakes, and build confidence.",
        hi: "सुरक्षित रूप से अभ्यास करें, गलतियों से सीखें और आत्मविश्वास बढ़ाएं।",
        kn: "ಸಿಮ್ಯುಲೇಟೆಡ್ ಫಾರ್ಮ್ ಅಥವಾ ಕೆಲಸವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಯತ್ನಿಸಿ, ತಪ್ಪುಗಳಿಂದ ಕಲಿಯಿರಿ ಮತ್ತು ವಿಶ್ವಾಸ ಹೆಚ್ಚಿಸಿ.",
      },
    },
  },
  banking: {
    simplify: {
      title: {
        en: "Document Simplifier",
        hi: "दस्तावेज़ सरलीकरण",
        kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
      },
      description: {
        en: "Understand bank letters, EMI notices, and KYC messages in simple language.",
        hi: "बैंक पत्र, EMI नोटिस और KYC संदेश सरल भाषा में समझें।",
        kn: "ಬ್ಯಾಂಕ್ ಪತ್ರಗಳು, EMI ಸೂಚನೆಗಳು ಮತ್ತು KYC ಸಂದೇಶಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      },
    },
    task: {
      title: {
        en: "Guided Banking Task",
        hi: "मार्गदर्शित बैंकिंग कार्य",
        kn: "ಮಾರ್ಗದರ್ಶಿತ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸ",
      },
      description: {
        en: "Walk through banking tasks like KYC or reporting fraud with one step at a time.",
        hi: "KYC या धोखाधड़ी रिपोर्ट जैसे बैंकिंग कार्य एक-एक कदम में पूरे करें।",
        kn: "KYC ಅಥವಾ ವಂಚನೆ ವರದಿ ಮಾಡುವಂತಹ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಗಳನ್ನು ಒಂದೊಂದು ಹಂತದಲ್ಲಿ ಮಾಡಿ.",
      },
    },
    transaction: {
      title: {
        en: "Transaction Explainer",
        hi: "लेनदेन व्याख्याकार",
        kn: "ವಹಿವಾಟು ವಿವರಣೆ",
      },
      description: {
        en: "Paste an SMS or transaction alert and learn what happened and what to check.",
        hi: "SMS या लेनदेन अलर्ट चिपकाएं और जानें क्या हुआ और क्या जांचें।",
        kn: "SMS ಅಥವಾ ವಹಿವಾಟು ಎಚ್ಚರಿಕೆಯನ್ನು ಅಂಟಿಸಿ ಏನಾಯಿತು ಮತ್ತು ಏನನ್ನು ಪರಿಶೀಲಿಸಬೇಕು ಎಂದು ತಿಳಿಯಿರಿ.",
      },
    },
    companion: {
      title: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
      description: {
        en: "Ask banking questions and get streaming help you can hear and read on screen.",
        hi: "बैंकिंग सवाल पूछें और स्क्रीन पर सुन और पढ़ सकने वाली मदद पाएं।",
        kn: "ಬ್ಯಾಂಕಿಂಗ್ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಪರದೆಯಲ್ಲಿ ಕೇಳಬಹುದಾದ ಮತ್ತು ಓದಬಹುದಾದ ಸಹಾಯ ಪಡೆಯಿರಿ.",
      },
    },
    practice: {
      title: {
        en: "Safe Practice Mode",
        hi: "सुरक्षित अभ्यास मोड",
        kn: "ಸುರಕ್ಷಿತ ಅಭ್ಯಾಸ ವಿಧಾನ",
      },
      description: {
        en: "Practice a fake UPI transfer or form submit with tips when something looks wrong.",
        hi: "नकली UPI ट्रांसफर या फॉर्म सबमिट का अभ्यास करें और गलती पर सुझाव पाएं।",
        kn: "ನಕಲಿ UPI ವರ್ಗಾವಣೆ ಅಥವಾ ಫಾರ್ಮ್ ಸಲ್ಲಿಕೆಯ ಅಭ್ಯಾಸ ಮಾಡಿ ತಪ್ಪಾದಾಗ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
      },
    },
  },
};

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
  const copy = FEATURES[domain]?.[featureId];
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

        <h3 className="landing-strong text-lg sm:text-xl" style={{ color: "var(--ink)" }}>
          {index + 1}. {copy.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {copy.description}
        </p>

        <Link
          href={`${domainHref}#${feature.id}`}
          onClick={() => markFeatureVoiceIntent(domain, feature.id)}
          className="btn-ink mt-5 bg-white px-5 py-2 text-sm"
        >
          {pickLang(FEATURES.learnMore, language)}
        </Link>
      </article>
    </div>
  );
}

export function Features() {
  const [domain, setDomain] = useState(DEFAULT_FEATURE_DOMAIN);
  const scrollRef = useRef(null);
  const { prefs } = useAccessability();
  const language = prefs.language;
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
    <section id="features" className="section-x pt-14 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
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
                {pickLang(FEATURES.domains[key], language)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 hidden justify-end gap-3 sm:flex lg:hidden">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ink)] bg-[var(--ink)] text-white"
            aria-label={pickLang(FEATURES.scrollLeft, language)}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ink)] bg-[var(--ink)] text-white"
            aria-label={pickLang(FEATURES.scrollRight, language)}
          >
            →
          </button>
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

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 lg:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {active.features.map((feature, index) => (
            <div
              key={feature.id}
              className="w-[min(100%,320px)] flex-none sm:w-[min(45%,320px)]"
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
        </div>
      </div>
    </section>
  );
}
