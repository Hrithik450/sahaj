const LANGS = ["en", "hi", "kn"];

function langId(language) {
  return LANGS.includes(language) ? language : "en";
}

export function heroVoiceAudioPath(language = "en") {
  return `/audio/hero/${langId(language)}.wav`;
}

export function governmentPageVoiceAudioPath(language = "en") {
  return `/audio/pages/government-${langId(language)}.wav`;
}

export function bankingPageVoiceAudioPath(language = "en") {
  return `/audio/pages/banking-${langId(language)}.wav`;
}

export function featureVoiceAudioPath(domainKey, featureId, language = "en") {
  const lang = langId(language);
  return `/audio/features/${domainKey}-${featureId}-natural-${lang}.wav`;
}

export function sampleNoticeAudioPath(noticeId, language = "en") {
  return `/audio/samples/${noticeId}-${langId(language)}.wav`;
}

export function landingGovernmentFeaturesAudioPath(language = "en") {
  return `/audio/landing-features/government-features-natural-${langId(language)}.wav`;
}
