"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { BANK_TRANSACTIONS } from "@/lib/data/bank/transactions";
import { pickLang } from "@/lib/i18n";
import { speak } from "@/lib/voice";

export function TransactionExplainer() {
  const { prefs } = useAccessability();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runExplain(inputText = text) {
    if (!inputText.trim()) {
      setError("Paste an SMS alert or choose a sample transaction.");
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
        throw new Error(data.error || "Explain request failed.");
      }

      setResult(data);

      if (prefs.voiceEnabled && data.summary) {
        speak(data.summary, { language: prefs.language });
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
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
        <p className="caption mb-3 text-sm font-semibold">Try a sample alert</p>
        <div className="flex flex-wrap gap-2">
          {BANK_TRANSACTIONS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => loadSample(sample)}
              className="btn-ink bg-white px-3 py-1.5 text-xs sm:text-sm"
            >
              {pickLang(sample.title, prefs.language)}
            </button>
          ))}
        </div>
      </div>

      <label className="grid gap-2">
        <span className="caption text-sm font-semibold">
          Paste bank SMS or transaction text
        </span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          className="ink-input min-h-[7rem] resize-y font-mono text-sm"
          placeholder="Rs 250.00 debited from A/c **9033..."
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
        Explain transaction
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
              What happened
            </p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              {result.summary}
            </p>
          </div>

          {result.checks?.length > 0 && (
            <div>
              <p className="caption text-xs font-bold uppercase tracking-widest">
                What to check
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
              This may be suspicious. Contact your bank fraud helpline if you
              did not authorize it.
            </p>
          )}

          {result.source === "fallback" && (
            <p className="caption text-xs">Showing offline demo explanation.</p>
          )}
        </div>
      )}
    </div>
  );
}
