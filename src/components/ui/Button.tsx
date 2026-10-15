import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cx } from "../../lib/cx";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Icon after the label (nudges right on hover). */
  icon?: LucideIcon;
  /** Icon before the label. */
  leadingIcon?: LucideIcon;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap tracking-[-0.01em] select-none transition-[background-color,border-color,box-shadow,color,filter,transform] duration-300 ease-out active:scale-[0.97] motion-reduce:active:scale-100";

const variants = {
  primary: "bg-accent text-accent-fg shadow-glow hover:shadow-glow-lg hover:brightness-[1.06]",
  secondary: "glass text-fg hover:border-line-strong hover:bg-raised/70",
  ghost: "text-muted hover:text-fg",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem] sm:h-[3.25rem] sm:px-7",
};

/** Link styled as a button. Use for every call to action. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  icon: Icon,
  leadingIcon: LeadingIcon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cx(base, variants[variant], sizes[size], className)} {...props}>
      {LeadingIcon && (
        <span
          aria-hidden
          className={cx(
            "-ml-1.5 grid size-7 place-items-center rounded-full",
            variant === "primary" ? "bg-accent-fg/10" : "bg-fg/10",
          )}
        >
          <LeadingIcon className="size-3.5 fill-current" />
        </span>
      )}
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5"
        />
      )}
    </a>
  );
}
