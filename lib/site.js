export function siteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return configured.replace(/\/+$/, "");
}

export function absoluteUrl(path) {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE = {
  name: "Sahaj",
  title: "Sahaj: Digital services, made for you",
  description:
    "Sahaj adapts government and banking digital services to your needs with accessibility profiles, voice guidance, and plain-language AI so you can finish tasks with confidence.",
  tagline: "Digital services, made for you.",
  locale: "en_IN",
  country: "IN",
};
