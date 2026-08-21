"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { GOV_SERVICES } from "@/lib/data/gov/services";
import { matchGovServices } from "@/lib/finder";
import { pickLang } from "@/lib/i18n";
import { speak } from "@/lib/voice";

const EXAMPLE_QUERIES = [
  "birth certificate",
  "income certificate",
  "property tax",
  "ration card",
  "scholarship income proof",
];

const FINDER = {
  noMatchVoice: {
    en: "No matching service found. Try income certificate or birth certificate.",
    hi: "कोई सेवा नहीं मिली। income certificate या birth certificate आज़माएं।",
    kn: "ಯಾವುದೇ ಸೇವೆ ಸಿಗಲಿಲ್ಲ. income certificate ಅಥವಾ birth certificate ಪ್ರಯತ್ನಿಸಿ.",
  },
  queryLabel: {
    en: "What government service do you need?",
    hi: "आपको कौन सी सरकारी सेवा चाहिए?",
    kn: "ನಿಮಗೆ ಯಾವ ಸರ್ಕಾರಿ ಸೇವೆ ಬೇಕು?",
  },
  queryPlaceholder: {
    en: "Example: income certificate for scholarship",
    hi: "उदाहरण: scholarship के लिए income certificate",
    kn: "ಉದಾಹರಣೆ: scholarship ಗಾಗಿ income certificate",
  },
  findService: {
    en: "Find service",
    hi: "सेवा खोजें",
    kn: "ಸೇವೆ ಹುಡುಕಿ",
  },
  noResults: {
    en: "No match yet. Try words like income, birth, ration, property tax, or caste certificate.",
    hi: "अभी कोई मिलान नहीं। income, birth, ration, property tax या caste certificate शब्द आज़माएं।",
    kn: "ಇನ್ನೂ ಹೊಂದಾಣಿಕೆ ಇಲ್ಲ. income, birth, ration, property tax ಅಥವಾ caste certificate ಪದಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
  },
  nextPrefix: { en: "Next: ", hi: "अगला: ", kn: "ಮುಂದೆ: " },
  openForm: {
    en: "Open guided form",
    hi: "मार्गदर्शित फॉर्म खोलें",
    kn: "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್ ತೆರೆಯಿರಿ",
  },
  simplifyNotice: {
    en: "Simplify a notice",
    hi: "नोटिस सरल करें",
    kn: "ಸೂಚನೆ ಸರಳಗೊಳಿಸಿ",
  },
};

export function ServiceFinder() {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const results = useMemo(
    () => matchGovServices(query, GOV_SERVICES),
    [query],
  );

  function runSearch(nextQuery = query) {
    setQuery(nextQuery);
    setSearched(true);

    const matches = matchGovServices(nextQuery, GOV_SERVICES);
    if (!prefs.voiceEnabled) return;

    if (matches.length === 0) {
      speak(pickLang(FINDER.noMatchVoice, language), {
        language: prefs.language,
      });
      return;
    }

    const top = matches[0];
    speak(
      `Best match: ${pickLang(top.title, prefs.language)}. ${pickLang(top.summary, prefs.language)}`,
      { language: prefs.language },
    );
  }

  return (
    <div className="grid gap-5">
      <label className="grid gap-2">
        <span className="caption text-sm font-semibold">
          {pickLang(FINDER.queryLabel, language)}
        </span>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
            aria-hidden
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") runSearch();
            }}
            className="ink-input pl-10"
            placeholder={pickLang(FINDER.queryPlaceholder, language)}
          />
        </div>
      </label>

      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => runSearch(example)}
            className="btn-ink bg-white px-3 py-1.5 text-xs sm:text-sm"
          >
            {example}
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

      {results.length > 0 && (
        <div className="grid gap-3">
          {results.map((service) => (
            <article
              key={service.id}
              className="rounded-xl border border-[var(--ink)] bg-white p-4 sm:p-5"
            >
              <h3 className="landing-strong text-lg">
                {pickLang(service.title, language)}
              </h3>
              <p className="caption mt-2 text-sm leading-relaxed">
                {pickLang(service.summary, language)}
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                <span className="font-bold">
                  {pickLang(FINDER.nextPrefix, language)}
                </span>
                {pickLang(service.nextStep, language)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="#form"
                  className="btn-ink bg-white px-4 py-2 text-xs sm:text-sm"
                >
                  {pickLang(FINDER.openForm, language)}
                </Link>
                <Link
                  href="#simplify"
                  className="btn-ink bg-white px-4 py-2 text-xs sm:text-sm"
                >
                  {pickLang(FINDER.simplifyNotice, language)}
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
