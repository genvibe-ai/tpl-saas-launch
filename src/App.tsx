import { MotionConfig } from "motion/react";
import { Faq } from "./components/sections/Faq";
import { Features } from "./components/sections/Features";
import { FinalCta } from "./components/sections/FinalCta";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { HowItWorks } from "./components/sections/HowItWorks";
import { LogoStrip } from "./components/sections/LogoStrip";
import { Metrics } from "./components/sections/Metrics";
import { Navbar } from "./components/sections/Navbar";
import { Pricing } from "./components/sections/Pricing";
import { Story } from "./components/sections/Story";
import { Testimonials } from "./components/sections/Testimonials";
import { Backdrop } from "./components/ui/Backdrop";

/**
 * Page layout. Sections render top-to-bottom in this order; reorder or remove them here.
 * All copy, links, prices, colours and image paths come from src/content.ts.
 */
export default function App() {
  return (
    // reducedMotion="user": people who ask their OS for less motion get fades, not movement.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-accent px-4 py-2 font-semibold text-accent-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Backdrop />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <LogoStrip />
        <Features />
        <HowItWorks />
        <Metrics />
        <Story />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
