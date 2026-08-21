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
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-16">
        <LoginCard />
      </main>
      <Footer />
    </>
  );
}
