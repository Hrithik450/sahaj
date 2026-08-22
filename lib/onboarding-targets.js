const targets = new Map();

export function registerOnboardingTarget(id, node) {
  if (node) {
    targets.set(id, node);
  } else {
    targets.delete(id);
  }
}

export function getOnboardingTarget(id) {
  return targets.get(id) ?? document.getElementById(id);
}
