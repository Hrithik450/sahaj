import { findFallbackForText, simplifyText } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, domain = "gov", language = "en", need = null } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    const aiResult = await simplifyText({ text, language, need, domain });
    if (aiResult) {
      return NextResponse.json(aiResult);
    }

    return NextResponse.json(findFallbackForText(text, domain, language));
  } catch (error) {
    console.error("Simplify API error:", error);
    return NextResponse.json(
      { error: "Could not simplify this text right now." },
      { status: 500 },
    );
  }
}
