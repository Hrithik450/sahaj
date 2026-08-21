"use client";

function scrollToFeature(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function FeatureNav({ features, ariaLabel = "Features" }) {
  return (
    <nav
      className="flex flex-nowrap gap-4 overflow-x-auto scroll-smooth py-8 pb-4 sm:gap-5 lg:flex-wrap lg:overflow-visible lg:pb-8"
      aria-label={ariaLabel}
    >
      {features.map((feature) => (
        <button
          key={feature.id}
          type="button"
          onClick={() => scrollToFeature(feature.id)}
          className="sticker-label ink-lift shrink-0 rounded-[1.75rem] border border-[var(--ink)] bg-transparent px-5 py-3 text-left shadow-[-1.5px_1.5px_0_0_var(--ink)] sm:px-6"
        >
          <span className="block leading-tight">{feature.title}</span>
        </button>
      ))}
    </nav>
  );
}
