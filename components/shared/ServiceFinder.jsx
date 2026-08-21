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

export function ServiceFinder() {
  const { prefs } = useAccessability();
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
      speak("No matching service found. Try income certificate or birth certificate.", {
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
          What government service do you need?
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
            placeholder="Example: income certificate for scholarship"
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
        Find service
      </button>

      {searched && results.length === 0 && (
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          No match yet. Try words like income, birth, ration, property tax, or
          caste certificate.
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
                {pickLang(service.title, prefs.language)}
              </h3>
              <p className="caption mt-2 text-sm leading-relaxed">
                {pickLang(service.summary, prefs.language)}
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                <span className="font-bold">Next: </span>
                {pickLang(service.nextStep, prefs.language)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="#form"
                  className="btn-ink bg-white px-4 py-2 text-xs sm:text-sm"
                >
                  Open guided form
                </Link>
                <Link
                  href="#simplify"
                  className="btn-ink bg-white px-4 py-2 text-xs sm:text-sm"
                >
                  Simplify a notice
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
