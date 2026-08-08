"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const CTA_OPTIONS = ["Someone I love", "My pet", "Myself"] as const;

function GiftBox({
  boxRef,
  lidRef,
  lidRibbonRef,
  bodyRibbonRef,
  bowRef,
  glowRef,
}: {
  boxRef: React.RefObject<HTMLDivElement | null>;
  lidRef: React.RefObject<HTMLDivElement | null>;
  lidRibbonRef: React.RefObject<HTMLDivElement | null>;
  bodyRibbonRef: React.RefObject<HTMLDivElement | null>;
  bowRef: React.RefObject<HTMLDivElement | null>;
  glowRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={boxRef}
      className="relative h-[240px] w-[280px] sm:h-[300px] sm:w-[340px]"
      style={{ perspective: 1000 }}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-x-6 bottom-4 top-14 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 35%, rgba(255,248,240,0.95) 0%, rgba(242,107,91,0.18) 55%, transparent 75%)",
        }}
      />

      {/* box body */}
      <div className="absolute inset-x-4 bottom-0 top-16 rounded-2xl bg-coral shadow-[0_40px_80px_-30px_rgba(38,50,56,0.4)] sm:top-20" />
      <div
        ref={bodyRibbonRef}
        aria-hidden
        className="absolute bottom-0 top-16 left-1/2 w-9 origin-top -translate-x-1/2 bg-cream sm:top-20"
      />

      {/* lid */}
      <div
        ref={lidRef}
        className="absolute inset-x-0 top-8 h-16 origin-bottom rounded-xl bg-[#e05846] shadow-md sm:top-10"
      >
        <div
          ref={lidRibbonRef}
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-9 origin-bottom -translate-x-1/2 bg-cream"
        />
      </div>

      {/* bow */}
      <div ref={bowRef} aria-hidden className="absolute left-1/2 top-9 -translate-x-1/2 sm:top-11">
        <svg width="76" height="46" viewBox="0 0 76 46" fill="none">
          <ellipse cx="20" cy="20" rx="18" ry="13" transform="rotate(-18 20 20)" fill="var(--color-cream)" />
          <ellipse cx="56" cy="20" rx="18" ry="13" transform="rotate(18 56 20)" fill="var(--color-cream)" />
          <path d="M30 22 L38 34 L28 44 Z" fill="var(--color-cream)" />
          <path d="M46 22 L38 34 L48 44 Z" fill="var(--color-cream)" />
          <circle cx="38" cy="22" r="9" fill="var(--color-coral)" />
        </svg>
      </div>
    </div>
  );
}

export function FinalCTA() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const lidRef = useRef<HTMLDivElement | null>(null);
  const lidRibbonRef = useRef<HTMLDivElement | null>(null);
  const bodyRibbonRef = useRef<HTMLDivElement | null>(null);
  const bowRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        if (!isDesktop || reduceMotion) return;

        gsap.set(glowRef.current, { opacity: 0, scale: 0.85 });
        gsap.set([headlineRef.current, ctaRef.current, taglineRef.current], { opacity: 0, y: 20 });

        // Everything the pin choreographs — the box AND the text that
        // follows it — lives inside the single pinned container. Keeping
        // the reveal text in normal document flow (outside the pin) was
        // the earlier bug: the pin only fixes the box in place, so
        // unrelated flow content keeps scrolling underneath it and
        // visually collides with the still-pinned box.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top top",
              end: "+=220%",
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
            },
          })
          .to(bowRef.current, { y: -50, rotate: -20, scale: 0.5, opacity: 0, duration: 1 }, 0)
          .to(lidRibbonRef.current, { scaleY: 0, duration: 0.8 }, 0.1)
          .to(bodyRibbonRef.current, { scaleY: 0, duration: 0.8 }, 0.2)
          .to(lidRef.current, { rotateX: -70, y: -6, duration: 1.2 }, 0.3)
          .to(glowRef.current, { opacity: 1, scale: 1, duration: 1 }, 0.5)
          .to(headlineRef.current, { opacity: 1, y: 0, duration: 1 }, 1.3)
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 1 }, 1.9)
          .to(taglineRef.current, { opacity: 1, y: 0, duration: 1 }, 2.5);
      });

      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="final-cta" className="relative overflow-hidden bg-cream">
      {/* Desktop / motion-safe: pinned unwrap-and-reveal scene */}
      <div
        ref={pinRef}
        className="relative hidden min-h-[100svh] flex-col items-center justify-center px-6 py-28 text-center md:motion-safe:flex"
      >
        <GiftBox
          boxRef={boxRef}
          lidRef={lidRef}
          lidRibbonRef={lidRibbonRef}
          bodyRibbonRef={bodyRibbonRef}
          bowRef={bowRef}
          glowRef={glowRef}
        />

        <h2 ref={headlineRef} className="mt-16 max-w-xl font-display text-4xl leading-tight text-balance sm:text-5xl">
          Who are you making this for?
        </h2>

        <div ref={ctaRef} className="mt-9 flex flex-wrap justify-center gap-4">
          {CTA_OPTIONS.map((label, i) => (
            <Button key={label} variant={i === 0 ? "primary" : "secondary"} href="#personalization-studio">
              {label}
            </Button>
          ))}
        </div>

        <p ref={taglineRef} className="mt-20 font-display text-2xl italic text-charcoal/60 sm:text-3xl">
          Your story. Creatively wrapped.
        </p>
      </div>

      {/* Mobile, tablet, and reduced-motion: simple static composition */}
      <div className="block px-6 py-28 text-center md:motion-safe:hidden">
        <Container className="flex flex-col items-center">
          <Reveal>
            <div className="relative h-[220px] w-[260px]" style={{ perspective: 1000 }}>
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-4 top-14 rounded-[2rem]"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 35%, rgba(255,248,240,0.95) 0%, rgba(242,107,91,0.18) 55%, transparent 75%)",
                }}
              />
              <div className="absolute inset-x-4 bottom-0 top-14 rounded-2xl bg-coral shadow-[0_40px_80px_-30px_rgba(38,50,56,0.4)]" />
              <div
                aria-hidden
                className="absolute inset-x-0 top-6 h-14 -translate-y-3 rounded-xl bg-[#e05846] shadow-md"
                style={{ transform: "rotateX(-70deg)" }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 max-w-xl">
            <h2 className="font-display text-4xl leading-tight text-balance">Who are you making this for?</h2>
          </Reveal>

          <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-4">
            {CTA_OPTIONS.map((label, i) => (
              <Button key={label} variant={i === 0 ? "primary" : "secondary"} href="#personalization-studio">
                {label}
              </Button>
            ))}
          </Reveal>

          <Reveal delay={0.3} className="mt-16">
            <p className="font-display text-2xl italic text-charcoal/60">Your story. Creatively wrapped.</p>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
