import type { PointerEvent } from "react";

/** House easing: fast start, long soft landing. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Shared settings for scroll reveals (whileInView): animate once, a bit before fully in view. */
export const IN_VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Moves the `spotlight` glow (see index.css) to follow the cursor. Use as onPointerMove. */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}
