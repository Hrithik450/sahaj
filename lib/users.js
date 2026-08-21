import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { getDb } from "@/lib/db";

export async function upsertGoogleUser({ googleId, email, name, image }) {
  if (!googleId || !email) return null;

  try {
    const db = getDb();
    const [user] = await db
      .insert(users)
      .values({ googleId, email, name, image })
      .onConflictDoUpdate({
        target: users.googleId,
        set: { email, name, image },
      })
      .returning();

    return user ?? null;
  } catch (error) {
    console.error("upsertGoogleUser failed:", error);
    return null;
  }
}

export async function findUserByGoogleId(googleId) {
  if (!googleId) return null;

  try {
    const db = getDb();
    return (
      (await db.query.users.findFirst({
        where: eq(users.googleId, googleId),
      })) ?? null
    );
  } catch (error) {
    console.error("findUserByGoogleId failed:", error);
    return null;
  }
}
