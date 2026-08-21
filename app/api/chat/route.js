import { createChatStream } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      message,
      domain = "gov",
      language = "en",
      need = null,
      history = [],
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const { stream, source } = await createChatStream({
      message,
      domain,
      language,
      need,
      history,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Sahaj-Source": source,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Could not start the companion chat right now." },
      { status: 500 },
    );
  }
}
