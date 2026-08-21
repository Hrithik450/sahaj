"use client";

function scrollToFeature(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function FeatureNav({ features, ariaLabel = "Features" }) {
  return (
    <nav
      className="flex flex-wrap justify-center gap-4 py-8 sm:gap-5"
      aria-label={ariaLabel}
    >
      {features.map((feature) => (
        <button
          key={feature.id}
          type="button"
          onClick={() => scrollToFeature(feature.id)}
          className="sticker sticker-oval sticker-label ink-lift w-[9.5rem] shadow-[-1.5px_1.5px_0_0_var(--ink)] sm:w-[10.5rem]"
          style={{ backgroundColor: feature.iconBg }}
        >
          <span className="block leading-tight">{feature.title}</span>
          <span className="mt-1 block text-xs font-medium opacity-80">
            {feature.navHint}
          </span>
        </button>
      ))}
    </nav>
  );
}
