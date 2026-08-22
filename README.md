# Sahaj

**Sahaj** is an accessibility-first digital companion that helps people complete **government** and **banking** tasks with less confusion, less fear, and more independence.

Built for a hackathon, the project focuses on a simple idea:

> digital public services should adapt to the user, not force the user to adapt to the system.

Sahaj does that with multilingual guidance, plain-language AI, voice support, OCR for notices, and safe practice flows that let people learn without risking a real submission.

## Why this matters

For many users, especially older adults, first-time smartphone users, people with low literacy, and people with accessibility needs, essential digital flows can feel hostile:

- Government notices are hard to understand
- Banking SMS alerts are easy to misread
- Forms are intimidating
- Users often do not know which service to choose next
- Making a mistake feels risky and expensive

Sahaj reduces that friction by turning confusing digital tasks into guided, spoken, step-by-step experiences.

## What Sahaj does

Sahaj supports **English, Hindi, and Kannada** and personalizes the experience using an accessibility profile chosen at onboarding.

### Government workflows

- **Document Simplifier**: turns notices and letters into plain-language summaries with next steps
- **Guided Form**: breaks government forms into one-field-at-a-time flows
- **Service Finder**: helps users identify the right service and required documents
- **Voice Companion**: answers questions in short, accessible responses
- **Practice Mode**: lets users rehearse tasks safely before doing them for real

### Banking workflows

- **Document Simplifier**: explains KYC letters, EMI notices, and bank messages
- **Guided Banking Task**: walks users through tasks like KYC updates or fraud reporting
- **Transaction Explainer**: explains SMS alerts and suspicious-looking transactions
- **Voice Companion**: provides plain-language banking support with streaming replies
- **Safe Practice Mode**: helps users practice common flows without real financial risk

## Accessibility-first design

This project is not a generic chatbot with an accessibility label added on top. Accessibility shapes the product flow from the first screen.

- **Accessibility onboarding** captures user preferences before the main experience starts
- **Voice support** reads guidance aloud and replays important answers
- **Multilingual UI and content** reduce language barriers
- **Simple wording and short response structure** reduce cognitive load
- **Safe simulations** build confidence without real-world consequences
- **Profile persistence** keeps preferences across sessions for signed-in users

## How it works

### 1. User chooses preferences

At the landing page, the user selects language and accessibility needs. In guest mode, those preferences are stored locally. If the user signs in with Google, they are synced to the database.

### 2. Sahaj adapts the experience

Those preferences are passed into the app’s helpers and AI routes so the same task can be explained differently depending on language and user need.

### 3. AI helps, but the app stays demo-safe

Sahaj uses AI for:

- simplifying notices
- explaining banking alerts
- answering support questions in chat
- generating voice responses

When live AI is unavailable, the app falls back to curated offline responses for key demo content. That makes the project more reliable for hackathon judging and live demos.

### 4. OCR makes paper and screenshots usable

Users can upload or snap a photo of a notice. Sahaj extracts text with OCR and then simplifies it into something understandable.

## Demo flow for judges

If you have 3-5 minutes, this is the fastest way to experience the product:

1. Open the landing page and choose a language plus accessibility preference.
2. Visit **Government** and try the **Document Simplifier** with a sample notice.
3. Test **Service Finder** or **Practice Mode** to see guided decision-making.
4. Visit **Banking** and try the **Transaction Explainer** with a sample SMS alert.
5. Open the **Voice Companion** and ask a plain-language question.
6. Enable voice playback to hear the same guidance read aloud.

This sequence shows the full idea: **understand -> decide -> practice -> act**.

## Tech stack

- **Next.js 16** with App Router
- **React 19**
- **Tailwind CSS 4**
- **Auth.js** for Google sign-in
- **Neon Postgres** with **Drizzle ORM** for profile storage
- **Google Gemini** for text generation and explanation
- **Sarvam TTS** for synthesized speech
- **Tesseract.js** for OCR from notice images
- **Web Speech / in-browser voice support** for client-side playback flows

## Architecture overview

```text
app/
  page.js                  Landing page + onboarding
  government/              Government task flows
  banking/                 Banking task flows
  api/
    simplify/              Plain-language document simplification
    explain/               Banking SMS / transaction explanation
    chat/                  Streaming companion chat
    tts/                   Speech generation
    profile/               Accessibility profile sync
    auth/                  Google sign-in via Auth.js

components/
  landing/                 Hero, onboarding, navigation
  domain/                  Government and banking feature shells
  shared/                  Simplifier, chat, practice, service finder, explainer
  voice/                   Voice controls and replay

lib/
  ai.js                    AI prompts, streaming, fallback handling
  ocr.js                   Image text extraction
  auth.js                  Auth.js setup
  db/                      Drizzle schema and profile persistence
  data/                    Curated demo content and offline fallbacks
```

## Key technical choices

- **Domain-specific UX instead of one generic assistant**: government and banking are modeled separately so guidance feels more relevant
- **Fallback-first demo design**: important flows still work even without live model output
- **Personalization through accessibility preferences**: AI prompts and UI behavior adapt to the selected need and language
- **Streaming responses in companion chat**: makes the product feel responsive in live use
- **Client-side OCR input path**: lets users start from a photo instead of manually typing a notice

## Running locally

### Prerequisites

- Node.js
- npm
- Neon Postgres database

### Install

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Environment variables

Create a `.env.local` file in the project root and add the values you need:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | For auth/profile sync | Neon Postgres connection string |
| `AUTH_SECRET` | For auth | Secret used by Auth.js |
| `AUTH_GOOGLE_ID` | Optional | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Optional | Google OAuth client secret |
| `AUTH_URL` | Recommended | Base URL for auth callbacks |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public site URL |
| `GEMINI_API_KEY` | Optional | Enables live Gemini responses |
| `GEMINI_TEXT_MODEL` | Optional | Overrides default Gemini text model |
| `SARVAM_API_KEY` | Optional | Enables live text-to-speech |
| `SARVAM_TTS_SPEAKER` | Optional | Voice preset for Sarvam |

### Database

Push the Drizzle schema after setting `DATABASE_URL`:

```bash
npm run db:push
```

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Drizzle schema to the database |

## Deployment notes

For production deployment:

- set all environment variables on your hosting platform
- use the Neon connection string intended for your deployment model
- configure Google OAuth callback URL if sign-in is enabled
- run the database push step before testing profile sync

## Hackathon angle

Sahaj is not just about accessibility compliance. It is about **accessibility as participation**.

The project reframes accessibility from:

- "can the user technically open this page?"

to:

- "can the user actually complete an important life task with confidence?"

That is the core product idea, and the reason this project focuses on real-world high-stakes flows like certificates, forms, KYC, fraud alerts, and transaction understanding.

## Future scope

- support more Indian languages
- add speech-to-speech interaction for low-literacy users
- integrate real government and banking workflows
- add caregiver / assisted mode
- add smarter fraud-risk detection for banking alerts

## Team note

This repository is a hackathon prototype, but the product direction is practical: make essential digital services understandable, guided, and usable for the people who are usually left behind by them.
