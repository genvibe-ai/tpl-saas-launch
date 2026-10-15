import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { features } from "../../content";
import { EASE_OUT, IN_VIEW, trackSpotlight } from "../../lib/motion";
import type { Feature } from "../../types";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function Features() {
  return (
    <Section id="features" aria-labelledby="features-title" className="py-24 sm:py-32">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <SectionHeading id="features-title" align="left" eyebrow={features.eyebrow} title={features.title} />
          <Reveal delay={0.1} className="flex flex-col items-start gap-6 lg:pb-2">
            <p className="text-lg text-pretty text-muted">{features.description}</p>
            <a
              href={features.link.href}
              className="group inline-flex items-center gap-2 rounded-full text-sm font-semibold text-fg transition-colors hover:text-accent"
            >
              {features.link.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {features.items.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function FeatureCard({ item, index }: { item: Feature; index: number }) {
  const Icon = item.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_OUT }}
      className="flex"
    >
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        onPointerMove={trackSpotlight}
        className="spotlight edge-glow group relative flex w-full flex-col rounded-[1.75rem] border border-line bg-surface/70 p-2 transition-[border-color,background-color] duration-500 hover:border-line-strong hover:bg-surface"
      >
        <div className="relative overflow-hidden rounded-[1.35rem] border border-line bg-canvas">
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
            decoding="async"
            className="aspect-[6/5] w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/80 via-transparent to-transparent" />
          <span className="glass absolute top-3 left-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-fg/90">
            <span className="font-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
            {item.tag}
          </span>
        </div>

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
              <Icon aria-hidden className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="font-display text-2xl leading-tight font-semibold tracking-[-0.02em]">{item.title}</h3>
          </div>
          <p className="mt-4 mb-6 flex-1 text-pretty text-muted">{item.description}</p>
          <ul className="space-y-2.5 border-t border-line pt-5 text-sm">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2.5 text-fg/85">
                <Check aria-hidden className="size-4 shrink-0 text-accent" strokeWidth={2.5} />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </motion.li>
  );
}
