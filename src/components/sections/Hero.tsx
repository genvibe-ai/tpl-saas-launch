import { ArrowRight, Check, Pause, Play, Sparkles, TrendingUp } from "lucide-react";
import {
  motion,
  stagger,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { hero } from "../../content";
import { EASE_OUT } from "../../lib/motion";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/Container";

/*
 * HERO — the signature moment:
 *   1. headline words rise out of a mask, the accent word gets a hand-drawn underline
 *   2. the product render swings up from a 3D tilt while a light scan sweeps across it
 *   3. two insight cards float in; the "Ask" card types its question
 * Background: full-bleed looping video with a dark overlay. Users who prefer reduced
 * motion get the poster image only (no video download) and no tilt/parallax.
 */

const HEADLINE_START = 0.2; // seconds before the first word appears
const WORD_STAGGER = 0.075; // seconds between words

const headlineVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(WORD_STAGGER, { startDelay: HEADLINE_START }) } },
};

const wordVariants: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 1, ease: EASE_OUT } },
};

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <HeroBackground />
      <Container className="relative">
        <HeroCopy />
        <HeroVisual />
      </Container>
    </section>
  );
}

/* ── Copy ────────────────────────────────────────────────────────── */

function HeroCopy() {
  const words = hero.headline.lead.split(" ").filter(Boolean);
  const afterHeadline = HEADLINE_START + WORD_STAGGER * (words.length + 1) + 0.3;

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <motion.a
        href={hero.badge.href}
        {...rise(0.05)}
        className="group glass inline-flex max-w-full items-center gap-2.5 rounded-full py-1 pr-3.5 pl-1 text-sm text-fg/90 transition-colors hover:border-line-strong"
      >
        <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-fg">
          {hero.badge.tag}
        </span>
        <span className="truncate">{hero.badge.label}</span>
        <ArrowRight
          aria-hidden
          className="size-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
        />
      </motion.a>

      <motion.h1
        id="hero-title"
        initial="hidden"
        animate="show"
        variants={headlineVariants}
        className="mt-7 font-display text-[clamp(2.6rem,8.4vw,6.25rem)] leading-[0.95] font-semibold tracking-[-0.03em]"
      >
        <span className="sr-only">
          {hero.headline.lead} {hero.headline.highlight}
        </span>
        <span aria-hidden>
          {words.map((text, index) => (
            <span key={`${text}-${index}`}>
              <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span variants={wordVariants} className="inline-block">
                  {text}
                </motion.span>
              </span>{" "}
            </span>
          ))}
          {hero.headline.highlight && (
            // On tablet/desktop the highlighted word always gets its own line.
            <span className="sm:block">
              <span className="relative inline-block">
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span variants={wordVariants} className="inline-block text-accent">
                    {hero.headline.highlight}
                  </motion.span>
                </span>
                <svg
                  viewBox="0 0 320 18"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-[0.02em] left-[3%] h-[0.2em] w-[94%] overflow-visible text-accent"
                >
                  <motion.path
                    d="M3 13C60 6.5 128 3.5 192 5c46 1.1 87 3.9 125 8.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { delay: HEADLINE_START + WORD_STAGGER * words.length + 0.55, duration: 1, ease: EASE_OUT },
                      opacity: { delay: HEADLINE_START + WORD_STAGGER * words.length + 0.55, duration: 0.2 },
                    }}
                  />
                </svg>
              </span>
            </span>
          )}
        </span>
      </motion.h1>

      <motion.p
        {...rise(afterHeadline)}
        className="mt-7 max-w-2xl text-lg text-pretty text-fg/75 sm:text-xl"
      >
        {hero.subheadline}
      </motion.p>

      <motion.div
        {...rise(afterHeadline + 0.1)}
        className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
      >
        <ButtonLink href={hero.primaryCta.href} size="lg" icon={ArrowRight}>
          {hero.primaryCta.label}
        </ButtonLink>
        <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary" leadingIcon={Play}>
          {hero.secondaryCta.label}
        </ButtonLink>
      </motion.div>

      <motion.ul
        {...rise(afterHeadline + 0.2)}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg/70"
      >
        {hero.trust.map((item) => (
          <li key={item} className="inline-flex items-center gap-2">
            <Check aria-hidden className="size-4 text-accent" strokeWidth={2.5} />
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ── Background video ────────────────────────────────────────────── */

function HeroBackground() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);

  // Play only while the hero is on screen (saves battery) and the user hasn't paused it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !paused) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [paused, reduce]);

  return (
    <>
      <div aria-hidden className="absolute inset-0 -z-10">
        {reduce ? (
          <img
            src={hero.poster.src}
            alt=""
            width={hero.poster.width}
            height={hero.poster.height}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.poster.src}
          >
            <source src={hero.video.src} type={hero.video.type} onError={() => setFailed(true)} />
          </video>
        )}

        {/* Legibility: dark overlay, vignette and a fade into the page colour */}
        <div className="absolute inset-0 bg-canvas/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_10%,transparent_45%,var(--theme-canvas)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-canvas/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent to-canvas" />

        {/* Texture and brand glow */}
        <div className="bg-grid fade-radial absolute inset-0 opacity-50" />
        <div className="absolute top-[60%] left-1/2 h-[16rem] w-[85%] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[90px] sm:top-[52%] sm:h-[34rem] sm:w-[64rem] sm:max-w-[160%] sm:bg-accent/[0.11] sm:blur-[120px]" />
        <div className="absolute -top-40 -right-40 size-[34rem] rounded-full bg-secondary/[0.09] blur-[120px]" />
      </div>

      {!reduce && !failed && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? hero.videoControls.play : hero.videoControls.pause}
          aria-pressed={paused}
          className="glass absolute right-4 bottom-5 z-20 grid size-10 place-items-center rounded-full text-fg/80 transition-colors hover:text-fg sm:right-8 sm:bottom-8"
        >
          {paused ? <Play className="size-4 fill-current" /> : <Pause className="size-4 fill-current" />}
        </button>
      )}
    </>
  );
}

/* ── Product visual with tilt, parallax and floating cards ───────── */

function HeroVisual() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll: the render straightens and lifts; cards drift at different speeds (parallax).
  const tilt = useTransform(scrollY, [0, 600], [8, 0]);
  const lift = useTransform(scrollY, [0, 600], [0, -40]);
  const statY = useTransform(scrollY, [0, 600], [0, -70]);
  const askY = useTransform(scrollY, [0, 600], [0, -120]);

  // Pointer: subtle tilt towards the cursor (mouse only).
  const pointerX = useSpring(0, { stiffness: 140, damping: 20, mass: 0.6 });
  const pointerY = useSpring(0, { stiffness: 140, damping: 20, mass: 0.6 });
  const rotateX = useTransform(() => tilt.get() + pointerY.get());
  const rotateY = useTransform(() => pointerX.get());

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
    pointerY.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
  }

  function onPointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const { statCard, askCard, image } = hero;

  return (
    <div
      className="relative mx-auto mt-14 max-w-6xl sm:mt-20"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div style={reduce ? undefined : { y: lift }}>
        <motion.div
          initial={{ opacity: 0, y: 70, rotateX: 26, scale: 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.75, duration: 1.5, ease: EASE_OUT }}
          style={{ transformPerspective: 1600 }}
        >
          <motion.div
            className="relative"
            style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1600 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              fetchPriority="high"
              className="fade-edges block h-auto w-full select-none"
              draggable={false}
            />
            {!reduce && (
              <div aria-hidden className="fade-edges pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/3 border-b border-accent/70 bg-linear-to-b from-transparent via-accent/[0.06] to-accent/25 mix-blend-plus-lighter"
                  initial={{ y: "-100%" }}
                  animate={{ y: "300%" }}
                  transition={{ delay: 1.7, duration: 1.9, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating insight cards (decorative) */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: statY }}
        className="absolute top-[14%] -left-2 z-10 hidden w-56 md:block lg:-left-6 xl:-left-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -24, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.9, ease: EASE_OUT }}
          className="glass rounded-2xl p-4 shadow-float"
        >
          <div className="flex items-center justify-between text-xs font-medium text-muted">
            <span>{statCard.label}</span>
            <span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent">
              <TrendingUp className="size-3.5" />
            </span>
          </div>
          <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-fg">{statCard.value}</p>
          <Sparkline delay={2.2} />
          <p className="mt-2 text-xs text-faint">{statCard.note}</p>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: askY }}
        className="absolute -right-2 bottom-[12%] z-10 hidden w-72 md:block lg:-right-6 xl:-right-12"
      >
        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 2.05, duration: 0.9, ease: EASE_OUT }}
          className="glass rounded-2xl p-4 shadow-float"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-fg">
              <Sparkles className="size-3.5" />
            </span>
            {askCard.label}
          </div>
          <p className="mt-3 text-[0.95rem] leading-snug font-medium text-fg">
            <TypedText text={askCard.question} delay={2.45} />
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.45 + askCard.question.length * 0.028 + 0.25, duration: 0.5 }}
            className="mt-3 flex items-center gap-2 text-xs font-medium text-secondary"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-secondary" />
            </span>
            {askCard.answer}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Reveals text one character at a time, like someone typing. */
function TypedText({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.028, { startDelay: delay }) } } }}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }}
        >
          {char}
        </motion.span>
      ))}
      <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] animate-blink bg-accent" />
    </motion.span>
  );
}

/** Small decorative trend line for the stat card. */
function Sparkline({ delay }: { delay: number }) {
  const line =
    "M0 38C14 36 22 30 34 31s20-9 34-8 20 7 34 4 20-13 34-12 20 7 34 2 20-11 30-12";
  return (
    <svg viewBox="0 0 200 48" preserveAspectRatio="none" className="mt-3 h-10 w-full overflow-visible">
      <defs>
        <linearGradient id="sparkline-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${line}V48H0Z`}
        fill="url(#sparkline-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6, duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--theme-accent)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 1.2, ease: EASE_OUT }}
      />
    </svg>
  );
}
