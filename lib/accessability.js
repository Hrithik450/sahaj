import { DEFAULT_LANGUAGE } from "@/data/languages";

export const AccessabilitY_STORAGE_KEY = "sahaj-accessability-prefs";
export const AccessabilitY_CHANGE_EVENT = "sahaj-accessability-change";

export const DEFAULT_AccessabilitY_PREFS = {
  need: null,
  language: DEFAULT_LANGUAGE,
  voiceEnabled: false,
  setupComplete: false,
};

export function readAccessabilityPrefs() {
  if (typeof window === "undefined") return DEFAULT_AccessabilitY_PREFS;

  try {
    const raw = localStorage.getItem(AccessabilitY_STORAGE_KEY);
    if (!raw) return DEFAULT_AccessabilitY_PREFS;
    return { ...DEFAULT_AccessabilitY_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_AccessabilitY_PREFS;
  }
}

export function writeAccessabilityPrefs(prefs) {
  localStorage.setItem(AccessabilitY_STORAGE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new Event(AccessabilitY_CHANGE_EVENT));
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
