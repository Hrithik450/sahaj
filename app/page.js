import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Overlay } from "@/components/landing/Overlay";
import { FocusFeaturesScroll } from "@/components/landing/FocusFeaturesScroll";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
      <Overlay />
      <Suspense fallback={null}>
        <FocusFeaturesScroll />
      </Suspense>
    </>
  );
}
