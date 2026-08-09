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
  const heroCompositionRef = useRef<HTMLDivElement | null>(null);
  const mainPhotoRef = useRef<HTMLDivElement | null>(null);
  const secondaryPhotoRef = useRef<HTMLDivElement | null>(null);
  const tertiaryPhotoRef = useRef<HTMLDivElement | null>(null);
  const headlineARef = useRef<HTMLSpanElement | null>(null);
  const headlineBRef = useRef<HTMLSpanElement | null>(null);
  const headlineContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll-driven cinematic scene: multi-layered depth, headline mask reveal, parallax
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        if (reduceMotion) {
          gsap.set(headlineBRef.current, { opacity: 0 });
          return;
        }

        // Initialize layers
        gsap.set(mainPhotoRef.current, { opacity: 1, scale: 1, y: 0 });
        gsap.set(secondaryPhotoRef.current, { opacity: 0.5, scale: 1, y: 0 });
        gsap.set(tertiaryPhotoRef.current, { opacity: 0.3, scale: 1, y: 0 });
        gsap.set(headlineBRef.current, { opacity: 0, y: 12 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isDesktop ? "+=70%" : "+=60%",
            scrub: 0.8,
            pin: isDesktop,
          },
        });

        // Headline: fade and letter-tracking shift
        timeline
          .to(headlineARef.current, { opacity: 0, y: -12, duration: 0.8, ease: "power2.inOut" }, 0)
          .to(
            headlineContainerRef.current,
            { letterSpacing: "0.08em", duration: 0.8, ease: "power2.inOut" },
            0,
          )
          .to(headlineBRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" }, "<");

        // Multi-layer parallax depth effect
        timeline
          .to(mainPhotoRef.current, { scale: 1.08, y: -20, duration: 1, ease: "power2.inOut" }, 0)
          .to(secondaryPhotoRef.current, { y: -12, opacity: 0.6, duration: 1, ease: "power2.inOut" }, 0)
          .to(tertiaryPhotoRef.current, { y: -8, opacity: 0.4, duration: 1, ease: "power2.inOut" }, 0);

        // Composition moves toward viewer (camera push effect)
        if (isDesktop) {
          timeline.to(heroCompositionRef.current, { z: 40, duration: 1, ease: "power3.out" }, 0);
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Gentle mouse-based parallax on the memory composition, desktop only.
  useGSAP(
    () => {
      const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
      if (!mq.matches || !heroCompositionRef.current) return;

      const handleMove = (event: MouseEvent) => {
        const nx = (event.clientX / window.innerWidth - 0.5) * 2;
        const ny = (event.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(heroCompositionRef.current, {
          x: nx * 12,
          y: ny * 10,
          duration: 0.9,
          ease: "power2.out",
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
      {/* Atmospheric background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 30%, rgba(111,167,162,0.12) 0%, transparent 70%), radial-gradient(45% 40% at 15% 75%, rgba(242,107,91,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Subtle vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      <Container className="relative grid flex-1 grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
        <div className="relative z-10 order-2 md:order-1">
          <p className="mb-6 text-[0.8rem] font-medium tracking-[0.18em] text-charcoal/50">
            WRAP MEMORIES
          </p>

          <div ref={headlineContainerRef} className="overflow-hidden">
            <h1
              className="relative font-display text-[2.75rem] leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4.75rem] transition-[letter-spacing]"
              aria-label="A memory worth keeping — a memory worth wrapping."
            >
              <span ref={headlineARef} aria-hidden className="block">
                A memory worth <em className="font-normal not-italic text-coral">keeping.</em>
              </span>
              <span ref={headlineBRef} aria-hidden className="absolute inset-0 block">
                A memory worth <em className="font-normal not-italic text-coral">wrapping.</em>
              </span>
            </h1>
          </div>

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

        {/* Premium memory composition with layered depth */}
        <div className="relative order-1 flex justify-center md:order-2 md:justify-end" style={{ perspective: 1200 }}>
          <div className="pointer-events-none absolute -inset-16 hidden md:block">
            <HeroParticles />
          </div>

          <div
            ref={heroCompositionRef}
            className="relative w-full"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(0)",
            }}
          >
            {/* Tertiary memory object (far background) */}
            <div
              ref={tertiaryPhotoRef}
              className="absolute -right-8 top-12 w-[45%] max-w-[160px] sm:top-16 md:-right-6 md:top-8"
              style={{
                transform: "rotate(8deg)",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream shadow-[0_20px_40px_-20px_rgba(38,50,56,0.2)] ring-1 ring-charcoal/10">
                <Image
                  src="/images/photos/couple.svg"
                  alt="Background memory object"
                  fill
                  sizes="160px"
                  className="object-cover opacity-60"
                />
              </div>
            </div>

            {/* Secondary memory object (mid background) */}
            <div
              ref={secondaryPhotoRef}
              className="absolute -left-6 -top-2 w-[50%] max-w-[180px] sm:w-[48%] md:-left-12 md:-top-8"
              style={{
                transform: "rotate(-6deg)",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream shadow-[0_30px_60px_-24px_rgba(38,50,56,0.25)] ring-1 ring-charcoal/10">
                <Image
                  src="/images/photos/family.svg"
                  alt="Secondary memory object"
                  fill
                  sizes="180px"
                  className="object-cover opacity-70"
                />
              </div>
            </div>

            {/* Primary memory object (prominent foreground) */}
            <div ref={mainPhotoRef} className="relative mx-auto w-[72%] max-w-[340px] sm:w-[60%]">
              <div className="relative -rotate-2 rounded-3xl bg-cream p-4 shadow-[0_50px_100px_-35px_rgba(38,50,56,0.4)] ring-1 ring-charcoal/5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/photos/hero-memory.svg"
                    alt="A warm, personal photograph — placeholder for a real customer memory"
                    fill
                    priority
                    sizes="(min-width: 768px) 340px, 80vw"
                    className="object-cover"
                  />
                </div>
                {/* Photo metadata card */}
                <div className="mt-4 flex items-center justify-between px-2 pb-1">
                  <span className="font-display text-sm italic text-charcoal/60">Milo, age 3</span>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-coral" />
                </div>
              </div>
              {/* Soft shadow base */}
              <div
                aria-hidden
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-8 w-[90%] rounded-full bg-charcoal/5 blur-xl"
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
