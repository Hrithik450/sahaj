export function FeatureSection({ feature, children }) {
  return (
    <section
      id={feature.id}
      className="border-t-2 border-[var(--ink)] py-12 first:border-t-0 first:pt-4"
    >
      <p className="caption text-xs font-semibold uppercase tracking-widest">
        Government service
      </p>
      <h2 className="landing-strong mt-2 text-[clamp(1.5rem,3vw,2rem)]">
        {feature.title}
      </h2>
      <p className="caption mt-3 max-w-2xl text-base leading-relaxed">
        {feature.description}
      </p>

      <div className="ink-card mt-8 p-6 sm:p-8">{children}</div>
    </section>
  );
}
