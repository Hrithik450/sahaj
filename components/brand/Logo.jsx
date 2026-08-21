import Link from "next/link";
import { SITE } from "@/lib/site";

const SIZES = {
  sm: { text: "text-xl", mark: 22, gap: "gap-2", tagline: "text-[0.65rem]" },
  md: { text: "text-2xl", mark: 26, gap: "gap-2.5", tagline: "text-xs" },
  lg: {
    text: "text-[clamp(2rem,5vw,3rem)]",
    mark: 40,
    gap: "gap-3",
    tagline: "text-sm",
  },
};

export function Logo({
  size = "md",
  href = "/",
  showTagline = false,
  taglineClassName = "",
  className = "",
}) {
  const scale = SIZES[size];

  const inner = (
    <>
      <span className="flex flex-col leading-none">
        <span className={`display translate-y-[0.04em] ${scale.text}`}>
          {SITE.name}
        </span>
        {showTagline && (
          <span
            className={`caption mt-0.5 ${scale.tagline} font-medium ${taglineClassName}`}
          >
            {SITE.tagline}
          </span>
        )}
      </span>
    </>
  );

  const classes = `inline-flex items-center ${scale.gap} ${className}`;

  if (href === null) {
    return <span className={classes}>{inner}</span>;
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
