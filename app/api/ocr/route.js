import { NextResponse } from "next/server";

const OCR_MODEL = (process.env.GEMINI_OCR_MODEL ?? "gemini-3.1-flash-lite")
  .trim()
  .replace(/\.+$/, "");

const MAX_BYTES = 8 * 1024 * 1024;

function ocrPrompt(language) {
  return `Extract all readable text from this image of an Indian government or banking document (notice, letter, Aadhaar, PAN, bill, etc.).

Return ONLY the extracted text as plain text. No markdown, no JSON.
- Include every field you can read: names, ID numbers, dates, addresses, reference numbers, amounts, instructions.
- Keep Hindi/Kannada/Devanagari in original script when present.
- Use line breaks between logical sections.
- Do not invent or guess missing digits. Skip illegible parts.
- User language preference: ${language} (extract what is on the image).`;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");
    const language = String(formData.get("language") || "en");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: "Image is too large." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OCR is not configured." },
        { status: 503 },
      );
    }

    const mimeType =
      file.type && file.type.startsWith("image/") ? file.type : "image/jpeg";
    const base64 = Buffer.from(bytes).toString("base64");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${OCR_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64,
                  },
                },
                { text: ocrPrompt(language) },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1024,
          },
        }),
      },
    );

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.error("Gemini OCR error:", response.status, errBody.slice(0, 400));
      return NextResponse.json(
        { error: "Could not read this image." },
        { status: 502 },
      );
    }

    const payload = await response.json();
    const text =
      payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!text) {
      return NextResponse.json(
        { error: "No text found in this image." },
        { status: 422 },
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("OCR API error:", error);
    return NextResponse.json(
      { error: "Could not scan this image." },
      { status: 500 },
    );
  }
}
