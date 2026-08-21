import localFont from "next/font/local";

const landing = localFont({
  src: "./fonts/bricolage-grotesque-variable.woff2",
  weight: "200 800",
  variable: "--font-landing",
  display: "swap",
});

export const landingFontClassName = [landing.variable, "landing"].join(" ");
