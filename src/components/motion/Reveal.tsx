"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * The single reveal-on-scroll behaviour used across the site:
 * opacity + 12px translate, 400ms, runs once. Disabled entirely when the
 * visitor prefers reduced motion. Uses IntersectionObserver (no scroll-linked JS).
 */
export default function Reveal({ children, delay = 0, duration = 0.4, className = "" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
