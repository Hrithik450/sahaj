"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Camera, Loader2, Upload } from "lucide-react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { VoiceReplayButton } from "@/components/voice/VoiceReplayButton";
import { buildLoginUrlForGovernmentSimplify } from "@/lib/routes";
import { formatSimplifierSpeech } from "@/lib/tts/simplifier-speech";
import { pickLang } from "@/lib/utils";
import { extractTextFromImage } from "@/lib/ocr";
import { playSampleSimplifierSpeech, speakSarvam } from "@/lib/tts/voice";

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

export function Simplifier({ domain, samples }) {
  const { prefs } = useAccessability();
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const language = prefs.language;
  const fileRef = useRef(null);
  const cameraRef = useRef(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [activeSampleId, setActiveSampleId] = useState(null);
  const [fromPhoto, setFromPhoto] = useState(false);
  const languageRef = useRef(prefs.language);
  const busy = loading || scanning;

  useEffect(() => {
    const previousLanguage = languageRef.current;
    languageRef.current = prefs.language;
    if (previousLanguage === prefs.language) return;
    if (!text.trim() || !result) return;
    void runSimplify(text);
  }, [prefs.language]);

  async function runSimplify(inputText = text) {
    if (!inputText.trim()) {
      setError(pickLang(SIMPLIFIER.emptyError, language));
      return;
    }

    if (domain === "gov" && sessionStatus === "unauthenticated") {
      router.push(buildLoginUrlForGovernmentSimplify());
      return;
    }

    if (domain === "gov" && sessionStatus === "loading") {
      return;
    }

    setLoading(true);
    setError("");

    let resultData = null;

    try {
      const response = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          domain,
          language: prefs.language,
          need: prefs.need,
          sampleId: activeSampleId && !fromPhoto ? activeSampleId : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || pickLang(SIMPLIFIER.requestFailed, language),
        );
      }

      resultData = data;
      setResult(data);
    } catch (err) {
      setError(err.message || pickLang(SIMPLIFIER.genericError, language));
      setResult(null);
    } finally {
      setLoading(false);
    }

    if (!resultData || !prefs.voiceEnabled) return;

    const speech = formatSimplifierSpeech(resultData, prefs.language);
    if (!speech) return;

    const sampleMatch =
      activeSampleId &&
      !fromPhoto &&
      samples.find(
        (sample) => sample.id === activeSampleId && sample.text === inputText,
      );

    if (sampleMatch) {
      void playSampleSimplifierSpeech(sampleMatch.id, prefs.language);
    } else if (fromPhoto) {
      void speakSarvam(speech, { language: prefs.language });
    }
  }

  function loadSample(sample) {
    setText(sample.text);
    setActiveSampleId(sample.id);
    setFromPhoto(false);
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
      setFromPhoto(true);
      setActiveSampleId(null);
    } catch {
      setError(pickLang(SIMPLIFIER.ocrFailed, language));
    } finally {
      setScanning(false);
      if (fileRef.current) fileRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  }

  const resultSpeech = result ? formatSimplifierSpeech(result, language) : "";

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
              className={`btn-ink px-3 py-1.5 text-xs sm:text-sm ${
                activeSampleId === sample.id && !fromPhoto
                  ? "ring-2 ring-[var(--blue)]"
                  : "bg-white"
              }`}
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
          onChange={(event) => {
            setText(event.target.value);
            setActiveSampleId(null);
            setFromPhoto(false);
          }}
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
            <p className="text-sm leading-relaxed sm:text-base">
              {result.summary}
            </p>
            <VoiceReplayButton
              text={resultSpeech}
              language={language}
              sampleNoticeId={fromPhoto ? undefined : activeSampleId}
              liveReplay={fromPhoto}
            />
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
