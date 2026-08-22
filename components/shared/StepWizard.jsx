"use client";

import { useMemo, useState } from "react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/utils";
import { speakSarvam, stopSpeaking } from "@/lib/tts/voice";

const LIVE_VOICE_STEP_INDEXES = new Set([1, 2]);

const WIZARD = {
  allDone: {
    en: "All steps completed",
    hi: "सभी चरण पूरे",
    kn: "ಎಲ್ಲ ಹಂತಗಳು ಪೂರ್ಣ",
  },
  safeNote: {
    en: "This is a safe practice run. Nothing was submitted to any government or bank system.",
    hi: "यह सुरक्षित अभ्यास है। किसी सरकारी या बैंक सिस्टम में कुछ नहीं भेजा गया।",
    kn: "ಇದು ಸುರಕ್ಷಿತ ಅಭ್ಯಾಸ. ಯಾವುದೇ ಸರ್ಕಾರಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ವ್ಯವಸ್ಥೆಗೆ ಏನೂ ಕಳುಹಿಸಲಾಗಿಲ್ಲ.",
  },
  tryAgain: { en: "Try again", hi: "फिर कोशिश करें", kn: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ" },
  chooseWorkflow: {
    en: "Choose a workflow",
    hi: "कार्यप्रवाह चुनें",
    kn: "ಕೆಲಸದ ಹರಿವು ಆಯ್ಕೆಮಾಡಿ",
  },
  stepOf: {
    en: (current, total) => `Step ${current} of ${total}`,
    hi: (current, total) => `चरण ${current} / ${total}`,
    kn: (current, total) => `ಹಂತ ${current} / ${total}`,
  },
  back: { en: "Back", hi: "पीछे", kn: "ಹಿಂದೆ" },
  finish: { en: "Finish", hi: "समाप्त", kn: "ಮುಗಿಸಿ" },
  nextStep: { en: "Next step", hi: "अगला चरण", kn: "ಮುಂದಿನ ಹಂತ" },
};

function stepLabel(language, current, total) {
  const fn = WIZARD.stepOf[language] || WIZARD.stepOf.en;
  return fn(current, total);
}

export function StepWizard({ templates }) {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const [templateId, setTemplateId] = useState(templates[0]?.id || "");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const template = useMemo(
    () => templates.find((item) => item.id === templateId) || templates[0],
    [templateId, templates],
  );

  const steps = template?.steps || [];
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;

  function stepSpeechLine(step) {
    if (!step) return "";
    return `${pickLang(step.label, language)}. ${pickLang(step.help, language)}`;
  }

  function announceStep(index) {
    if (!prefs.voiceEnabled || !LIVE_VOICE_STEP_INDEXES.has(index)) return;
    const step = steps[index];
    if (!step) return;
    void speakSarvam(stepSpeechLine(step), { language: prefs.language });
  }

  function handleTemplateChange(id) {
    setTemplateId(id);
    setStepIndex(0);
    setAnswers({});
    setCompleted(false);
  }

  function updateAnswer(value) {
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
  }

  function goNext() {
    if (!currentStep) return;

    const value = answers[currentStep.id]?.trim?.() ?? answers[currentStep.id];
    if (currentStep.required && !value) return;

    stopSpeaking();

    if (stepIndex >= totalSteps - 1) {
      setCompleted(true);
      return;
    }

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);
    announceStep(nextIndex);
  }

  function goBack() {
    if (stepIndex === 0) return;
    stopSpeaking();
    const prevIndex = stepIndex - 1;
    setStepIndex(prevIndex);
    announceStep(prevIndex);
  }

  if (!template) return null;

  if (completed) {
    return (
      <div className="rounded-xl border border-[var(--ink)] bg-[var(--cream)] p-5">
        <p className="landing-strong text-lg" style={{ color: "var(--green)" }}>
          {pickLang(WIZARD.allDone, language)}
        </p>
        <p className="caption mt-2 text-sm leading-relaxed">
          {pickLang(WIZARD.safeNote, language)}
        </p>
        <button
          type="button"
          onClick={() => {
            setCompleted(false);
            setStepIndex(0);
            setAnswers({});
          }}
          className="btn-ink mt-4 bg-white px-5 py-2 text-sm"
        >
          {pickLang(WIZARD.tryAgain, language)}
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {templates.length > 1 && (
        <label className="grid gap-2">
          <span className="caption text-sm font-semibold">
            {pickLang(WIZARD.chooseWorkflow, language)}
          </span>
          <select
            value={template.id}
            onChange={(event) => handleTemplateChange(event.target.value)}
            className="ink-input ink-select"
          >
            {templates.map((item) => (
              <option key={item.id} value={item.id}>
                {pickLang(item.title, language)}
              </option>
            ))}
          </select>
        </label>
      )}

      <p className="mono text-xs font-bold uppercase tracking-widest opacity-80">
        {stepLabel(language, stepIndex + 1, totalSteps)}
      </p>

      {currentStep && (
        <div className="grid gap-3">
          <label htmlFor={`step-${currentStep.id}`} className="landing-strong text-lg">
            {pickLang(currentStep.label, language)}
          </label>
          <p className="caption text-sm leading-relaxed">
            {pickLang(currentStep.help, language)}
          </p>

          <input
            id={`step-${currentStep.id}`}
            type={currentStep.type === "number" ? "number" : "text"}
            value={answers[currentStep.id] || ""}
            onChange={(event) => updateAnswer(event.target.value)}
            className="ink-input"
            required={currentStep.required}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="btn-ink bg-white px-6 py-2.5 text-sm"
        >
          {pickLang(WIZARD.back, language)}
        </button>
        <button
          type="button"
          onClick={goNext}
          className="btn-ink px-6 py-2.5 text-sm text-white"
          style={{ backgroundColor: "var(--blue)" }}
        >
          {stepIndex >= totalSteps - 1
            ? pickLang(WIZARD.finish, language)
            : pickLang(WIZARD.nextStep, language)}
        </button>
      </div>
    </div>
  );
}
