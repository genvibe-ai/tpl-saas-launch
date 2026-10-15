import type { ComponentProps } from "react";
import { cx } from "../../lib/cx";

/** Centred page column (max 1280px) with responsive side padding. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}
