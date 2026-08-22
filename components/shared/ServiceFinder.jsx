"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { VoiceReplayButton } from "@/components/voice/VoiceReplayButton";
import { GOV_SERVICES } from "@/lib/data/gov/services";
import {
  servicePortalHost,
  servicePortalPath,
  servicePortalSteps,
  servicePortalVoice,
} from "@/lib/data/gov/service-portal";
import { matchGovServices } from "@/lib/finder";
import { pickLang } from "@/lib/i18n";
import { speakSarvam, stopSpeaking } from "@/lib/voice";

const EXAMPLE_QUERIES = [
  {
    search: "birth certificate",
    label: {
      en: "birth certificate",
      hi: "जन्म प्रमाण पत्र",
      kn: "ಜನ್ಮ ಪ್ರಮಾಣಪತ್ರ",
    },
  },
  {
    search: "income certificate",
    label: {
      en: "income certificate",
      hi: "आय प्रमाण पत्र",
      kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ",
    },
  },
  {
    search: "property tax",
    label: {
      en: "property tax",
      hi: "संपत्ति कर",
      kn: "ಆಸ್ತಿ ತೆರಿಗೆ",
    },
  },
  {
    search: "ration card",
    label: {
      en: "ration card",
      hi: "राशन कार्ड",
      kn: "ರೇಶನ್ ಕಾರ್ಡ್",
    },
  },
  {
    search: "scholarship income proof",
    label: {
      en: "scholarship income proof",
      hi: "छात्रवृत्ति आय प्रमाण",
      kn: "ವಿದ್ಯಾರ್ಥಿವೇತನ ಆದಾಯ ದಾಖಲೆ",
    },
  },
];

const FINDER = {
  queryLabel: {
    en: "What government service do you need?",
    hi: "आपको कौन सी सरकारी सेवा चाहिए?",
    kn: "ನಿಮಗೆ ಯಾವ ಸರ್ಕಾರಿ ಸೇವೆ ಬೇಕು?",
  },
  queryPlaceholder: {
    en: "Example: income certificate for scholarship",
    hi: "उदाहरण: छात्रवृत्ति के लिए आय प्रमाण पत्र",
    kn: "ಉದಾಹರಣೆ: ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕಾಗಿ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ",
  },
  findService: {
    en: "Find service",
    hi: "सेवा खोजें",
    kn: "ಸೇವೆ ಹುಡುಕಿ",
  },
  noResults: {
    en: "No match yet. Try words like income, birth, ration, property tax, or caste certificate.",
    hi: "अभी कोई मिलान नहीं। आय, जन्म, राशन, संपत्ति कर या जाति प्रमाण पत्र शब्द आज़माएं।",
    kn: "ಇನ್ನೂ ಹೊಂದಾಣಿಕೆ ಇಲ್ಲ. ಆದಾಯ, ಜನ್ಮ, ರೇಶನ್, ಆಸ್ತಿ ತೆರಿಗೆ ಅಥವಾ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಪದಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
  },
  portalLabel: {
    en: "Government portal",
    hi: "सरकारी पोर्टल",
    kn: "ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್",
  },
  navigationLabel: {
    en: "Navigation",
    hi: "नेविगेशन",
    kn: "ನ್ಯಾವಿಗೇಶನ್",
  },
  resultHint: {
    en: "Follow this path on the portal. Use the speaker to hear it again.",
    hi: "पोर्टल पर इस पथ का पालन करें। फिर सुनने के लिए स्पीकर बटन दबाएं।",
    kn: "ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಈ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ. ಮತ್ತೆ ಕೇಳಲು ಸ್ಪೀಕರ್ ಬಟನ್ ಒತ್ತಿ.",
  },
};

export function ServiceFinder() {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  const results = useMemo(
    () => matchGovServices(query, GOV_SERVICES),
    [query],
  );

  const topResult = searched && results.length > 0 ? results[0] : null;

  function runSearch(nextQuery = query) {
    setQuery(nextQuery);
    setSearched(true);
    setSearchKey((key) => key + 1);
    stopSpeaking();
  }

  useEffect(() => {
    if (!topResult || !prefs.voiceEnabled) return;

    const voiceText = servicePortalVoice(topResult, language);
    void speakSarvam(voiceText, { language: prefs.language });
  }, [searchKey, prefs.voiceEnabled]);

  const host = topResult ? servicePortalHost(topResult.id, language) : "";
  const steps = topResult ? servicePortalSteps(topResult.id, language) : [];
  const voiceText = topResult ? servicePortalVoice(topResult, language) : "";

  return (
    <div className="grid gap-5">
      <label className="grid gap-2">
        <span className="caption text-sm font-semibold">
          {pickLang(FINDER.queryLabel, language)}
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") runSearch();
          }}
          className="ink-input"
          placeholder={pickLang(FINDER.queryPlaceholder, language)}
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example.search}
            type="button"
            onClick={() => runSearch(example.search)}
            className="btn-ink bg-white px-3 py-1.5 text-xs sm:text-sm"
          >
            {pickLang(example.label, language)}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => runSearch()}
        className="btn-ink self-start px-6 py-2.5 text-sm text-white"
        style={{ backgroundColor: "var(--blue)" }}
      >
        {pickLang(FINDER.findService, language)}
      </button>

      {searched && results.length === 0 && (
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {pickLang(FINDER.noResults, language)}
        </p>
      )}

      {topResult && (
        <div className="grid gap-3">
          <p className="caption text-sm leading-relaxed">
            {pickLang(FINDER.resultHint, language)}
          </p>
          <article className="rounded-xl border border-[var(--ink)] bg-white p-4 ring-2 ring-[var(--blue)] sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="caption text-xs font-semibold uppercase tracking-wide">
                  {pickLang(FINDER.portalLabel, language)}
                </p>
                <p className="landing-strong mt-1 font-mono text-base sm:text-lg">
                  {host}
                </p>

                <p className="caption mt-4 text-xs font-semibold uppercase tracking-wide">
                  {pickLang(FINDER.navigationLabel, language)}
                </p>
                <p className="mt-1 font-mono text-xs leading-relaxed sm:text-sm">
                  {steps.join(" → ")}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                  {servicePortalPath(topResult.id, language)}
                </p>
              </div>

              <VoiceReplayButton
                text={voiceText}
                language={language}
                liveReplay
              />
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
