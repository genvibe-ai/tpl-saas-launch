import { motion } from "motion/react";
import { howItWorks } from "../../content";
import { cx } from "../../lib/cx";
import { EASE_OUT, IN_VIEW, trackSpotlight } from "../../lib/motion";
import type { Step } from "../../types";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function HowItWorks() {
  const { steps } = howItWorks;
  return (
    <Section id="how-it-works" aria-labelledby="how-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          description={howItWorks.description}
        />

        <div className="relative mt-16 lg:mt-20">
          {/* Connector line that draws itself across the step markers (desktop) */}
          <div aria-hidden className="absolute top-6 right-[16.5%] left-[16.5%] hidden h-px bg-line lg:block">
            <motion.div
              className="h-full origin-left bg-linear-to-r from-accent via-secondary to-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.6, delay: 0.2, ease: EASE_OUT }}
            />
          </div>

          <ol className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <StepItem key={step.title} step={step} index={index} last={index === steps.length - 1} />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

function StepItem({ step, index, last }: { step: Step; index: number; last: boolean }) {
  const Icon = step.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.8, delay: 0.25 + index * 0.18, ease: EASE_OUT }}
      className="relative flex gap-4 sm:gap-6 lg:flex-col lg:items-center lg:gap-0"
    >
      {/* Step number + (mobile) vertical connector */}
      <div className="relative z-10 flex shrink-0 flex-col items-center">
        <span className="grid size-11 place-items-center rounded-full border border-accent/40 bg-canvas font-display text-sm font-semibold text-accent shadow-[0_0_0_6px_var(--theme-canvas),0_0_28px_-6px_var(--theme-accent)] lg:size-12 lg:text-base">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className={cx("mt-3 w-px flex-1 bg-linear-to-b from-accent/40 to-transparent lg:hidden", last && "invisible")}
        />
      </div>

      <div
        onPointerMove={trackSpotlight}
        className="spotlight edge-glow relative mb-2 flex-1 rounded-3xl border border-line bg-surface/60 p-6 transition-colors duration-500 hover:border-line-strong sm:p-7 lg:mt-8 lg:mb-0 lg:w-full"
      >
        <span className="grid size-11 place-items-center rounded-xl border border-line bg-fg/[0.04] text-fg">
          <Icon aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
        <p className="mt-3 text-pretty text-muted">{step.description}</p>
        <p className="mt-6 rounded-xl border border-line bg-canvas/80 px-3.5 py-2.5 font-mono text-xs leading-relaxed break-words text-secondary">
          {step.detail}
        </p>
      </div>
    </motion.li>
  );
}
