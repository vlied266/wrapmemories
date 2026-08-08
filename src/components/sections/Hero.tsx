"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroParticles } from "@/components/three/HeroParticles";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const headlineARef = useRef<HTMLSpanElement | null>(null);
  const headlineBRef = useRef<HTMLSpanElement | null>(null);

  // Scroll-driven scene: headline swap + photo push toward the viewer.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        gsap.set(headlineBRef.current, { opacity: 0, y: reduceMotion ? 0 : 20 });

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: reduceMotion ? "+=1" : isDesktop ? "+=65%" : "+=55%",
            scrub: reduceMotion ? false : 0.6,
            pin: isDesktop && !reduceMotion,
          },
        })
          .to(headlineARef.current, { opacity: 0, y: reduceMotion ? 0 : -18, duration: 1 }, 0)
          .to(headlineBRef.current, { opacity: 1, y: 0, duration: 1 }, reduceMotion ? 0 : 0.04)
          .to(
            scaleRef.current,
            { scale: reduceMotion ? 1 : 1.1, y: reduceMotion ? 0 : -16, duration: 1 },
            0,
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Gentle mouse-based parallax on the floating card, desktop only.
  useGSAP(
    () => {
      const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
      if (!mq.matches || !tiltRef.current) return;

      const handleMove = (event: MouseEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        gsap.to(tiltRef.current, {
          rotateY: nx * 8,
          rotateX: -ny * 8,
          x: nx * 16,
          y: ny * 12,
          duration: 0.9,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-cream pb-16 pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 30%, rgba(111,167,162,0.16) 0%, transparent 70%), radial-gradient(45% 40% at 15% 75%, rgba(242,107,91,0.12) 0%, transparent 70%)",
        }}
      />

      <Container className="relative grid flex-1 grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
        <div className="relative z-10 order-2 md:order-1">
          <p className="mb-6 text-[0.8rem] font-medium tracking-[0.18em] text-charcoal/50">
            WRAP MEMORIES
          </p>

          <h1
            className="relative font-display text-[2.75rem] leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4.75rem]"
            aria-label="A memory worth keeping — a memory worth wrapping."
          >
            <span
              ref={headlineARef}
              aria-hidden
              className="block"
            >
              A memory worth <em className="font-normal not-italic text-coral">keeping.</em>
            </span>
            <span
              ref={headlineBRef}
              aria-hidden
              className="absolute inset-0 block"
            >
              A memory worth <em className="font-normal not-italic text-coral">wrapping.</em>
            </span>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-charcoal/70">
            Turn the people, pets and moments you love into something made just for them.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#personalization-studio" variant="primary">
              Create Your Gift
            </Button>
            <Button href="#how-it-works" variant="secondary">
              See How It Works
            </Button>
          </div>
        </div>

        <div className="relative order-1 flex justify-center md:order-2 md:justify-end" style={{ perspective: 1200 }}>
          <div className="pointer-events-none absolute -inset-16 hidden md:block">
            <HeroParticles />
          </div>
          <div ref={scaleRef} className="relative w-[78%] max-w-[380px] sm:w-[65%] md:w-full">
            <div ref={tiltRef} style={{ transformStyle: "preserve-3d" }}>
              <div className="relative -rotate-[4deg] rounded-[1.75rem] bg-cream p-3 shadow-[0_40px_80px_-30px_rgba(38,50,56,0.35)] ring-1 ring-charcoal/5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src="/images/photos/hero-memory.svg"
                    alt="A warm, personal photograph — placeholder for a real customer memory"
                    fill
                    priority
                    sizes="(min-width: 768px) 420px, 80vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1 pb-1">
                  <span className="font-display text-sm italic text-charcoal/60">Milo, age 3</span>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-coral" />
                </div>
              </div>
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 -z-10 h-full w-full rotate-[6deg] rounded-[1.75rem] bg-teal-soft/40"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="relative mt-16 hidden justify-center sm:flex">
        <span className="flex flex-col items-center gap-2 text-xs tracking-[0.2em] text-charcoal/40">
          SCROLL
          <span aria-hidden className="h-8 w-px animate-pulse bg-charcoal/30" />
        </span>
      </div>
    </section>
  );
}
