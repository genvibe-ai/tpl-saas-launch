import { ArrowRight, Check, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { pricing } from "../../content";
import { cx } from "../../lib/cx";
import { EASE_OUT, IN_VIEW, trackSpotlight } from "../../lib/motion";
import type { BillingPeriod, Plan } from "../../types";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

const PERIODS: BillingPeriod[] = ["monthly", "yearly"];

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <Section id="pricing" aria-labelledby="pricing-title" className="py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-32 h-[44rem] bg-[radial-gradient(ellipse_50%_45%_at_50%_45%,color-mix(in_oklab,var(--theme-accent)_9%,transparent),transparent_70%)]"
      />
      <Container className="relative">
        <SectionHeading
          id="pricing-title"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          description={pricing.description}
        >
          <BillingToggle period={period} onChange={setPeriod} />
        </SectionHeading>

        <ul className="mx-auto mt-14 grid max-w-md gap-6 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-5">
          {pricing.plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} period={period} index={index} />
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-faint">{pricing.footnote}</p>
      </Container>
    </Section>
  );
}

function BillingToggle({ period, onChange }: { period: BillingPeriod; onChange: (p: BillingPeriod) => void }) {
  return (
    <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row">
      <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-line bg-surface/80 p-1">
        {PERIODS.map((option) => {
          const selected = option === period;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={cx(
                "relative h-10 rounded-full px-5 text-sm font-semibold transition-colors duration-300",
                selected ? "text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-accent shadow-glow"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{pricing.billing[option]}</span>
            </button>
          );
        })}
      </div>
      <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
        {pricing.billing.yearlyBadge}
      </span>
    </div>
  );
}

function PlanCard({ plan, period, index }: { plan: Plan; period: BillingPeriod; index: number }) {
  const price = plan.price ? plan.price[period] : null;
  const featured = Boolean(plan.featured);

  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_OUT }}
      className="flex"
    >
      <article
        onPointerMove={trackSpotlight}
        className={cx(
          "spotlight relative flex w-full flex-col rounded-[1.75rem] border p-7 transition-colors duration-500 sm:p-8",
          featured
            ? "edge-glow-accent border-accent/45 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--theme-accent)_10%,var(--theme-surface))_0%,var(--theme-surface)_50%)] shadow-[0_40px_90px_-45px_color-mix(in_oklab,var(--theme-accent)_60%,transparent)]"
            : "edge-glow border-line bg-surface/60 hover:border-line-strong",
        )}
      >
        {plan.badge && (
          <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg shadow-glow">
            <Sparkles aria-hidden className="size-3.5" />
            {plan.badge}
          </span>
        )}

        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
        <p className="mt-2 min-h-12 text-sm text-pretty text-muted">{plan.description}</p>

        <div className="mt-7 flex items-end gap-3">
          <p className="flex items-start font-display text-6xl leading-none font-semibold tracking-[-0.045em]">
            {price === null ? (
              <span>{plan.priceLabel ?? "Custom"}</span>
            ) : (
              <>
                <span className="mt-1 mr-0.5 text-3xl text-muted">{pricing.currency}</span>
                <AnimatedPrice value={price} />
              </>
            )}
          </p>
          <p className="max-w-[6.5rem] pb-1 text-sm leading-tight text-muted">{plan.unit}</p>
        </div>
        <p className="mt-3 h-5 text-xs text-faint">
          {price !== null && price > 0 ? pricing.billing.notes[period] : " "}
        </p>

        <ButtonLink
          href={plan.cta.href}
          variant={featured ? "primary" : "secondary"}
          icon={ArrowRight}
          className="mt-6 w-full"
        >
          {plan.cta.label}
        </ButtonLink>

        <div className="mt-8 border-t border-line pt-7">
          <p className="text-sm font-semibold text-fg">{plan.featuresTitle}</p>
          <ul className="mt-4 space-y-3 text-sm">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-fg/85">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </motion.li>
  );
}

/** Price that slides/blur-swaps when the billing period changes. */
function AnimatedPrice({ value }: { value: number }) {
  return (
    <span className="relative inline-flex tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "45%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-45%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
