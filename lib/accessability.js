import { DEFAULT_LANGUAGE } from "@/data/languages";

export const ACCESSABILITY_STORAGE_KEY = "sahaj-accessability-prefs";
export const ACCESSABILITY_CHANGE_EVENT = "sahaj-accessability-change";

export const DEFAULT_ACCESSABILITY_PREFS = {
  need: null,
  language: DEFAULT_LANGUAGE,
  voiceEnabled: false,
  setupComplete: false,
};

let cachedSnapshot = DEFAULT_ACCESSABILITY_PREFS;

function prefsEqual(a, b) {
  return (
    a.need === b.need &&
    a.language === b.language &&
    a.voiceEnabled === b.voiceEnabled &&
    a.setupComplete === b.setupComplete
  );
}

function normalizePrefs(prefs) {
  return { ...DEFAULT_ACCESSABILITY_PREFS, ...prefs };
}

export function readAccessabilityPrefs() {
  if (typeof window === "undefined") return DEFAULT_ACCESSABILITY_PREFS;

  try {
    const raw = localStorage.getItem(ACCESSABILITY_STORAGE_KEY);
    const next = raw
      ? normalizePrefs(JSON.parse(raw))
      : DEFAULT_ACCESSABILITY_PREFS;

    if (prefsEqual(next, cachedSnapshot)) {
      return cachedSnapshot;
    }

    cachedSnapshot = next;
    return cachedSnapshot;
  } catch {
    if (cachedSnapshot !== DEFAULT_ACCESSABILITY_PREFS) {
      cachedSnapshot = DEFAULT_ACCESSABILITY_PREFS;
    }
    return cachedSnapshot;
  }
}

export function writeAccessabilityPrefs(prefs) {
  const next = normalizePrefs(prefs);
  localStorage.setItem(ACCESSABILITY_STORAGE_KEY, JSON.stringify(next));

  if (!prefsEqual(next, cachedSnapshot)) {
    cachedSnapshot = next;
  }

  window.dispatchEvent(new Event(ACCESSABILITY_CHANGE_EVENT));
}

export function applyAccessabilityPrefs(prefs) {
  const root = document.documentElement;

  root.dataset.need = prefs.need || "none";
  root.dataset.lang = prefs.language || DEFAULT_LANGUAGE;
  root.dataset.voice = prefs.voiceEnabled ? "on" : "off";

  if (prefs.need === "vision") {
    root.dataset.font = "lg";
    root.dataset.contrast = "high";
  } else {
    root.dataset.font = "normal";
    root.dataset.contrast = "normal";
  }
}
