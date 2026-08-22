import { synthesizeSarvamSpeech } from "@/lib/sarvam-tts";
import { sanitizeTextForSpeech } from "@/lib/speech-text";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, language = "en" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    const spoken = sanitizeTextForSpeech(text);
    if (!spoken) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    const result = await synthesizeSarvamSpeech(spoken, { language });

    return new Response(result.wav, {
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "no-store",
        "X-Sahaj-Source": result.source,
        "X-Sahaj-Model": result.model,
      },
    });
  } catch (error) {
    const code = error?.code;
    const isAuth =
      code === "invalid_api_key_error" ||
      error?.message?.includes("dashboard.sarvam.ai");

    if (isAuth) {
      console.error("TTS API auth error:", error.message);
    } else {
      console.error("TTS API error:", error);
    }

    return NextResponse.json(
      {
        error: isAuth
          ? error.message
          : "Could not synthesize speech right now.",
        code,
      },
      { status: isAuth ? 503 : 500 },
    );
  }
}
