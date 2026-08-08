"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SparkleField = dynamic(() => import("./SparkleField"), { ssr: false });

/**
 * Gates the hero's ambient sparkle field to desktop viewports with no
 * reduced-motion preference — unmounted (not just hidden) everywhere else
 * so mobile never pays for the WebGL canvas.
 */
export function HeroParticles() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  if (isMobile || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <SparkleField />
    </div>
  );
}
