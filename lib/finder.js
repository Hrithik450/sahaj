import { pickLang } from "@/lib/i18n";

function scoreService(service, query) {
  let score = 0;
  const normalized = query.toLowerCase();

  for (const keyword of service.keywords) {
    if (normalized.includes(keyword) || keyword.includes(normalized)) {
      score += 3;
    }
  }

  const title = pickLang(service.title, "en").toLowerCase();
  if (title.includes(normalized)) score += 2;

  return score;
}

export function matchGovServices(query, services) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return services
    .map((service) => ({ service, score: scoreService(service, trimmed) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.service);
}
