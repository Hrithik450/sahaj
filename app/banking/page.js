import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { BankingPageContent } from "@/components/domain/BankingPageContent";

export const metadata = {
  title: "Banking Services",
};

export default function BankingPage() {
  return (
    <>
      <Nav />
      <BankingPageContent />
      <Footer />
    </>
  );
}
