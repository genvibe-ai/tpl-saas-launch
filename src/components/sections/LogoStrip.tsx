import { logoStrip } from "../../content";
import { cx } from "../../lib/cx";
import type { LogoWordmark } from "../../types";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

/** Type treatments that make plain-text wordmarks read like distinct brands. */
const wordmarkStyles: Record<LogoWordmark["style"], string> = {
  display: "font-display text-[1.35rem] font-bold tracking-[-0.04em]",
  wide: "text-[0.8rem] font-semibold tracking-[0.3em] uppercase",
  light: "font-display text-[1.4rem] font-light tracking-[-0.01em]",
  italic: "font-display text-[1.3rem] font-semibold tracking-[-0.03em] italic",
  mono: "font-mono text-base font-medium tracking-[-0.04em]",
  lower: "text-[1.3rem] font-bold tracking-[-0.045em] lowercase",
};

/** Infinite marquee of customer wordmarks. Pauses on hover; static for reduced motion. */
export function LogoStrip() {
  return (
    <Section aria-label="Customers" className="py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-medium text-muted">{logoStrip.title}</p>
        </Reveal>
      </Container>
      <div className="group fade-x relative mt-9 overflow-hidden motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          <LogoRow />
          <LogoRow duplicate />
        </div>
      </div>
    </Section>
  );
}

function LogoRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cx(
        "flex shrink-0 items-center",
        duplicate
          ? "motion-reduce:hidden"
          : "motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6",
      )}
    >
      {logoStrip.logos.map((logo) => (
        <li
          key={logo.name}
          className="flex items-center gap-2.5 px-7 text-fg/55 transition-colors duration-300 hover:text-fg sm:px-10"
        >
          <logo.icon aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
          <span className={cx("whitespace-nowrap", wordmarkStyles[logo.style])}>{logo.name}</span>
        </li>
      ))}
    </ul>
  );
}
