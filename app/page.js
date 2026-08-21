import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { ClientOnboardingOverlay } from "@/components/landing/ClientOnboardingOverlay";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
      <ClientOnboardingOverlay />
    </>
  );
}
