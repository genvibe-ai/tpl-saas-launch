/**
 * Shapes for everything in src/content.ts.
 * Edit content.ts, not this file — unless you are adding a brand-new field.
 */
import type { LucideIcon } from "lucide-react";

export type Link = {
  label: string;
  /** "#pricing" scrolls to a section; "/path" or "https://…" navigates. */
  href: string;
};

export type ImageAsset = {
  /** Path under /public, e.g. "/images/saas-hero.webp" (keep images as WebP). */
  src: string;
  /** Describe what the image shows. Use "" only for purely decorative images. */
  alt: string;
  /** Intrinsic pixel size of the file — prevents layout shift. */
  width: number;
  height: number;
};

export type VideoAsset = {
  src: string;
  type: string;
};

export type Site = {
  name: string;
  legalName: string;
  /** Browser tab title (also mirror it in index.html for SEO). */
  title: string;
  /** Meta description (also mirror it in index.html for SEO). */
  description: string;
  contactEmail: string;
  /** Optional logo image. Leave src "" to use the built-in spark mark. */
  logo: { src: string; alt: string };
};

export type ThemeColors = {
  /** Page background. */
  canvas: string;
  /** Cards, bands and panels. */
  surface: string;
  /** Elevated / hovered surfaces. */
  raised: string;
  /** Primary text. */
  fg: string;
  /** Secondary text. */
  muted: string;
  /** Tertiary text and captions (keep ≥ 4.5:1 contrast on canvas). */
  faint: string;
  /** Brand accent: primary buttons, highlights, focus rings. */
  accent: string;
  /** Text and icons placed on top of the accent colour. */
  accentFg: string;
  /** Secondary accent: charts, glints, small details. */
  secondary: string;
};

export type Theme = { colors: ThemeColors };

export type Navigation = {
  links: Link[];
  signIn: Link;
  cta: Link;
};

export type Hero = {
  badge: { tag: string; label: string; href: string };
  /** `highlight` is drawn in the accent colour with an animated underline. */
  headline: { lead: string; highlight: string };
  subheadline: string;
  primaryCta: Link;
  secondaryCta: Link;
  trust: string[];
  video: VideoAsset;
  poster: ImageAsset;
  image: ImageAsset;
  statCard: { label: string; value: string; note: string };
  askCard: { label: string; question: string; answer: string };
  videoControls: { pause: string; play: string };
};

export type LogoWordmark = {
  name: string;
  icon: LucideIcon;
  /** Visual treatment so the text wordmarks feel like distinct brands. */
  style: "display" | "wide" | "light" | "italic" | "mono" | "lower";
};

export type LogoStrip = {
  title: string;
  logos: LogoWordmark[];
};

export type Feature = {
  tag: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  image: ImageAsset;
};

export type Features = {
  eyebrow: string;
  title: string;
  description: string;
  link: Link;
  items: Feature[];
};

export type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Short monospace line shown under the step, like a log entry. */
  detail: string;
};

export type HowItWorks = {
  eyebrow: string;
  title: string;
  description: string;
  steps: Step[];
};

export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Metrics = {
  eyebrow: string;
  title: string;
  items: Metric[];
};

export type Story = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  facts: { value: string; label: string }[];
  cta: Link;
  image: ImageAsset;
  caption: { title: string; text: string };
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: ImageAsset;
  /** Short result shown as a chip, e.g. "−6 hrs/week". */
  highlight: string;
};

export type Testimonials = {
  eyebrow: string;
  title: string;
  description: string;
  rating: string;
  items: Testimonial[];
};

export type BillingPeriod = "monthly" | "yearly";

export type Plan = {
  name: string;
  description: string;
  /** Price per period, or null for "Custom"/contact-sales plans. */
  price: Record<BillingPeriod, number> | null;
  /** Shown instead of a number when price is null, e.g. "Custom". */
  priceLabel?: string;
  /** Small text next to the price, e.g. "per seat / month". */
  unit: string;
  cta: Link;
  /** Highlights the plan (accent border + badge). Use on one plan. */
  featured?: boolean;
  badge?: string;
  featuresTitle: string;
  features: string[];
};

export type Pricing = {
  eyebrow: string;
  title: string;
  description: string;
  currency: string;
  billing: {
    monthly: string;
    yearly: string;
    yearlyBadge: string;
    /** Note under paid prices for each billing period. */
    notes: Record<BillingPeriod, string>;
  };
  plans: Plan[];
  footnote: string;
};

export type FaqItem = { question: string; answer: string };

export type Faq = {
  eyebrow: string;
  title: string;
  description: string;
  contact: { title: string; text: string; cta: Link };
  items: FaqItem[];
};

export type FinalCta = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: Link;
  secondaryCta: Link;
  note: string;
};

export type Footer = {
  tagline: string;
  status: string;
  columns: { title: string; links: Link[] }[];
  legal: Link[];
  socials: (Link & { icon: LucideIcon })[];
};
