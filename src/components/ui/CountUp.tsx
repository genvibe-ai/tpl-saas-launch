import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "../../lib/motion";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/** Number that counts up from 0 the first time it scrolls into view. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  const format = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals]);

  return (
    <span className="inline-flex items-baseline">
      <span className="sr-only">{`${prefix}${format(value)}${suffix}`}</span>
      <span aria-hidden className="inline-flex items-baseline">
        {prefix && <span className="whitespace-pre text-accent">{prefix}</span>}
        {/* The invisible copy reserves the final width so nothing shifts while counting. */}
        <span className="relative tabular-nums">
          <span className="invisible">{format(value)}</span>
          <span ref={ref} className="absolute inset-0">
            {format(0)}
          </span>
        </span>
        {suffix && <span className="whitespace-pre text-accent">{suffix}</span>}
      </span>
    </span>
  );
}
