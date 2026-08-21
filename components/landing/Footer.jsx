import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Banking", href: "/banking" },
  { label: "Features", href: "#features" },
];

export function Footer() {
  return (
    <footer id="footer" className="mt-4">
      <div className="footer-slab px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Logo href={null} showTagline />
              <p className="caption mt-3 max-w-md text-sm leading-relaxed">
                {SITE.tagline} Accessible government and banking workflows with
                voice, plain language, and profiles that adapt to you.
              </p>
            </div>

            <nav
              className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold"
              aria-label="Footer"
            >
              {FOOTER_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <p className="mono mt-8 border-t-2 border-[var(--ink)] pt-6 text-center text-xs font-bold opacity-70">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
