"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, Upload } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { VoiceReplayButton } from "@/components/voice/VoiceReplayButton";
import { pickLang } from "@/lib/i18n";
import { extractTextFromImage } from "@/lib/ocr";
import { speak } from "@/lib/voice";

const SIMPLIFIER = {
  emptyError: {
    en: "Paste a notice, upload a photo, or choose a sample to simplify.",
    hi: "सरलीकरण के लिए नोटिस चिपकाएं, फोटो अपलोड करें या नमूना चुनें।",
    kn: "ಸರಳೀಕರಣಕ್ಕಾಗಿ ಸೂಚನೆ ಅಂಟಿಸಿ, ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಮಾದರಿ ಆಯ್ಕೆಮಾಡಿ.",
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
  uploadPhoto: {
    en: "Upload photo",
    hi: "फोटो अपलोड करें",
    kn: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  },
  snapPhoto: {
    en: "Snap photo",
    hi: "फोटो लें",
    kn: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
  },
  readingPhoto: {
    en: "Reading text from photo…",
    hi: "फोटो से पाठ पढ़ा जा रहा है…",
    kn: "ಫೋಟೋದಿಂದ ಪಠ್ಯ ಓದಲಾಗುತ್ತಿದೆ…",
  },
  ocrEmpty: {
    en: "Could not read text from this image. Try a clearer photo.",
    hi: "इस छवि से पाठ नहीं पढ़ा जा सका। स्पष्ट फोटो लें।",
    kn: "ಈ ಚಿತ್ರದಿಂದ ಪಠ್ಯ ಓದಲಾಗಲಿಲ್ಲ. ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ.",
  },
  ocrFailed: {
    en: "Could not scan this image right now.",
    hi: "अभी इस छवि को स्कैन नहीं कर सका।",
    kn: "ಈಗ ಈ ಚಿತ್ರವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗಲಿಲ್ಲ.",
  },
};

function formatSimplifierSpeech(result) {
  const parts = [];
  if (result.summary) parts.push(result.summary);
  if (result.actions?.length) parts.push(...result.actions);
  if (result.warnings?.length) parts.push(...result.warnings);
  return parts.join(" ");
}

export function Simplifier({ domain, samples }) {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const fileRef = useRef(null);
  const cameraRef = useRef(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const busy = loading || scanning;

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

      if (prefs.voiceEnabled) {
        const speech = formatSimplifierSpeech(data);
        if (speech) speak(speech, { language: prefs.language });
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

  async function handleImage(file) {
    if (!file) return;

    setScanning(true);
    setError("");
    setResult(null);

    try {
      const extracted = await extractTextFromImage(file, language);
      if (!extracted) {
        setError(pickLang(SIMPLIFIER.ocrEmpty, language));
        return;
      }
      setText(extracted);
    } catch {
      setError(pickLang(SIMPLIFIER.ocrFailed, language));
    } finally {
      setScanning(false);
      if (fileRef.current) fileRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  }

  const resultSpeech = result ? formatSimplifierSpeech(result) : "";

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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="caption text-sm font-semibold">
            {pickLang(SIMPLIFIER.pasteLabel, language)}
          </span>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImage(event.target.files?.[0])}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(event) => handleImage(event.target.files?.[0])}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="btn-ink inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-xs sm:text-sm"
            >
              <Upload className="h-3.5 w-3.5" aria-hidden />
              {pickLang(SIMPLIFIER.uploadPhoto, language)}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => cameraRef.current?.click()}
              className="btn-ink inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-xs sm:text-sm"
            >
              <Camera className="h-3.5 w-3.5" aria-hidden />
              {pickLang(SIMPLIFIER.snapPhoto, language)}
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={7}
          className="ink-input min-h-[9rem] resize-y"
          placeholder={pickLang(SIMPLIFIER.pastePlaceholder, language)}
        />
      </label>

      {scanning && (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {pickLang(SIMPLIFIER.readingPhoto, language)}
        </p>
      )}

      <button
        type="button"
        onClick={() => runSimplify()}
        disabled={busy}
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
          <div className="flex items-start justify-between gap-3">
            <p className="caption text-xs font-bold uppercase tracking-widest">
              {pickLang(SIMPLIFIER.plainSummary, language)}
            </p>
            <VoiceReplayButton text={resultSpeech} language={language} />
          </div>
          <p className="text-sm leading-relaxed sm:text-base">{result.summary}</p>

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
