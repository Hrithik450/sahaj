import { NextResponse } from "next/server";
import { SITE_CHAT_KNOWLEDGE } from "@/lib/site-chat-knowledge";

/** Help bubble only — always the lite model, separate from GEMINI_TEXT_MODEL in lib/ai.js */
const HELP_MODEL = (process.env.GEMINI_HELP_MODEL ?? "gemini-3.1-flash-lite")
  .trim()
  .replace(/\.+$/, "");

export async function POST(request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const language = body.language || "en";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Help chat is offline. Browse /government or /banking for Sahaj tools, or open the accessibility panel to set language and voice.",
      });
    }

    const system = `You are Sahaj site help — a short, friendly guide for the Sahaj web app.
Answer ONLY using the knowledge below. If the answer is not there, say you are not sure and point to /government or /banking or the accessibility panel.
Use plain words, under 80 words. Language code: ${language} (reply in that language: en=English, hi=Hindi, kn=Kannada).
No markdown. No invented helplines or URLs.

KNOWLEDGE:
${SITE_CHAT_KNOWLEDGE}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${HELP_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 200,
          },
        }),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not get a reply right now." },
        { status: 500 },
      );
    }

    const payload = await response.json();
    const reply =
      payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Sorry, I could not answer that. Try asking about Government, Banking, voice, or sign-in.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Help chat error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
