"use client";

import { useMemo, useState } from "react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { GOV_SERVICES } from "@/data/gov/services";
import { pickLang } from "@/lib/i18n";
import { speak } from "@/lib/voice";

const FRAUD_DISTRACTORS = [
  {
    en: "Ignore the SMS and check your balance next week.",
    hi: "SMS नजरअंदाज करें और अगले सप्ताह balance देखें।",
    kn: "Ignore the SMS and check your balance next week.",
  },
  {
    en: "Pay Rs 50 again to reverse the wrong debit.",
    hi: "गलत debit उलटने के लिए Rs 50 दोबारा भेजें।",
    kn: "Pay Rs 50 again to reverse the wrong debit.",
  },
];

function normalizeValue(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();
}

function isStepAnswerCorrect(step, value) {
  return normalizeValue(value) === normalizeValue(step.correct);
}

function getServiceChoices(correctServiceId) {
  const correct = GOV_SERVICES.find((service) => service.id === correctServiceId);
  const distractors = GOV_SERVICES.filter(
    (service) => service.id !== correctServiceId,
  ).slice(0, 2);

  return correct ? [correct, ...distractors] : GOV_SERVICES.slice(0, 3);
}

function PracticeComplete({ onRetry }) {
  return (
    <div className="rounded-xl border-2 border-[var(--ink)] bg-[var(--cream)] p-5">
      <p className="landing-strong text-lg" style={{ color: "var(--green)" }}>
        Great practice run
      </p>
      <p className="caption mt-2 text-sm leading-relaxed">
        You spotted the right answers safely. Nothing was submitted to any real
        government or bank system.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="btn-ink mt-4 bg-white px-5 py-2 text-sm"
      >
        Try another scenario
      </button>
    </div>
  );
}

function MistakeHint({ hint, language }) {
  return (
    <p
      className="rounded-lg border-2 border-[var(--ink)] px-3 py-2 text-sm leading-relaxed"
      style={{ backgroundColor: "var(--yellow)" }}
      role="alert"
    >
      {pickLang(hint, language)}
    </p>
  );
}

function StepPractice({ scenario, prefs, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [value, setValue] = useState("");
  const [mistake, setMistake] = useState(null);

  const steps = scenario.steps || [];
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;

  function checkStep() {
    if (!currentStep) return;

    if (!isStepAnswerCorrect(currentStep, value)) {
      setMistake(currentStep.mistakeHint);
      if (prefs.voiceEnabled) {
        speak(pickLang(currentStep.mistakeHint, prefs.language), {
          language: prefs.language,
        });
      }
      return;
    }

    setMistake(null);

    if (stepIndex >= totalSteps - 1) {
      onComplete();
      if (prefs.voiceEnabled) {
        speak("Nice work. You completed the practice safely.", {
          language: prefs.language,
        });
      }
      return;
    }

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);
    setValue("");

    if (prefs.voiceEnabled) {
      speak(pickLang(steps[nextIndex].label, prefs.language), {
        language: prefs.language,
      });
    }
  }

  if (!currentStep) return null;

  return (
    <div className="grid gap-4">
      <p className="mono text-xs font-bold uppercase tracking-widest opacity-80">
        Step {stepIndex + 1} of {totalSteps}
      </p>

      <label htmlFor={`practice-${currentStep.id}`} className="landing-strong text-lg">
        {pickLang(currentStep.label, prefs.language)}
      </label>

      <input
        id={`practice-${currentStep.id}`}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setMistake(null);
        }}
        className="ink-input"
      />

      {mistake && <MistakeHint hint={mistake} language={prefs.language} />}

      <button
        type="button"
        onClick={checkStep}
        className="btn-ink self-start px-6 py-2.5 text-sm text-white"
        style={{ backgroundColor: "var(--blue)" }}
      >
        {stepIndex >= totalSteps - 1 ? "Finish practice" : "Check answer"}
      </button>
    </div>
  );
}

function ServicePractice({ scenario, prefs, onComplete }) {
  const [mistake, setMistake] = useState(null);
  const choices = useMemo(
    () => getServiceChoices(scenario.correctServiceId),
    [scenario.correctServiceId],
  );

  function chooseService(serviceId) {
    if (serviceId === scenario.correctServiceId) {
      setMistake(null);
      onComplete();
      if (prefs.voiceEnabled) {
        speak("Correct service choice.", { language: prefs.language });
      }
      return;
    }

    setMistake(scenario.mistakeHint);
    if (prefs.voiceEnabled) {
      speak(pickLang(scenario.mistakeHint, prefs.language), {
        language: prefs.language,
      });
    }
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm leading-relaxed sm:text-base">
        {pickLang(scenario.prompt, prefs.language)}
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        {choices.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => chooseService(service.id)}
            className="btn-ink bg-white px-4 py-3 text-left text-sm"
          >
            {pickLang(service.title, prefs.language)}
          </button>
        ))}
      </div>

      {mistake && <MistakeHint hint={mistake} language={prefs.language} />}
    </div>
  );
}

function ActionPractice({ scenario, prefs, onComplete }) {
  const [mistake, setMistake] = useState(null);
  const correctText = pickLang(scenario.correctAction, prefs.language);

  const choices = useMemo(() => {
    const wrong = FRAUD_DISTRACTORS.map((item) => pickLang(item, prefs.language));
    return [correctText, wrong[0], wrong[1]];
  }, [correctText, prefs.language]);

  function chooseAction(action) {
    if (action === correctText) {
      setMistake(null);
      onComplete();
      if (prefs.voiceEnabled) {
        speak("Good catch. Reporting quickly is the right step.", {
          language: prefs.language,
        });
      }
      return;
    }

    setMistake(scenario.mistakeHint);
    if (prefs.voiceEnabled) {
      speak(pickLang(scenario.mistakeHint, prefs.language), {
        language: prefs.language,
      });
    }
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm leading-relaxed sm:text-base">
        {pickLang(scenario.prompt, prefs.language)}
      </p>

      <div className="grid gap-2">
        {choices.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => chooseAction(action)}
            className="btn-ink bg-white px-4 py-3 text-left text-sm leading-relaxed"
          >
            {action}
          </button>
        ))}
      </div>

      {mistake && <MistakeHint hint={mistake} language={prefs.language} />}
    </div>
  );
}

export function PracticeRunner({ scenarios }) {
  const { prefs } = useAccessability();
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id || "");
  const [completed, setCompleted] = useState(false);

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) || scenarios[0],
    [scenarioId, scenarios],
  );

  function resetScenario(nextId = scenario?.id) {
    setScenarioId(nextId);
    setCompleted(false);
  }

  if (!scenario) return null;

  if (completed) {
    return (
      <PracticeComplete
        onRetry={() => {
          setCompleted(false);
        }}
      />
    );
  }

  return (
    <div className="grid gap-5">
      {scenarios.length > 1 && (
        <label className="grid gap-2">
          <span className="caption text-sm font-semibold">Choose a scenario</span>
          <select
            value={scenario.id}
            onChange={(event) => resetScenario(event.target.value)}
            className="ink-input ink-select"
          >
            {scenarios.map((item) => (
              <option key={item.id} value={item.id}>
                {pickLang(item.title, prefs.language)}
              </option>
            ))}
          </select>
        </label>
      )}

      <p className="caption rounded-lg border-2 border-dashed border-[var(--ink)] bg-white px-3 py-2 text-xs leading-relaxed">
        Safe practice only. Mistakes here help you learn — nothing is sent to a
        real office or bank.
      </p>

      {scenario.steps ? (
        <StepPractice
          scenario={scenario}
          prefs={prefs}
          onComplete={() => setCompleted(true)}
        />
      ) : scenario.correctServiceId ? (
        <ServicePractice
          scenario={scenario}
          prefs={prefs}
          onComplete={() => setCompleted(true)}
        />
      ) : (
        <ActionPractice
          scenario={scenario}
          prefs={prefs}
          onComplete={() => setCompleted(true)}
        />
      )}
    </div>
  );
}
