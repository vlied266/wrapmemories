"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const NAV_OFFSET = 88;

function scrollToHash(hash: string, lenis: Lenis | null) {
  const id = hash.replace("#", "");
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;

  // Pinned ScrollTrigger sections (e.g. the transformation story) insert
  // spacer height once they mount, which can shift anchor targets below
  // where the browser jumped natively on load. Refreshing first ensures
  // every pin spacer is already accounted for.
  ScrollTrigger.refresh();

  if (lenis) {
    lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 1.2 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/**
 * Drives buttery smooth scrolling on desktop via Lenis, keeping GSAP's
 * ScrollTrigger perfectly in sync every frame. Falls back to plain native
 * scrolling on touch devices (avoids scroll-jacking on mobile) and when
 * the user prefers reduced motion.
 *
 * Also owns in-page anchor navigation (nav links, hero CTAs, a fresh page
 * load carrying a `#hash`) so jumps always land on the real section instead
 * of inside a pinned scrollytelling section whose spacer hasn't been
 * measured yet.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion || isMobile) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    // Deep link on initial load: wait a tick for layout + pins to settle.
    if (window.location.hash) {
      const raf = requestAnimationFrame(() => {
        setTimeout(() => scrollToHash(window.location.hash, lenisRef.current), 60);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      event.preventDefault();
      history.pushState(null, "", href);
      scrollToHash(href, lenisRef.current);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
