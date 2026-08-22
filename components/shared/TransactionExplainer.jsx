"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { BANK_TRANSACTIONS } from "@/lib/features";
import { pickLang } from "@/lib/utils";
import { speakSarvam } from "@/lib/tts/voice";

const EXPLAINER = {
  emptyError: {
    en: "Paste an SMS alert or choose a sample transaction.",
    hi: "SMS अलर्ट चिपकाएं या नमूना लेनदेन चुनें।",
    kn: "SMS ಎಚ್ಚರಿಕೆ ಅಂಟಿಸಿ ಅಥವಾ ಮಾದರಿ ವಹಿವಾಟು ಆಯ್ಕೆಮಾಡಿ.",
  },
  requestFailed: {
    en: "Explain request failed.",
    hi: "व्याख्या अनुरोध विफल।",
    kn: "ವಿವರಣೆ ವಿನಂತಿ ವಿಫಲವಾಗಿದೆ.",
  },
  genericError: {
    en: "Something went wrong.",
    hi: "कुछ गलत हो गया।",
    kn: "ಏನೋ ತಪ್ಪಾಗಿದೆ.",
  },
  sampleHeading: {
    en: "Try a sample alert",
    hi: "नमूना अलर्ट आज़माएं",
    kn: "ಮಾದರಿ ಎಚ್ಚರಿಕೆ ಪ್ರಯತ್ನಿಸಿ",
  },
  pasteLabel: {
    en: "Paste bank SMS or transaction text",
    hi: "बैंक SMS या लेनदेन पाठ चिपकाएं",
    kn: "ಬ್ಯಾಂಕ್ SMS ಅಥವಾ ವಹಿವಾಟು ಪಠ್ಯ ಅಂಟಿಸಿ",
  },
  pastePlaceholder: {
    en: "Rs 250.00 debited from A/c **9033...",
    hi: "Rs 250.00 debited from A/c **9033...",
    kn: "Rs 250.00 debited from A/c **9033...",
  },
  submit: {
    en: "Explain transaction",
    hi: "लेनदेन समझाएं",
    kn: "ವಹಿವಾಟು ವಿವರಿಸಿ",
  },
  whatHappened: {
    en: "What happened",
    hi: "क्या हुआ",
    kn: "ಏನಾಯಿತು",
  },
  whatToCheck: {
    en: "What to check",
    hi: "क्या जांचें",
    kn: "ಏನನ್ನು ಪರಿಶೀಲಿಸಬೇಕು",
  },
  suspicious: {
    en: "This may be suspicious. Contact your bank fraud helpline if you did not authorize it.",
    hi: "यह संदिग्ध हो सकता है। अगर आपने अनुमति नहीं दी, तो bank fraud helpline पर संपर्क करें।",
    kn: "ಇದು ಸಂಶಯಾಸ್ಪದವಾಗಿರಬಹುದು. ನೀವು ಅನುಮತಿಸದಿದ್ದರೆ ಬ್ಯಾಂಕ್ ವಂಚನೆ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ.",
  },
  offlineNote: {
    en: "Showing offline demo explanation.",
    hi: "ऑफ़लाइन डेमो व्याख्या दिखाई जा रही है।",
    kn: "ಆಫ್‌ಲೈನ್ ಡೆಮೊ ವಿವರಣೆ ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
  },
};

function formatTransactionSpeech(result) {
  const parts = [];
  if (result.summary) parts.push(result.summary);
  if (result.checks?.length) parts.push(...result.checks);
  return parts.join(". ");
}

export function TransactionExplainer() {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runExplain(inputText = text) {
    if (!inputText.trim()) {
      setError(pickLang(EXPLAINER.emptyError, language));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          language: prefs.language,
          need: prefs.need,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || pickLang(EXPLAINER.requestFailed, language));
      }

      setResult(data);

      if (prefs.voiceEnabled) {
        const speech = formatTransactionSpeech(data);
        if (speech) {
          void speakSarvam(speech, { language: prefs.language });
        }
      }
    } catch (err) {
      setError(err.message || pickLang(EXPLAINER.genericError, language));
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
          {pickLang(EXPLAINER.sampleHeading, language)}
        </p>
        <div className="flex flex-wrap gap-2">
          {BANK_TRANSACTIONS.map((sample) => (
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
          {pickLang(EXPLAINER.pasteLabel, language)}
        </span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          className="ink-input min-h-[7rem] resize-y font-mono text-sm"
          placeholder={pickLang(EXPLAINER.pastePlaceholder, language)}
        />
      </label>

      <button
        type="button"
        onClick={() => runExplain()}
        disabled={loading}
        className="btn-ink inline-flex items-center justify-center gap-2 self-start px-6 py-2.5 text-sm text-white"
        style={{ backgroundColor: "var(--blue)" }}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {pickLang(EXPLAINER.submit, language)}
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
              {pickLang(EXPLAINER.whatHappened, language)}
            </p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              {result.summary}
            </p>
          </div>

          {result.checks?.length > 0 && (
            <div>
              <p className="caption text-xs font-bold uppercase tracking-widest">
                {pickLang(EXPLAINER.whatToCheck, language)}
              </p>
              <ul className="mt-2 grid gap-2 text-sm leading-relaxed">
                {result.checks.map((check) => (
                  <li key={check} className="flex gap-2">
                    <span style={{ color: "var(--blue)" }} aria-hidden>
                      •
                    </span>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.suspicious && (
            <p
              className="rounded-lg border border-[var(--ink)] px-3 py-2 text-sm font-semibold"
              style={{ backgroundColor: "var(--yellow)" }}
            >
              {pickLang(EXPLAINER.suspicious, language)}
            </p>
          )}

          {result.source === "fallback" && (
            <p className="caption text-xs">
              {pickLang(EXPLAINER.offlineNote, language)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
