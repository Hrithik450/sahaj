"use client";

import { useMemo, useState } from "react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { pickLang } from "@/lib/i18n";
import { speak } from "@/lib/voice";

export function StepWizard({ templates }) {
  const { prefs } = useAccessability();
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

  function announceStep(step) {
    if (!prefs.voiceEnabled || !step) return;
    const line = `${pickLang(step.label, prefs.language)}. ${pickLang(step.help, prefs.language)}`;
    speak(line, { language: prefs.language });
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

    if (stepIndex >= totalSteps - 1) {
      setCompleted(true);
      if (prefs.voiceEnabled) {
        speak("Great work. Your practice form is complete.", {
          language: prefs.language,
        });
      }
      return;
    }

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);
    announceStep(steps[nextIndex]);
  }

  function goBack() {
    if (stepIndex === 0) return;
    const prevIndex = stepIndex - 1;
    setStepIndex(prevIndex);
    announceStep(steps[prevIndex]);
  }

  if (!template) return null;

  if (completed) {
    return (
      <div className="rounded-xl border-2 border-[var(--ink)] bg-[var(--cream)] p-5">
        <p className="landing-strong text-lg" style={{ color: "var(--green)" }}>
          All steps completed
        </p>
        <p className="caption mt-2 text-sm leading-relaxed">
          This is a safe practice run. Nothing was submitted to any government
          or bank system.
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
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {templates.length > 1 && (
        <label className="grid gap-2">
          <span className="caption text-sm font-semibold">Choose a workflow</span>
          <select
            value={template.id}
            onChange={(event) => handleTemplateChange(event.target.value)}
            className="ink-input ink-select"
          >
            {templates.map((item) => (
              <option key={item.id} value={item.id}>
                {pickLang(item.title, prefs.language)}
              </option>
            ))}
          </select>
        </label>
      )}

      <p className="mono text-xs font-bold uppercase tracking-widest opacity-80">
        Step {stepIndex + 1} of {totalSteps}
      </p>

      {currentStep && (
        <div className="grid gap-3">
          <label htmlFor={`step-${currentStep.id}`} className="landing-strong text-lg">
            {pickLang(currentStep.label, prefs.language)}
          </label>
          <p className="caption text-sm leading-relaxed">
            {pickLang(currentStep.help, prefs.language)}
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
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          className="btn-ink px-6 py-2.5 text-sm text-white"
          style={{ backgroundColor: "var(--blue)" }}
        >
          {stepIndex >= totalSteps - 1 ? "Finish" : "Next step"}
        </button>
      </div>
    </div>
  );
}
