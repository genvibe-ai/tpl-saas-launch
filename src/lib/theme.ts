import type { Site, Theme } from "../types";

const toKebab = (key: string) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

/**
 * Writes the colours from src/content.ts (theme.colors) to CSS variables
 * (--theme-canvas, --theme-accent, --theme-accent-fg, …). src/index.css maps
 * them to Tailwind colours, so changing content.ts recolours the whole site.
 */
export function applyTheme(theme: Theme, site: Site) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--theme-${toKebab(key)}`, value);
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.colors.canvas);
  document.title = site.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", site.description);
}
