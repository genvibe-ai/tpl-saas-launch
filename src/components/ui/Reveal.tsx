import { motion, type HTMLMotionProps } from "motion/react";
import { EASE_OUT, IN_VIEW } from "../../lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds to wait before animating (use for staggering siblings). */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ delay = 0, y = 24, transition, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.8, delay, ease: EASE_OUT, ...transition }}
      {...props}
    />
  );
}
