import { SITE } from "@/lib/site";
import { AccessabilitySetup } from "@/components/landing/AccessabilitySetup";
import { HeroIllustration } from "@/components/landing/HeroIllustration";

export function Hero() {
  return (
    <section
      id="home"
      className="section-x overflow-hidden pt-14 pb-6 sm:pt-14 sm:pb-10 md:pt-16 md:pb-14 lg:py-16"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col lg:block lg:min-h-[30rem]">
        <div className="relative z-0 w-full lg:w-[60%]">
          <span
            className="sticker mb-3 rotate-2 shadow-[-1.5px_1.5px_0_0_var(--ink)] sm:mb-4"
            style={{ backgroundColor: "var(--sky)" }}
          >
            Welcome to {SITE.name}
          </span>

          <h1 className="landing-strong max-w-[28rem] text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.12] sm:max-w-[34rem] lg:max-w-none">
            <span className="block">Digital services,</span>
            <span className="block">
              simple for{" "}
              <span
                className="underline-swash"
                style={{ color: "var(--blue)" }}
              >
                everyone.
              </span>
            </span>
          </h1>

          <div className="mt-5 max-w-full sm:mt-6 sm:max-w-[90%] lg:mt-8 lg:max-w-[80%]">
            <AccessabilitySetup />
          </div>
        </div>

        <div className="relative -mx-4 mt-10 flex min-h-[min(34vh,14rem)] w-[calc(100%+2rem)] flex-1 items-end justify-start sm:mx-0 sm:w-full sm:-translate-x-2 sm:min-h-[min(40vh,18rem)] md:mt-12 md:-translate-x-3 md:min-h-[min(48vh,24rem)] lg:pointer-events-none lg:absolute lg:-right-8 lg:top-[50%] lg:z-20 lg:mx-0 lg:mt-0 lg:min-h-0 lg:w-[62%] lg:translate-x-0 lg:-translate-y-1/2 lg:items-center lg:justify-center">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
