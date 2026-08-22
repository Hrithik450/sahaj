"use client";

import Link from "next/link";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { Logo } from "@/components/brand/Logo";
import { pickLang } from "@/lib/utils";
import { SITE } from "@/lib/site";

const FOOTER = {
  home: { en: "Home", hi: "होम", kn: "ಮುಖಪುಟ" },
  government: { en: "Government", hi: "सरकार", kn: "ಸರ್ಕಾರ" },
  banking: { en: "Banking", hi: "बैंकिंग", kn: "ಬ್ಯಾಂಕಿಂಗ್" },
  features: { en: "Features", hi: "सुविधाएं", kn: "ವೈಶಿಷ್ಟ್ಯಗಳು" },
  tagline: {
    en: "Digital services, made for you.",
    hi: "डिजिटल सेवाएं, आपके लिए।",
    kn: "ಡಿಜಿಟಲ್ ಸೇವೆಗಳು, ನಿಮಗಾಗಿ.",
  },
  description: {
    en: "Accessible government and banking workflows with voice, plain language, and profiles that adapt to you.",
    hi: "आवाज़, सरल भाषा और आपके अनुकूल प्रोफ़ाइल के साथ सुलभ सरकारी और बैंकिंग कार्य।",
    kn: "ಧ್ವನಿ, ಸರಳ ಭಾಷೆ ಮತ್ತು ನಿಮಗೆ ಹೊಂದುವ ಪ್ರೊಫೈಲ್‌ಗಳೊಂದಿಗೆ ಸುಲಭ ಸರ್ಕಾರಿ ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸ.",
  },
  navAria: { en: "Footer", hi: "फ़ुटर", kn: "ಅಡಿಟಿಳಿ" },
  rights: {
    en: "All rights reserved.",
    hi: "सर्वाधिकार सुरक्षित।",
    kn: "ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  },
};

const FOOTER_LINKS = [
  { key: "home", href: "/" },
  { key: "government", href: "/government" },
  { key: "banking", href: "/banking" },
  { key: "features", href: "#features" },
];

export function Footer() {
  const { prefs } = useAccessability();
  const language = prefs.language;

  return (
    <footer id="footer" className="mt-8 sm:mt-6 lg:mt-4">
      <div className="footer-slab section-x pt-10 pb-5 sm:pt-12 sm:pb-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Logo
                href={null}
                showTagline
                tagline={pickLang(FOOTER.tagline, language)}
              />
              <p className="caption mt-3 max-w-md text-sm leading-relaxed">
                {pickLang(FOOTER.tagline, language)}{" "}
                {pickLang(FOOTER.description, language)}
              </p>
            </div>

            <nav
              className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold"
              aria-label={pickLang(FOOTER.navAria, language)}
            >
              {FOOTER_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {pickLang(FOOTER[link.key], language)}
                </Link>
              ))}
            </nav>
          </div>

          <p className="mono mt-8 border-t border-[var(--ink)] pt-6 text-center text-xs font-bold opacity-70">
            © {new Date().getFullYear()} {SITE.name}.{" "}
            {pickLang(FOOTER.rights, language)}
          </p>
        </div>
      </div>
    </footer>
  );
}
