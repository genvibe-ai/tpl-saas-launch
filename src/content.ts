/**
 * ────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — the single source of truth for this template.
 *
 *  Brand name, copy, navigation, pricing, FAQ, colours and every image
 *  path live in this file. Components only read from it, so you can
 *  rebrand the whole site by editing the objects below (keep the shapes;
 *  they are typed in src/types.ts).
 *
 *  Order: site → theme → images → nav → hero → logos → features →
 *         howItWorks → metrics → story → testimonials → pricing → faq →
 *         finalCta → footer
 * ────────────────────────────────────────────────────────────────────
 */
import {
  BellRing,
  Boxes,
  Compass,
  Diamond,
  Feather,
  Hexagon,
  Leaf,
  Mail,
  MessageSquareText,
  MessagesSquare,
  Orbit,
  Plug,
  Rss,
  Sparkles,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import type {
  Faq,
  Features,
  FinalCta,
  Footer,
  Hero,
  HowItWorks,
  ImageAsset,
  LogoStrip,
  Metrics,
  Navigation,
  Pricing,
  Site,
  Story,
  Testimonials,
  Theme,
} from "./types";

/* ── Brand ───────────────────────────────────────────────────────── */

export const site: Site = {
  name: "Kairo",
  legalName: "Kairo Labs, Inc.",
  title: "Kairo — Ask your product data anything",
  description:
    "Kairo is the AI analytics copilot for product teams. Ask questions in plain English and get the chart, the root cause and the next move in seconds.",
  contactEmail: "hello@kairo.example",
  logo: { src: "", alt: "Kairo" },
};

/* ── Colours (applied as CSS variables at startup) ──────────────────
 * Tailwind names: bg-canvas, bg-surface, bg-raised, text-fg, text-muted,
 * text-faint, bg-accent / text-accent, text-accent-fg, text-secondary.
 */
export const theme: Theme = {
  colors: {
    canvas: "#070B16", // ink navy page background
    surface: "#0C1324", // cards and bands
    raised: "#141D33", // elevated / hovered surfaces
    fg: "#EEF2F8", // off-white text
    muted: "#A1ABC2", // secondary text
    faint: "#7A85A0", // captions (≥ 4.5:1 on canvas)
    accent: "#C6F432", // electric lime
    accentFg: "#0B1003", // text on lime
    secondary: "#7DD3FC", // soft cyan
  },
};

/* ── Images (all files live in public/images, WebP) ──────────────── */

export const images = {
  heroPoster: {
    src: "/images/hero-poster.webp",
    alt: "",
    width: 1280,
    height: 720,
  },
  hero: {
    src: "/images/saas-hero.webp",
    alt: "Kairo analytics workspace with activation trends, funnels and forecast charts",
    width: 1600,
    height: 1067,
  },
  featureInsights: {
    src: "/images/saas-feature-insights.webp",
    alt: "Layers of glass panels revealing a glowing network of connected data points",
    width: 1200,
    height: 1200,
  },
  featureAutomation: {
    src: "/images/saas-feature-automation.webp",
    alt: "Glass gears turning inside orbiting rings, lit from within",
    width: 1200,
    height: 1200,
  },
  featureCollab: {
    src: "/images/saas-feature-collab.webp",
    alt: "Three glowing spheres linked by streams of light",
    width: 1200,
    height: 1200,
  },
  team: {
    src: "/images/saas-team.webp",
    alt: "Four Kairo teammates gathered around a laptop in a sunlit studio",
    width: 1200,
    height: 800,
  },
  avatar1: {
    src: "/images/saas-avatar-1.webp",
    alt: "Portrait of Maya Okafor",
    width: 320,
    height: 320,
  },
  avatar2: {
    src: "/images/saas-avatar-2.webp",
    alt: "Portrait of Daniel Reyes",
    width: 320,
    height: 320,
  },
  avatar3: {
    src: "/images/saas-avatar-3.webp",
    alt: "Portrait of Priya Nair",
    width: 320,
    height: 320,
  },
} satisfies Record<string, ImageAsset>;

/* ── Navigation ──────────────────────────────────────────────────── */

export const nav: Navigation = {
  links: [
    { label: "Product", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Customers", href: "#customers" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  signIn: { label: "Sign in", href: "#" },
  cta: { label: "Start free", href: "#pricing" },
};

/* ── Hero ────────────────────────────────────────────────────────── */

export const hero: Hero = {
  badge: {
    tag: "New",
    label: "Kairo 2.0 — forecasts that explain themselves",
    href: "#features",
  },
  headline: { lead: "Ask your product data", highlight: "anything." },
  subheadline:
    "Kairo is the AI analytics copilot for product teams. Ask in plain English and get the chart, the root cause and the next move — in seconds, not sprints.",
  primaryCta: { label: "Start free trial", href: "#pricing" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  trust: ["14-day free trial", "No credit card", "SOC 2 Type II"],
  // Background video: keep the poster image in sync with the first frame.
  video: { src: "https://genvibe.pro/tpl-media/saas/hero.mp4", type: "video/mp4" },
  poster: images.heroPoster,
  image: images.hero,
  statCard: { label: "Activation rate", value: "+12.4%", note: "vs. previous 30 days" },
  askCard: {
    label: "Ask Kairo",
    question: "Why did trial-to-paid dip in March?",
    answer: "2 root causes found · 3.8s",
  },
  videoControls: { pause: "Pause background video", play: "Play background video" },
};

/* ── Logo strip (fictional wordmarks rendered as text) ───────────── */

export const logoStrip: LogoStrip = {
  title: "Product teams at 2,400+ companies ask Kairo first",
  logos: [
    { name: "Quillstack", icon: Feather, style: "display" },
    { name: "ORBITFOLD", icon: Orbit, style: "wide" },
    { name: "fernwave", icon: Waves, style: "lower" },
    { name: "Tidalcraft", icon: Hexagon, style: "italic" },
    { name: "meridian/9", icon: Compass, style: "mono" },
    { name: "Polyhaus", icon: Boxes, style: "display" },
    { name: "Lumenrock", icon: Diamond, style: "light" },
    { name: "COBALT & PINE", icon: Leaf, style: "wide" },
  ],
};

/* ── Features ────────────────────────────────────────────────────── */

export const features: Features = {
  eyebrow: "Product",
  title: "Everything an analyst does, in the time it takes to ask.",
  description:
    "Kairo connects to your product data, learns your metrics and answers like your sharpest analyst — with the receipts to prove it.",
  link: { label: "See how it works", href: "#how-it-works" },
  items: [
    {
      tag: "Insights",
      icon: Sparkles,
      title: "Answers, not dashboards",
      description:
        "Ask why retention dipped and get the chart, the segment that moved it and the release that caused it — in one reply.",
      bullets: ["Plain-English questions", "Root-cause breakdowns", "Every query shown and editable"],
      image: images.featureInsights,
    },
    {
      tag: "Automation",
      icon: BellRing,
      title: "Alerts that think ahead",
      description:
        "Kairo watches every metric overnight and flags anomalies before stand-up, with a draft explanation already attached.",
      bullets: ["Anomaly detection on every metric", "Weekly digests, written for you", "Thresholds that learn seasonality"],
      image: images.featureAutomation,
    },
    {
      tag: "Collaboration",
      icon: Users,
      title: "Insights the whole team trusts",
      description:
        "Share living answers that update as data lands. Comment, fork a question and keep every decision next to its evidence.",
      bullets: ["Shared workspaces", "Comments and @mentions", "Answers that stay live"],
      image: images.featureCollab,
    },
  ],
};

/* ── How it works ────────────────────────────────────────────────── */

export const howItWorks: HowItWorks = {
  eyebrow: "How it works",
  title: "From question to decision in three steps",
  description: "No tickets, no SQL, no waiting for the next sprint.",
  steps: [
    {
      icon: Plug,
      title: "Connect your data",
      description:
        "Point Kairo at your warehouse or event stream. It maps tables, events and metrics automatically — usually in under five minutes.",
      detail: "✓ events_prod connected · 214 tables mapped",
    },
    {
      icon: MessageSquareText,
      title: "Ask in plain English",
      description:
        "Type a question the way you’d ask an analyst. Kairo writes the query, checks the result and shows its reasoning.",
      detail: "> why did trial→paid drop in March?",
    },
    {
      icon: Zap,
      title: "Act on the answer",
      description:
        "Pin the chart, set an alert or share it with your team. Every answer stays live as new data arrives.",
      detail: "⚡ alert sent to #growth · chart pinned",
    },
  ],
};

/* ── Metrics band (numbers count up when scrolled into view) ─────── */

export const metrics: Metrics = {
  eyebrow: "By the numbers",
  title: "Teams move faster when answers are instant",
  items: [
    { value: 12, suffix: "M+", label: "questions answered for product teams" },
    { value: 3.4, decimals: 1, suffix: "×", label: "faster from question to decision" },
    { value: 94, suffix: "%", label: "match with senior analysts on audited queries" },
    { value: 5, suffix: " min", label: "median time from sign-up to first answer" },
  ],
};

/* ── Story / team band ───────────────────────────────────────────── */

export const story: Story = {
  eyebrow: "Our story",
  title: "Built by analysts who were tired of being the bottleneck.",
  paragraphs: [
    "Kairo began in 2023, when our founders — a data lead and a product manager — counted 140 ad-hoc data requests in a single quarter. Most were the same five questions, asked a little differently.",
    "So we built the analyst we wished we had: one that knows your metrics, explains its reasoning and never says “I’ll get back to you next sprint.”",
  ],
  facts: [
    { value: "2023", label: "Founded" },
    { value: "38", label: "Teammates" },
    { value: "11", label: "Countries" },
  ],
  cta: { label: "We’re hiring — see open roles", href: "#" },
  image: images.team,
  caption: { title: "The Kairo team", text: "Remote-first, with hubs in Lisbon and Toronto" },
};

/* ── Testimonials ────────────────────────────────────────────────── */

export const testimonials: Testimonials = {
  eyebrow: "Customers",
  title: "Loved by teams who hate waiting on data",
  description: "Product, growth and data teams use Kairo to answer their own questions — and trust what they find.",
  rating: "Rated 4.9/5 by 600+ product teams",
  items: [
    {
      quote:
        "We replaced three dashboards and a weekly metrics meeting with one Kairo thread. Our PMs finally answer their own questions.",
      name: "Maya Okafor",
      role: "Head of Product",
      company: "Quillstack",
      avatar: images.avatar1,
      highlight: "−6 hrs/week of ad-hoc requests",
    },
    {
      quote:
        "An anomaly alert caught a broken sign-up flow on a Saturday morning. Kairo paid for itself before Monday.",
      name: "Daniel Reyes",
      role: "VP Engineering",
      company: "Orbitfold",
      avatar: images.avatar2,
      highlight: "Incident caught in 14 min",
    },
    {
      quote:
        "It shows its SQL and its reasoning, so our data team actually trusts it. That was the deal-breaker with every other tool.",
      name: "Priya Nair",
      role: "Data Lead",
      company: "Fernwave",
      avatar: images.avatar3,
      highlight: "94% answer accuracy",
    },
  ],
};

/* ── Pricing ─────────────────────────────────────────────────────── */

export const pricing: Pricing = {
  eyebrow: "Pricing",
  title: "Simple pricing that scales with your questions",
  description: "Start free. Upgrade when Kairo becomes part of every decision.",
  currency: "$",
  billing: {
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyBadge: "Save 20%",
    notes: { monthly: "billed monthly", yearly: "billed yearly" },
  },
  plans: [
    {
      name: "Starter",
      description: "For small teams exploring their product data.",
      price: { monthly: 0, yearly: 0 },
      unit: "free forever",
      cta: { label: "Start free", href: "#" },
      featuresTitle: "Includes",
      features: ["Up to 3 seats", "500 questions / month", "1 data source", "7-day query history", "Community support"],
    },
    {
      name: "Growth",
      description: "For product teams that ship and measure every week.",
      price: { monthly: 49, yearly: 39 },
      unit: "per seat / month",
      cta: { label: "Start 14-day trial", href: "#" },
      featured: true,
      badge: "Most popular",
      featuresTitle: "Everything in Starter, plus",
      features: [
        "Unlimited questions",
        "10 data sources",
        "Anomaly alerts & weekly digests",
        "Shared workspaces",
        "Priority support",
      ],
    },
    {
      name: "Scale",
      description: "For organisations with advanced security and scale needs.",
      price: null,
      priceLabel: "Custom",
      unit: "annual contract",
      cta: { label: "Talk to sales", href: "#" },
      featuresTitle: "Everything in Growth, plus",
      features: [
        "SSO & SCIM provisioning",
        "Audit logs & data residency",
        "Custom metrics layer",
        "Dedicated success manager",
        "99.9% uptime SLA",
      ],
    },
  ],
  footnote: "Prices in USD. Taxes may apply. Cancel anytime.",
};

/* ── FAQ ─────────────────────────────────────────────────────────── */

export const faq: Faq = {
  eyebrow: "FAQ",
  title: "Questions, answered",
  description: "Everything you need to know before your first question.",
  contact: {
    title: "Still curious?",
    text: "Talk to a human — we usually reply within a few hours.",
    cta: { label: "Email the team", href: "mailto:hello@kairo.example" },
  },
  items: [
    {
      question: "What data sources does Kairo connect to?",
      answer:
        "Kairo connects to every major cloud data warehouse and event-streaming pipeline, plus relational databases and CSV uploads. Most teams ask their first question within five minutes of signing up.",
    },
    {
      question: "How accurate are Kairo’s answers?",
      answer:
        "Every answer shows the query it ran and the reasoning behind it, so you can check the work. On audited customer questions Kairo matches a senior analyst 94% of the time — and it tells you when it isn’t sure.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. Kairo is SOC 2 Type II audited, encrypts data in transit and at rest, and never trains models on your data. Scale plans add SSO, SCIM and regional data residency.",
    },
    {
      question: "Do I need to know SQL?",
      answer:
        "Not at all — ask in plain English. If you do speak SQL, you can open, edit and save any query Kairo writes. It’s your code, not a black box.",
    },
    {
      question: "Can I change plans or cancel anytime?",
      answer:
        "Yes. Upgrade, downgrade or cancel in two clicks. Yearly plans are refunded pro-rata within the first 30 days.",
    },
    {
      question: "What happens when my free trial ends?",
      answer:
        "You move to the free Starter plan automatically. Nothing is charged unless you choose a paid plan.",
    },
  ],
};

/* ── Final call to action ────────────────────────────────────────── */

export const finalCta: FinalCta = {
  eyebrow: "Get started",
  title: "Your next answer is one question away.",
  description:
    "Connect your data in five minutes and ask your first question free. No credit card. No sales call.",
  primaryCta: { label: "Start free trial", href: "#pricing" },
  secondaryCta: { label: "Book a demo", href: "#" },
  note: "Free for 14 days · Cancel anytime",
};

/* ── Footer ──────────────────────────────────────────────────────── */

export const footer: Footer = {
  tagline: "The AI analytics copilot for product teams. Ask anything, decide faster.",
  status: "All systems normal",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Customers", href: "#customers" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Security", href: "#" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
  socials: [
    { label: "Email us", href: "mailto:hello@kairo.example", icon: Mail },
    { label: "Community", href: "#", icon: MessagesSquare },
    { label: "Blog feed", href: "#", icon: Rss },
  ],
};
