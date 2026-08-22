"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/i18n";
import { speak } from "@/lib/voice";

const SIMPLIFIER = {
  emptyError: {
    en: "Paste a notice or choose a sample to simplify.",
    hi: "सरलीकरण के लिए नोटिस चिपकाएं या नमूना चुनें।",
    kn: "ಸರಳೀಕರಣಕ್ಕಾಗಿ ಸೂಚನೆ ಅಂಟಿಸಿ ಅಥವಾ ಮಾದರಿ ಆಯ್ಕೆಮಾಡಿ.",
  },
  requestFailed: {
    en: "Simplify request failed.",
    hi: "सरलीकरण अनुरोध विफल।",
    kn: "ಸರಳೀಕರಣ ವಿನಂತಿ ವಿಫಲವಾಗಿದೆ.",
  },
  genericError: {
    en: "Something went wrong.",
    hi: "कुछ गलत हो गया।",
    kn: "ಏನೋ ತಪ್ಪಾಗಿದೆ.",
  },
  sampleHeading: {
    en: "Try a sample notice",
    hi: "नमूना नोटिस आज़माएं",
    kn: "ಮಾದರಿ ಸೂಚನೆ ಪ್ರಯತ್ನಿಸಿ",
  },
  pasteLabel: {
    en: "Paste notice text",
    hi: "नोटिस का पाठ चिपकाएं",
    kn: "ಸೂಚನೆ ಪಠ್ಯ ಅಂಟಿಸಿ",
  },
  pastePlaceholder: {
    en: "Paste a government or bank letter here...",
    hi: "यहां सरकारी या बैंक पत्र चिपकाएं...",
    kn: "ಇಲ್ಲಿ ಸರ್ಕಾರಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ಪತ್ರ ಅಂಟಿಸಿ...",
  },
  submit: {
    en: "Simplify for me",
    hi: "मेरे लिए सरल करें",
    kn: "ನನ್ನಿಗಾಗಿ ಸರಳಗೊಳಿಸಿ",
  },
  plainSummary: {
    en: "Plain summary",
    hi: "सरल सारांश",
    kn: "ಸರಳ ಸಾರಾಂಶ",
  },
  nextSteps: {
    en: "What to do next",
    hi: "आगे क्या करें",
    kn: "ಮುಂದೆ ಏನು ಮಾಡಬೇಕು",
  },
  warnings: { en: "Warnings", hi: "चेतावनी", kn: "ಎಚ್ಚರಿಕೆಗಳು" },
};

export function Simplifier({ domain, samples }) {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSimplify(inputText = text) {
    if (!inputText.trim()) {
      setError(pickLang(SIMPLIFIER.emptyError, language));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          domain,
          language: prefs.language,
          need: prefs.need,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || pickLang(SIMPLIFIER.requestFailed, language),
        );
      }

      setResult(data);

      if (prefs.voiceEnabled && data.summary) {
        speak(data.summary, { language: prefs.language });
      }
    } catch (err) {
      setError(err.message || pickLang(SIMPLIFIER.genericError, language));
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function loadSample(sample) {
    setText(sample.text);
    setResult(null);
    setError("");
  }

  return (
    <div className="grid gap-6">
      <div>
        <p className="caption mb-3 text-sm font-semibold">
          {pickLang(SIMPLIFIER.sampleHeading, language)}
        </p>
        <div className="flex flex-wrap gap-2">
          {samples.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => loadSample(sample)}
              className="btn-ink bg-white px-3 py-1.5 text-xs sm:text-sm"
            >
              {pickLang(sample.title, language)}
            </button>
          ))}
        </div>
      </div>

      <label className="grid gap-2">
        <span className="caption text-sm font-semibold">
          {pickLang(SIMPLIFIER.pasteLabel, language)}
        </span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={7}
          className="ink-input min-h-[9rem] resize-y"
          placeholder={pickLang(SIMPLIFIER.pastePlaceholder, language)}
        />
      </label>

      <button
        type="button"
        onClick={() => runSimplify()}
        disabled={loading}
        className="btn-ink inline-flex items-center justify-center gap-2 self-start px-6 py-2.5 text-sm text-white"
        style={{ backgroundColor: "var(--blue)" }}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {pickLang(SIMPLIFIER.submit, language)}
      </button>

      {error && (
        <p className="text-sm font-semibold" style={{ color: "var(--red)" }}>
          {error}
        </p>
      )}

      {result && (
        <div className="grid gap-4 rounded-xl border border-[var(--ink)] bg-[var(--cream)] p-4 sm:p-5">
          <div>
            <p className="caption text-xs font-bold uppercase tracking-widest">
              {pickLang(SIMPLIFIER.plainSummary, language)}
            </p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              {result.summary}
            </p>
          </div>

          {result.actions?.length > 0 && (
            <div>
              <p className="caption text-xs font-bold uppercase tracking-widest">
                {pickLang(SIMPLIFIER.nextSteps, language)}
              </p>
              <ul className="mt-2 grid gap-2 text-sm leading-relaxed">
                {result.actions.map((action) => (
                  <li key={action} className="flex gap-2">
                    <span style={{ color: "var(--green)" }} aria-hidden>
                      ✓
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.warnings?.length > 0 && (
            <div>
              <p className="caption text-xs font-bold uppercase tracking-widest">
                {pickLang(SIMPLIFIER.warnings, language)}
              </p>
              <ul className="mt-2 grid gap-2 text-sm leading-relaxed">
                {result.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
