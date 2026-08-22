import "server-only";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";

const globalForDb = globalThis;

let pool = null;
let dbInstance = null;

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }
  return url;
}

function getSsl(connectionString) {
  try {
    const host = new URL(connectionString).hostname;
    if (host === "localhost" || host === "127.0.0.1") return undefined;
  } catch {
    // Cloud URLs use SSL by default.
  }
  return { rejectUnauthorized: false };
}

function createDb() {
  const connectionString = getDatabaseUrl();
  const ssl = getSsl(connectionString);

  pool = new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    allowExitOnIdle: true,
    ssl,
  });

  dbInstance = drizzle(pool, { schema });
  return dbInstance;
}

export function getDb() {
  if (!globalForDb.__sahajDb) {
    globalForDb.__sahajDb = createDb();
  }

  return globalForDb.__sahajDb;
}

export { schema };
