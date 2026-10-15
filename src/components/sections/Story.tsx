import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { story } from "../../content";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

/** Team / company story band: large photo with gentle parallax beside the story copy. */
export function Story() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <Section id="story" rule={false} aria-labelledby="story-title" className="py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div ref={frameRef} className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-float">
            <motion.img
              src={story.image.src}
              alt={story.image.alt}
              width={story.image.width}
              height={story.image.height}
              loading="lazy"
              decoding="async"
              style={reduce ? undefined : { y: imageY, scale: 1.16 }}
              className="aspect-[4/3] w-full object-cover sm:aspect-[3/2]"
            />
            <div aria-hidden className="absolute inset-0 hidden bg-linear-to-t from-canvas/85 via-canvas/5 to-transparent sm:block" />
            <div className="relative border-t border-line px-5 py-4 sm:glass sm:absolute sm:bottom-6 sm:left-6 sm:max-w-sm sm:rounded-2xl">
              <p className="font-display text-lg font-semibold tracking-[-0.01em]">{story.caption.title}</p>
              <p className="text-sm text-muted">{story.caption.text}</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-5">
          <SectionHeading id="story-title" align="left" size="md" eyebrow={story.eyebrow} title={story.title} />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg text-pretty text-muted">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {story.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-xs font-medium tracking-[0.14em] text-faint uppercase">{fact.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={story.cta.href}
              className="group mt-10 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-accent transition-colors hover:text-fg"
            >
              {story.cta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
