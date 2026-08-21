import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ClientOnboardingOverlay } from "@/components/landing/ClientOnboardingOverlay";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
      </main>
      <ClientOnboardingOverlay />
    </>
  );
}
