import { ArrowRight, MessagesSquare, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";
import { faq } from "../../content";
import { cx } from "../../lib/cx";
import { EASE_OUT } from "../../lib/motion";
import type { FaqItem } from "../../types";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="faq-title"
              align="left"
              size="md"
              eyebrow={faq.eyebrow}
              title={faq.title}
              description={faq.description}
            />
            <Reveal delay={0.15} className="glass edge-glow relative mt-10 rounded-3xl p-6 sm:p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-accent/[0.12] text-accent">
                <MessagesSquare aria-hidden className="size-5" />
              </span>
              <p className="mt-5 font-display text-xl font-semibold tracking-[-0.01em]">{faq.contact.title}</p>
              <p className="mt-2 text-sm text-muted">{faq.contact.text}</p>
              <ButtonLink href={faq.contact.cta.href} variant="secondary" size="sm" icon={ArrowRight} className="mt-6">
                {faq.contact.cta.label}
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.05} className="lg:col-span-7">
          <div className="border-t border-line">
            {faq.items.map((item, index) => (
              <FaqRow
                key={item.question}
                item={item}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const id = useId();
  const buttonId = `${id}-question`;
  const panelId = `${id}-answer`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium tracking-[-0.01em] transition-colors hover:text-accent sm:text-xl"
        >
          <span>{item.question}</span>
          <span
            aria-hidden
            className={cx(
              "grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 motion-reduce:transition-none",
              open
                ? "rotate-45 border-accent bg-accent text-accent-fg"
                : "border-line-strong text-fg group-hover:border-accent/60",
            )}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      {/* Answers stay in the DOM (good for SEO); hidden ones are inert. */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pr-10 pb-7 text-pretty text-muted">{item.answer}</p>
      </motion.div>
    </div>
  );
}
