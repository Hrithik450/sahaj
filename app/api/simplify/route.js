import { findFallbackForText, simplifyText } from "@/lib/ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      text,
      domain = "gov",
      language = "en",
      need = null,
      sampleId = null,
    } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    const trimmed = text.trim();

    const fallback = findFallbackForText(trimmed, domain, language, sampleId);
    if (fallback) {
      return NextResponse.json(fallback);
    }

    const aiResult = await simplifyText({
      text: trimmed,
      language,
      need,
      domain,
    });
    if (aiResult) {
      return NextResponse.json(aiResult);
    }

    return NextResponse.json(
      { error: "Could not simplify this text right now." },
      { status: 503 },
    );
  } catch (error) {
    console.error("Simplify API error:", error);
    return NextResponse.json(
      { error: "Could not simplify this text right now." },
      { status: 500 },
    );
  }
}
