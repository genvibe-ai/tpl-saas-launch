import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** id for the <h2>, referenced by the section's aria-labelledby. */
  id?: string;
  align?: "center" | "left";
  size?: "lg" | "md";
  className?: string;
  /** Extra content under the description (toggles, ratings, links). */
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "center",
  size = "lg",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cx(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cx(
          "font-display font-semibold tracking-[-0.03em] text-balance",
          size === "lg"
            ? "text-4xl leading-[1.02] sm:text-5xl lg:text-6xl"
            : "text-4xl leading-[1.05] sm:text-5xl",
        )}
      >
        {title}
      </h2>
      {description && <p className="max-w-2xl text-lg text-pretty text-muted">{description}</p>}
      {children}
    </Reveal>
  );
}
