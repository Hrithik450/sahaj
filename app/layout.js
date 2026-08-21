import { Geist_Mono } from "next/font/google";
import { landingFontClassName } from "@/assets/fonts";
import { SITE, siteUrl } from "@/lib/site";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteUrl()),
  applicationName: SITE.name,
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${landingFontClassName} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="paper min-h-full flex flex-col flex-1">{children}</div>
      </body>
    </html>
  );
}
