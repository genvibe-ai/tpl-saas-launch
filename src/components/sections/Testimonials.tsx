import { Star } from "lucide-react";
import { motion } from "motion/react";
import { testimonials } from "../../content";
import { cx } from "../../lib/cx";
import { EASE_OUT, IN_VIEW, trackSpotlight } from "../../lib/motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function Testimonials() {
  return (
    <Section id="customers" aria-labelledby="customers-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="customers-title"
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          description={testimonials.description}
        >
          <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-fg/80">
            <span className="flex gap-0.5 text-accent" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-current" strokeWidth={0} />
              ))}
            </span>
            {testimonials.rating}
          </p>
        </SectionHeading>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:items-start">
          {testimonials.items.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={IN_VIEW}
              transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_OUT }}
              className={cx(index === 1 && "lg:mt-12", index === 2 && "md:col-span-2 lg:col-span-1 lg:mt-6")}
            >
              <figure
                onPointerMove={trackSpotlight}
                className="spotlight edge-glow relative flex h-full flex-col rounded-[1.75rem] border border-line bg-surface/70 p-7 transition-colors duration-500 hover:border-line-strong sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <QuoteMark />
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {item.highlight}
                  </span>
                </div>
                <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-pretty text-fg/90">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                  <img
                    src={item.avatar.src}
                    alt={item.avatar.alt}
                    width={item.avatar.width}
                    height={item.avatar.height}
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 rounded-full object-cover ring-1 ring-line-strong"
                  />
                  <div>
                    <p className="font-semibold text-fg">{item.name}</p>
                    <p className="text-sm text-muted">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Solid opening quote mark in the accent colour. */
function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" aria-hidden className="h-6 w-8 shrink-0 text-accent">
      <path
        fill="currentColor"
        d="M0 24V14.4C0 6.6 4.2 1.8 12.2 0l1.5 3.7C9.3 5 7.3 7.6 7 11.2h5.8V24H0Zm18 0V14.4C18 6.6 22.2 1.8 30.2 0l1.5 3.7C27.3 5 25.3 7.6 25 11.2h5.8V24H18Z"
      />
    </svg>
  );
}
