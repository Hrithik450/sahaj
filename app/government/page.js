import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { GovernmentPageContent } from "@/components/domain/GovernmentPageContent";

export const metadata = {
  title: "Government Services",
};

export default function GovernmentPage() {
  return (
    <>
      <Nav />
      <GovernmentPageContent />
      <Footer />
    </>
  );
}
