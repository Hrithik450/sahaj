"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  applyAccessabilityPrefs,
  ACCESSABILITY_CHANGE_EVENT,
  DEFAULT_ACCESSABILITY_PREFS,
  readAccessabilityPrefs,
  writeAccessabilityPrefs,
} from "@/lib/accessability";

const AccessabilityContext = createContext(null);

function subscribe(callback) {
  window.addEventListener(ACCESSABILITY_CHANGE_EVENT, callback);
  return () => window.removeEventListener(ACCESSABILITY_CHANGE_EVENT, callback);
}

export function AccessabilityProvider({ children }) {
  const prefs = useSyncExternalStore(
    subscribe,
    readAccessabilityPrefs,
    () => DEFAULT_ACCESSABILITY_PREFS,
  );

  useLayoutEffect(() => {
    applyAccessabilityPrefs(prefs);
  }, [prefs]);

  const updatePrefs = useCallback((partial) => {
    writeAccessabilityPrefs({ ...readAccessabilityPrefs(), ...partial });
  }, []);

  const setNeed = useCallback((need) => updatePrefs({ need }), [updatePrefs]);

  const setLanguage = useCallback(
    (language) => updatePrefs({ language }),
    [updatePrefs],
  );

  const setVoiceEnabled = useCallback(
    (voiceEnabled) => updatePrefs({ voiceEnabled }),
    [updatePrefs],
  );

  const completeSetup = useCallback(() => {
    if (!prefs.need) return false;
    updatePrefs({ setupComplete: true });
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    return true;
  }, [prefs.need, updatePrefs]);

  const value = useMemo(
    () => ({
      prefs,
      setNeed,
      setLanguage,
      setVoiceEnabled,
      completeSetup,
    }),
    [prefs, setNeed, setLanguage, setVoiceEnabled, completeSetup],
  );

  return (
    <AccessabilityContext.Provider value={value}>
      {children}
    </AccessabilityContext.Provider>
  );
}

export function useAccessability() {
  const context = useContext(AccessabilityContext);
  if (!context) {
    throw new Error(
      "useAccessability must be used within AccessabilityProvider",
    );
  }
  return context;
}
