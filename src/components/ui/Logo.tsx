import { site } from "../../content";
import { cx } from "../../lib/cx";

/** Brand mark + name. Set site.logo.src in content.ts to use an image instead of the built-in mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      {site.logo.src ? (
        <img src={site.logo.src} alt="" width={32} height={32} className="h-8 w-auto" />
      ) : (
        <LogoMark className="size-8" />
      )}
      <span className="font-display text-xl leading-none font-semibold tracking-[-0.03em] text-fg">{site.name}</span>
    </span>
  );
}

/** Abstract "spark" mark drawn in the theme accent colour. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="9" fill="var(--theme-accent)" />
      <path
        d="M15 6.5c.85 4.5 3.1 6.75 7.5 7.6-4.4.85-6.65 3.1-7.5 7.6-.85-4.5-3.1-6.75-7.5-7.6 4.4-.85 6.65-3.1 7.5-7.6Z"
        fill="var(--theme-accent-fg)"
      />
      <circle cx="23.4" cy="23.4" r="2.3" fill="var(--theme-accent-fg)" />
    </svg>
  );
}
