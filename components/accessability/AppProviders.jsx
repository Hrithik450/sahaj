"use client";

import { SessionProvider } from "next-auth/react";
import { AccessabilityProvider } from "@/components/accessability/AccessabilityProvider";
import { ProfileSync } from "@/components/accessability/ProfileSync";
import { SiteChatbot } from "@/components/SiteChatbot";
import { VoiceShell } from "@/components/voice/VoiceShell";

export function AppProviders({ children }) {
  return (
    <SessionProvider>
      <AccessabilityProvider>
        <ProfileSync />
        <VoiceShell>
          {children}
          <SiteChatbot />
        </VoiceShell>
      </AccessabilityProvider>
    </SessionProvider>
  );
}
