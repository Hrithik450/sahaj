/** Pick a localized string from `{ en, hi, kn }` objects used in mock data. */
export function pickLang(value, language = "en") {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] || value.en || "";
}
