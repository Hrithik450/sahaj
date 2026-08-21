"use client";

import { AccessabilityProvider } from "@/components/accessability/AccessabilityProvider";

export function AppProviders({ children }) {
  return <AccessabilityProvider>{children}</AccessabilityProvider>;
}
