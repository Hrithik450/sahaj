"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import {
  readAccessabilityPrefs,
  writeAccessabilityPrefs,
} from "@/lib/utils";

export function ProfileSync() {
  const { data: session, status } = useSession();
  const { prefs } = useAccessability();
  const loadedForUser = useRef(null);
  const skipNextSave = useRef(false);

  useEffect(() => {
    const userId = session?.user?.id;
    if (status !== "authenticated" || !userId) {
      loadedForUser.current = null;
      return;
    }

    if (loadedForUser.current === userId) return;

    let cancelled = false;

    async function syncOnSignIn() {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();

        if (cancelled) return;

        if (data.profile) {
          skipNextSave.current = true;
          writeAccessabilityPrefs({
            ...readAccessabilityPrefs(),
            ...data.profile,
          });
        } else {
          await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(readAccessabilityPrefs()),
          });
        }
      } catch (error) {
        console.error("Profile sync on sign-in failed:", error);
      } finally {
        if (!cancelled) {
          loadedForUser.current = userId;
        }
      }
    }

    syncOnSignIn();

    return () => {
      cancelled = true;
    };
  }, [status, session?.user?.id]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (status !== "authenticated" || !userId || loadedForUser.current !== userId) {
      return;
    }

    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prefs),
        });
      } catch (error) {
        console.error("Profile save failed:", error);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [prefs, session?.user?.id, status]);

  return null;
}
