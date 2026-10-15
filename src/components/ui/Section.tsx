import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { cx } from "../../lib/cx";

type SectionProps = ComponentProps<"section"> & {
  /** Full-width hairline on top, with "+" marks where it crosses the page rails. */
  rule?: boolean;
};

/** Page section wrapper. Give it an `id` to make it a nav anchor (e.g. id="pricing"). */
export function Section({ rule = true, className, children, ...props }: SectionProps) {
  return (
    <section className={cx("relative", className)} {...props}>
      {rule && <SectionRule />}
      {children}
    </section>
  );
}

function SectionRule() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10">
      <div className="h-px bg-line" />
      <div className="relative mx-auto hidden max-w-7xl min-[1340px]:block">
        <Plus className="absolute -top-[7.5px] -left-[7.5px] size-3.5 text-faint" strokeWidth={1.5} />
        <Plus className="absolute -top-[7.5px] -right-[7.5px] size-3.5 text-faint" strokeWidth={1.5} />
      </div>
    </div>
  );
}
