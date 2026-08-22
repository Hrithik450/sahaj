import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL?.trim();

if (!url) {
  throw new Error("DATABASE_URL is not configured.");
}

export default defineConfig({
  schema: "./lib/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
