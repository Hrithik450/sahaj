import { SITE } from "@/lib/site";

/** Static knowledge for the site help chatbot  keep answers grounded here. */
export const SITE_CHAT_KNOWLEDGE = `
Sahaj (${SITE.tagline})
${SITE.description}

Site map:
- Home (/)  overview, accessibility setup, feature cards for Government and Banking
- Government (/government)  government digital services tools
- Banking (/banking)  banking digital services tools
- Login (/login)  optional Google sign-in to save accessibility profile across devices

Languages: English (en), Hindi (hi), Kannada (kn). Change in the accessibility panel (language picker).

Accessibility panel (available on all pages):
- Language: en / hi / kn
- Accessibility need: general, vision, hearing, motor, cognitive (adjusts layout and guidance)
- Voice guidance: on/off  spoken help for intros, simplifier results, and companion chat
- Sign in with Google: optional; syncs your accessibility choices to your account

Government page tools (/government):
1. Document Simplifier (#simplify)  paste or upload a government notice/letter; get plain-language summary, next steps, warnings. Sign in with Google is required before running simplify (first-task flow). Samples available.
2. Guided Form (#form)  step-by-step government forms with voice prompts (e.g. income certificate).
3. Service Finder (#finder)  describe what you need; find service, documents, and where to go.
4. Voice Companion (#companion)  ask plain-language questions; short answers with captions.
5. Practice Mode (#practice)  safe simulated forms/tasks to build confidence.

Banking page tools (/banking):
1. Document Simplifier (#simplify)  bank letters, EMI, KYC notices in plain language (no sign-in required).
2. Guided Banking Task (#task)  step-by-step tasks like KYC update or reporting fraud.
3. Transaction Explainer (#transaction)  paste SMS/UPI alert; learn what happened and what to check.
4. Voice Companion (#companion)  banking questions in plain language.
5. Safe Practice Mode (#practice)  practice fake UPI or form flows safely.

Sign-in rules:
- Sahaj works without an account (guest mode). Accessibility saves on this device.
- Google sign-in is required only when you click "Simplify for me" on the Government Document Simplifier; after login you return to /government#simplify.
- Login page: /login  optional for profile sync otherwise.

Voice:
- Pre-recorded intros on pages when voice is on
- Live Sarvam TTS for some content when no pre-recorded audio exists
- Replay buttons on simplifier results

Do not invent official phone numbers, URLs, or government schemes not listed here. For urgent fraud or money loss, tell users to call their bank's official helpline from their card or passbook  do not make up numbers.
`.trim();
