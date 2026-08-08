"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
  /** Pixel distance the element travels in from. */
  distance?: number;
  delay?: number;
  duration?: number;
  /** Reveal children of this element with a stagger instead of the element itself. */
  stagger?: number;
  start?: string;
};

/**
 * Fades + lifts content into place once it scrolls near the viewport.
 * A single small utility used across sections instead of bespoke
 * ScrollTrigger boilerplate in every component. No-ops gracefully under
 * `prefers-reduced-motion` (gsap.matchMedia below just fades opacity).
 */
export function Reveal({
  children,
  className,
  as = "div",
  distance = 28,
  delay = 0,
  duration = 1,
  stagger,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = stagger ? gsap.utils.toArray(ref.current.children) : ref.current;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };

          gsap.set(targets, { opacity: 0, y: reduce ? 0 : distance });

          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: reduce ? 0.4 : duration,
            delay,
            ease: "power3.out",
            stagger: reduce ? 0 : stagger,
            scrollTrigger: {
              trigger: ref.current,
              start,
              toggleActions: "play none none reverse",
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  if (as === "ul") {
    return (
      <ul ref={ref as React.RefObject<HTMLUListElement>} className={cn(className)}>
        {children}
      </ul>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cn(className)}>
      {children}
    </div>
  );
}
