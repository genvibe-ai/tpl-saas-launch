import { metrics } from "../../content";
import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";

/** Full-bleed band of headline numbers that count up on scroll. */
export function Metrics() {
  return (
    <section aria-labelledby="metrics-title" className="relative overflow-hidden border-y border-line bg-surface/80">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid fade-radial absolute inset-0 opacity-80" />
        <div className="absolute top-full left-1/2 h-[26rem] w-[56rem] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.14] blur-[100px]" />
      </div>

      <Container className="relative py-20 sm:py-24">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{metrics.eyebrow}</Eyebrow>
          <h2
            id="metrics-title"
            className="max-w-2xl font-display text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-4xl"
          >
            {metrics.title}
          </h2>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-line">
          {metrics.items.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.08}
              className="flex flex-col-reverse items-center justify-end gap-3 px-2 text-center sm:px-6"
            >
              <dt className="max-w-[15rem] text-sm text-balance text-muted">{item.label}</dt>
              <dd className="font-display text-5xl leading-none font-semibold tracking-[-0.04em] text-fg sm:text-6xl xl:text-7xl">
                <CountUp value={item.value} decimals={item.decimals} prefix={item.prefix} suffix={item.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
