import { SITE } from "@/lib/site";
import { AccessibilityNeedCards } from "@/components/landing/AccessabilityNeedCards";

export function Hero() {
  return (
    <section id="home" className="px-6 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Headline and setup area */}
        <div>
          <span
            className="sticker mb-6 shadow-[-2px_2px_0_0_var(--ink)]"
            style={{ backgroundColor: "var(--sky)" }}
          >
            Welcome to {SITE.name}
          </span>

          <h1 className="landing-strong text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.12]">
            Digital services, made for{" "}
            <span className="underline-swash" style={{ color: "var(--blue)" }}>
              you.
            </span>
          </h1>

          <p className="caption mt-5 max-w-lg text-base leading-relaxed sm:text-[1.05rem]">
            {SITE.name} adapts the experience to your needs so you can access
            government and banking services easily and confidently.
          </p>

          <div className="mt-8">
            <AccessibilityNeedCards />
          </div>
        </div>

        <div className="relative">
          <div
            className="ink-card relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.75rem] bg-[var(--cream)] p-8"
            aria-label="Hero illustration placeholder"
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, var(--sky) 0%, transparent 55%), radial-gradient(circle at 20% 80%, #e8e4ff 0%, transparent 50%)",
              }}
            />
            <p className="caption relative z-[1] text-center text-sm sm:text-base">
              Illustration placeholder: final artwork will appear here.
            </p>
          </div>

          <div
            className="ink-card absolute bottom-4 left-4 z-[2] max-w-[min(100%,16rem)] px-4 py-3.5 sm:bottom-6 sm:left-6 sm:max-w-xs sm:px-5 sm:py-4"
            style={{ boxShadow: "-4px 4px 0 0 var(--ink)" }}
          >
            <p className="text-sm leading-snug sm:text-[0.95rem]">
              <span className="font-bold" style={{ color: "var(--green)" }}>
                ✓
              </span>{" "}
              {SITE.name} is here to make every digital experience{" "}
              <span style={{ color: "var(--blue)" }} className="font-bold">
                accessible
              </span>
              ,{" "}
              <span style={{ color: "var(--blue)" }} className="font-bold">
                understandable
              </span>{" "}
              and{" "}
              <span style={{ color: "var(--blue)" }} className="font-bold">
                dignified
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
