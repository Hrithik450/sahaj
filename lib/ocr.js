/** Client: resize photo for upload, then Gemini Vision on the server. */

const MAX_OCR_EDGE = 1600;

async function imageFileForUpload(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const longest = Math.max(bitmap.width, bitmap.height);
    const scale = longest > MAX_OCR_EDGE ? MAX_OCR_EDGE / longest : 1;
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error("encode"))),
        "image/jpeg",
        0.92,
      );
    });

    return new File([blob], "scan.jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export async function extractTextFromImage(file, language = "en") {
  const image = await imageFileForUpload(file);
  const formData = new FormData();
  formData.append("image", image);
  formData.append("language", language);

  const response = await fetch("/api/ocr", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Could not read this image.");
  }

  return data.text.trim();
}
