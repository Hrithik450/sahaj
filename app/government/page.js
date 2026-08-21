import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { FeatureNav } from "@/components/domain/FeatureNav";
import { DomainFeatures } from "@/components/domain/DomainFeatures";
import { FEATURE_DOMAINS } from "@/lib/data/features";

const { features } = FEATURE_DOMAINS.government;

export const metadata = {
  title: "Government Services",
};

export default function GovernmentPage() {
  return (
    <>
      <Nav />
      <main className="section-x pb-16">
        <div className="mx-auto max-w-6xl pt-14 sm:pt-14 md:pt-16 lg:pt-16">
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

          <FeatureNav features={features} ariaLabel="Government features" />

          <DomainFeatures
            features={features}
            domain="gov"
            domainLabel="Government service"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
