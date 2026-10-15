# Askfield SaaS template — project memory

Premium dark landing page for a fictional AI analytics copilot ("Askfield"). Built to be rebranded:
almost every change starts in `src/content.ts`. Stack: Vite 8, React 19, TypeScript, Tailwind CSS 4
(@tailwindcss/vite), motion (`motion/react`), lucide-react, Fontsource fonts. No backend, no env vars.
Commands: `yarn dev` · `yarn build` · `yarn preview` · `yarn typecheck`.

## File map
- `src/content.ts` — ALL copy, nav, pricing, FAQ, colours (`theme.colors`), image paths + alt text (`images`), hero video URL.
- `src/types.ts` — shapes of everything in content.ts (add a field here first, then use it).
- `src/App.tsx` — section order; wraps the page in `<MotionConfig reducedMotion="user">`.
- `src/main.tsx` — font imports + `applyTheme()` (writes theme colours to CSS variables, sets title/description).
- `src/index.css` — Tailwind tokens mapped to `--theme-*` vars, fonts, utilities (glass, bg-grid, fade-*, spotlight, edge-glow, grain).
- `src/components/sections/*` — one file per section. `src/components/ui/*` — Button, Section, SectionHeading, Reveal, CountUp, Logo…
- `src/lib/motion.ts` — `EASE_OUT`, `IN_VIEW` (reveal settings), `trackSpotlight`. `src/hooks/*` — active-section + scrolled state.
- `public/images/*.webp` — all images. `public/favicon.svg` — brand mark (hard-coded lime/navy; recolour when rebranding).
- `index.html` — static `<title>`/description/OG tags for SEO; keep in sync with `site` in content.ts.

## Design tokens
- Colours (content.ts → `theme.colors`): canvas #070B16 (ink navy), surface #0C1324, raised #141D33, fg #EEF2F8,
  muted #A1ABC2, faint #7A85A0, accent #C6F432 (electric lime), accentFg #0B1003, secondary #7DD3FC (soft cyan).
- Tailwind names: `bg-canvas bg-surface bg-raised text-fg text-muted text-faint bg-accent text-accent text-accent-fg
  text-secondary border-line border-line-strong`; opacity works (`bg-accent/10`). Shadows: `shadow-glow`, `shadow-float`.
- Fonts: display `font-display` = Bricolage Grotesque (headings, numbers); body = Instrument Sans. Change both in
  `src/main.tsx` (Fontsource import) and `src/index.css` (`--font-display`, `--font-sans`).
- Shape: pill buttons (`rounded-full`), cards `rounded-[1.75rem]` with `border-line`, container `max-w-7xl`.
- Motion: one hero moment (word rise + underline draw, 3D swing-up + scan, floating cards), `Reveal`/`whileInView`
  once for everything else, spring pills (`layoutId`) for nav + billing toggle, count-up metrics, CSS marquee.

## Sections (top → bottom, `id` = nav anchor)
Navbar (fixed glass pill) → Hero `#top` (background video) → LogoStrip (marquee) → Features `#features` →
HowItWorks `#how-it-works` → Metrics (count-up band) → Story `#story` → Testimonials `#customers` →
Pricing `#pricing` (monthly/yearly) → Faq `#faq` → FinalCta → Footer.

## How to rebrand
1. Name, tagline, copy, nav, pricing, FAQ, testimonials, footer: edit the objects in `src/content.ts`.
2. Colours: edit `theme.colors` (keep `faint` ≥ 4.5:1 contrast on `canvas`; `accentFg` must read on `accent`).
3. Images: replace files in `public/images/` keeping names (WebP), or change paths in `images` and update
   alt + width/height. Sizes now: hero 1600×1067, features 1200×1200, team 1200×800, avatars 320×320.
4. Video: `hero.video.src`; `hero-poster.webp` should be the video's first frame.
5. Mirror title/description in `index.html`; recolour `public/favicon.svg`; optional logo image via `site.logo.src`.
6. Logo strip names are fictional text wordmarks (`logoStrip.logos`, styles: display/wide/light/italic/mono/lower).

## Rules
- Keep content in `content.ts` — never hard-code copy, prices, links or colours in components.
- Keep the video pattern: `<video autoPlay muted loop playsInline preload="metadata" poster=…>`, dark overlay, pause button,
  reduced-motion users get the poster `<img>` only (no video download).
- Images: WebP in `public/images`, always width/height, `loading="lazy"` below the fold (hero image stays eager).
- Keep `MotionConfig reducedMotion="user"`; new scroll reveals use `Reveal` or `whileInView` with `viewport={IN_VIEW}`.
- Use the token utilities (not raw hex) so the palette stays editable from content.ts.
- No Next.js, no server code, no env vars. Run `yarn typecheck && yarn build` after edits.
