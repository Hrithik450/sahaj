import { FEATURE_DOMAINS } from "@/lib/features";

export const FEATURE_DOMAIN_PATHS = {
  government: "/government",
  banking: "/banking",
};

export const GOVERNMENT_SIMPLIFY_URL = "/government#simplify";

export function featureIdsForDomain(domainKey) {
  return FEATURE_DOMAINS[domainKey]?.features.map((f) => f.id) ?? [];
}

export function isFeatureId(domainKey, featureId) {
  return featureIdsForDomain(domainKey).includes(featureId);
}

export function buildFeatureUrl(domainKey, featureId) {
  const path = FEATURE_DOMAIN_PATHS[domainKey];
  if (!path) return "/";
  if (!featureId) return path;
  return `${path}?feature=${encodeURIComponent(featureId)}`;
}

export function buildLoginUrlForGovernmentSimplify() {
  return `/login?callbackUrl=${encodeURIComponent(GOVERNMENT_SIMPLIFY_URL)}&gate=simplify`;
}

export function isSimplifyGateLogin(searchParams) {
  if (!searchParams) return false;
  if (typeof searchParams.get === "function") {
    return searchParams.get("gate") === "simplify";
  }
  return false;
}

export function featureIdFromWindow() {
  if (typeof window === "undefined") return null;
  const fromQuery = new URLSearchParams(window.location.search).get("feature");
  if (fromQuery) return fromQuery;
  const fromHash = window.location.hash.replace(/^#/, "");
  return fromHash || null;
}

export function domainKeyFromPath(pathname) {
  if (pathname === "/government") return "government";
  if (pathname === "/banking") return "banking";
  return null;
}
