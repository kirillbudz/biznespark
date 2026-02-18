"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useAnimation,
  type Variant,
} from "motion/react";

/* ------------------------------------------------------------------ */
/*  FadeIn — fade + slide up, triggered when element enters viewport  */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

const directionOffsets = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  direction = "up",
  distance,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const offset = directionOffsets[direction];

  const actualDistance = distance ?? 1;
  const initialX = offset.x * actualDistance;
  const initialY = offset.y * actualDistance;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  StaggerChildren — staggered fade-in for lists of items            */
/* ------------------------------------------------------------------ */

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Single stagger item — use inside StaggerChildren */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CountUp — animated number counter                                 */
/* ------------------------------------------------------------------ */

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const numericMatch = value.match(/^([\d\s]+)/);
  const numericPart = numericMatch
    ? parseInt(numericMatch[1].replace(/\s/g, ""), 10)
    : 0;
  const suffix = numericMatch ? value.slice(numericMatch[0].length) : value;
  const hasNumeric = numericMatch && !isNaN(numericPart);

  useEffect(() => {
    if (!isInView || !hasNumeric) {
      if (!hasNumeric) setDisplay(value);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericPart);

      const formatted = numericPart >= 1000
        ? current.toLocaleString("ru-RU")
        : String(current);

      setDisplay(formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, numericPart, suffix, duration, hasNumeric, value]);

  return (
    <span ref={ref} className={className}>
      {isInView ? display : `0${suffix}`}
    </span>
  );
}
