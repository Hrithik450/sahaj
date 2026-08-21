import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { LoginCard } from "@/components/auth/LoginCard";

export const metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="section-x mx-auto flex w-full max-w-lg flex-1 flex-col justify-center pt-20 pb-16 sm:pt-24 md:pt-28 lg:py-16">
        <LoginCard />
      </main>
      <Footer />
    </>
  );
}
