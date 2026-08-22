export function sanitizeTextForSpeech(text) {
  if (!text || typeof text !== "string") return "";

  let s = text;

  s = s.replace(/```[\s\S]*?```/g, " ");
  s = s.replace(/`([^`]+)`/g, "$1");
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  s = s.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");

  s = s.replace(/\*\*\*([^*]+)\*\*\*/g, "$1");
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/\*([^*\n]+)\*/g, "$1");
  s = s.replace(/__([^_]+)__/g, "$1");
  s = s.replace(/_([^_\n]+)_/g, "$1");

  s = s.replace(/^\s*#{1,6}\s+/gm, "");
  s = s.replace(/^\s*[*\-•]\s+/gm, "");
  s = s.replace(/^\s*\d+\.\s+/gm, "");

  s = s.replace(/\*/g, "");
  s = s.replace(/#/g, "");
  s = s.replace(/<[^>]+>/g, "");

  s = s.replace(/\s+\n/g, "\n");
  s = s.replace(/\n{3,}/g, "\n\n");
  s = s.replace(/[ \t]{2,}/g, " ");

  return s.trim();
}
