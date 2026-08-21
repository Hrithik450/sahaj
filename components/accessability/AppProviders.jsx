"use client";

import { AccessabilityProvider } from "@/components/accessability/AccessabilityProvider";
import { VoiceShell } from "@/components/voice/VoiceShell";

export function AppProviders({ children }) {
  return (
    <AccessabilityProvider>
      <VoiceShell>{children}</VoiceShell>
    </AccessabilityProvider>
  );
}
