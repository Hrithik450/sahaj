import { synthesizeGeminiSpeech } from "@/lib/gemini-tts";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, language = "en" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    const result = await synthesizeGeminiSpeech(text, { language });
    if (!result) {
      return NextResponse.json(
        { error: "Speech synthesis is unavailable." },
        { status: 503 },
      );
    }

    return new Response(result.wav, {
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "public, max-age=86400",
        "X-Sahaj-Source": result.source,
        "X-Sahaj-Model": result.model,
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Could not synthesize speech right now." },
      { status: 500 },
    );
  }
}
