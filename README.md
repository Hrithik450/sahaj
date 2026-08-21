# Sahaj

Government and banking digital services, adapted to the person, accessibility profiles, voice guidance, and plain-language AI.

Built for CodeFury 9.0 (Accessibility). JavaScript, Next.js, Auth.js, Neon db, Gemini.

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill .env.local (see below)
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Guest mode** works without sign-in (prefs in `localStorage`). Google sign-in is optional and syncs accessibility prefs to Neon.

## Environment

Copy `.env.example` -> `.env.local`:

| Variable               | Required         | Notes                                                                        |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------- |
| `DATABASE_URL`         | For auth/profile | Neon **transaction pooler** URL (`-pooler` in hostname). Required on Vercel. |
| `AUTH_SECRET`          | For auth         | `openssl rand -base64 32`                                                    |
| `AUTH_GOOGLE_ID`       | For Google login | OAuth Web client                                                             |
| `AUTH_GOOGLE_SECRET`   | For Google login |                                                                              |
| `AUTH_URL`             | For auth         | `http://localhost:3000` locally; production URL on Vercel                    |
| `NEXT_PUBLIC_SITE_URL` | Recommended      | Same as public app URL                                                       |
| `GEMINI_API_KEY`       | Optional         | Live AI; offline mock fallbacks work without it                              |

## Scripts

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Development server          |
| `npm run build`   | Production build            |
| `npm run start`   | Run production build        |
| `npm run lint`    | ESLint                      |
| `npm run db:push` | Push Drizzle schema to Neon |

## Project layout

```
app/              Routes and API (auth, profile, simplify, chat, explain)
components/       UI (landing, domain features, voice, accessibility)
lib/              Shared logic (ai, voice, auth, accessibility)
lib/db/           Drizzle schema, Neon client, users, profiles
lib/data/         Mock government and banking content
```

## Routes

| Path          | Purpose                                     |
| ------------- | ------------------------------------------- |
| `/`           | Landing + accessibility setup               |
| `/government` | Five government workflows (anchor sections) |
| `/banking`    | Five banking workflows                      |
| `/login`      | Optional Google sign-in                     |

## Deploy (Vercel)

1. Import the repo and set all env vars from `.env.example`.
2. Use the Neon **pooler** `DATABASE_URL` (one HTTP client per serverless instance).
3. Set `AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Add Google OAuth redirect: `https://<domain>/api/auth/callback/google`
5. After first deploy, run `npm run db:push` against the production database.

## Stack

- **Next.js 16** (App Router, JavaScript)
- **Tailwind CSS 4**
- **Auth.js** (Google OAuth)
- **Neon Postgres** + **Drizzle ORM**
- **Google Gemini** (simplify, chat, explain — with offline fallbacks)
- **Web Speech API** (TTS + live captions)
