import { explainTransaction, findTransactionFallback } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, language = "en", need = null } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    const aiResult = await explainTransaction({ text, language, need });
    if (aiResult) {
      return NextResponse.json(aiResult);
    }

    return NextResponse.json(findTransactionFallback(text, language));
  } catch (error) {
    console.error("Explain API error:", error);
    return NextResponse.json(
      { error: "Could not explain this transaction right now." },
      { status: 500 },
    );
  }
}
