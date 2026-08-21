"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/i18n";
import { speak } from "@/lib/voice";

export function Simplifier({ domain, samples }) {
  const { prefs } = useAccessability();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSimplify(inputText = text) {
    if (!inputText.trim()) {
      setError("Paste a notice or choose a sample to simplify.");
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
        throw new Error(data.error || "Simplify request failed.");
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
        <p className="caption mb-3 text-sm font-semibold">Try a sample notice</p>
        <div className="flex flex-wrap gap-2">
          {samples.map((sample) => (
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
        <span className="caption text-sm font-semibold">Paste notice text</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={7}
          className="ink-input min-h-[9rem] resize-y"
          placeholder="Paste a government or bank letter here..."
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
        Simplify for me
      </button>

      {error && (
        <p className="text-sm font-semibold" style={{ color: "var(--red)" }}>
          {error}
        </p>
      )}

      {result && (
        <div className="grid gap-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--cream)] p-4 sm:p-5">
          <div>
            <p className="caption text-xs font-bold uppercase tracking-widest">
              Plain summary
            </p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              {result.summary}
            </p>
          </div>

          {result.actions?.length > 0 && (
            <div>
              <p className="caption text-xs font-bold uppercase tracking-widest">
                What to do next
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
                Warnings
              </p>
              <ul className="mt-2 grid gap-2 text-sm leading-relaxed">
                {result.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {result.source === "fallback" && (
            <p className="caption text-xs">Showing offline demo summary.</p>
          )}
        </div>
      )}
    </div>
  );
}
