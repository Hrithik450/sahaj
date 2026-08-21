export function FeatureSection({
  id,
  title,
  description,
  domainLabel = "Service",
  children,
}) {
  return (
    <section
      id={id}
      className="border-t border-[var(--ink)] py-12 first:border-t-0 first:pt-4"
    >
      <p className="caption text-xs font-semibold uppercase tracking-widest">
        {domainLabel}
      </p>
      <h2 className="landing-strong mt-2 text-[clamp(1.5rem,3vw,2rem)]">
        {title}
      </h2>
      <p className="caption mt-3 max-w-2xl text-base leading-relaxed">
        {description}
      </p>

      <div className="ink-card mt-8 p-6 sm:p-8">{children}</div>
    </section>
  );
}
