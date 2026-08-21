import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/lib/db/schema";

const globalForDb = globalThis;

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (process.env.VERCEL && !databaseUrl.includes("-pooler")) {
    throw new Error(
      "On Vercel, DATABASE_URL must use the Neon transaction pooler URL (hostname contains -pooler).",
    );
  }

  return databaseUrl;
}

function createDb() {
  const sql = neon(getDatabaseUrl());
  return drizzle(sql, { schema });
}

export function getDb() {
  if (!globalForDb.__sahajDb) {
    globalForDb.__sahajDb = createDb();
  }

  return globalForDb.__sahajDb;
}

export { schema };
