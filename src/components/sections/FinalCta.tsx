import { ArrowRight } from "lucide-react";
import { finalCta } from "../../content";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function FinalCta() {
  return (
    <Section aria-labelledby="cta-title" className="py-24 sm:py-32">
      <Container>
        <Reveal className="group relative isolate overflow-hidden rounded-[2.25rem] border border-line bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid fade-radial absolute inset-0" />
            <div className="absolute inset-0 translate-y-6 bg-[radial-gradient(55%_60%_at_50%_100%,color-mix(in_oklab,var(--theme-accent)_24%,transparent),transparent_72%)] transition-transform duration-1000 ease-out-expo group-hover:translate-y-0 motion-reduce:transition-none" />
            <div className="absolute inset-x-[20%] bottom-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent" />
            <div className="absolute -top-28 -right-20 size-80 rounded-full bg-secondary/15 blur-[90px]" />
          </div>

          <Eyebrow>{finalCta.eyebrow}</Eyebrow>
          <h2
            id="cta-title"
            className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.75rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance"
          >
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted">{finalCta.description}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={finalCta.primaryCta.href} size="lg" icon={ArrowRight}>
              {finalCta.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={finalCta.secondaryCta.href} size="lg" variant="secondary">
              {finalCta.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-faint">{finalCta.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
