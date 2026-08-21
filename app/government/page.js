import { Nav } from "@/components/landing/Nav";
import { FeatureNav } from "@/components/domain/FeatureNav";
import { FeatureSection } from "@/components/domain/FeatureSection";
import { FEATURE_DOMAINS } from "@/data/features";

const { features } = FEATURE_DOMAINS.government;

export const metadata = {
  title: "Government Services",
};

export default function GovernmentPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pb-16">
        <div className="mx-auto max-w-6xl pt-10">
          <p className="caption text-xs font-semibold uppercase tracking-widest">
            Government
          </p>
          <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
            Finish government tasks with guided, accessible tools
          </h1>
          <p className="caption mt-4 max-w-2xl text-base leading-relaxed">
            Pick a feature below or scroll through each section on this page.
            Everything runs here — no separate pages for each workflow.
          </p>

          <FeatureNav features={features} />

          {features.map((feature) => (
            <FeatureSection key={feature.id} feature={feature}>
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                Interactive tools for {feature.title.toLowerCase()} will appear
                here shortly.
              </p>
            </FeatureSection>
          ))}
        </div>
      </main>
    </>
  );
}
