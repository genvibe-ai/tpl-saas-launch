import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

/** Small all-caps label above section titles. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        "inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-accent uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-[2px] bg-accent shadow-[0_0_12px_var(--theme-accent)]" />
      {children}
    </p>
  );
}
