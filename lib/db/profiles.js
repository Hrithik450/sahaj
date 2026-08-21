import { eq } from "drizzle-orm";
import { ACCESSIBILITY_NEED_IDS } from "@/lib/data/accessability-needs";
import { DEFAULT_LANGUAGE } from "@/lib/data/languages";
import { getDb } from "@/lib/db/client";
import { accessabilityProfiles } from "@/lib/db/schema";

const VALID_LANGUAGES = new Set(["en", "hi", "kn"]);

export function prefsToProfileRow(prefs = {}) {
  const need = ACCESSIBILITY_NEED_IDS.has(prefs.need) ? prefs.need : null;

  return {
    need,
    language: VALID_LANGUAGES.has(prefs.language)
      ? prefs.language
      : DEFAULT_LANGUAGE,
    voiceEnabled: Boolean(prefs.voiceEnabled),
    fontScale: need === "vision" ? 1.125 : 1,
    contrast: need === "vision" ? "high" : "normal",
    updatedAt: new Date(),
  };
}

export function profileRowToPrefs(row) {
  if (!row) return null;

  return {
    need: row.need,
    language: row.language || DEFAULT_LANGUAGE,
    voiceEnabled: row.voiceEnabled,
    setupComplete: Boolean(row.need),
  };
}

export async function getProfileByUserId(userId) {
  const db = getDb();
  return (
    (await db.query.accessabilityProfiles.findFirst({
      where: eq(accessabilityProfiles.userId, userId),
    })) ?? null
  );
}

export async function upsertProfileForUser(userId, prefs) {
  const db = getDb();
  const row = prefsToProfileRow(prefs);

  const [profile] = await db
    .insert(accessabilityProfiles)
    .values({ userId, ...row })
    .onConflictDoUpdate({
      target: accessabilityProfiles.userId,
      set: row,
    })
    .returning();

  return profile;
}
