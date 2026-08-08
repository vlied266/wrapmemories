"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { PRODUCT_STAGES } from "@/data/products";

export function ProductReveal() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const verbRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLParagraphElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

        PRODUCT_STAGES.forEach((_, i) => {
          if (i > 0) {
            gsap.set(imageRefs.current[i], { opacity: 0, scale: 0.92 });
            gsap.set(verbRefs.current[i], { opacity: 0, y: 16 });
          }
        });
        gsap.set(finalRef.current, { opacity: 0, y: 16 });
        gsap.set(progressRef.current, { scaleX: 0 });

        const stepUnits = 1.6;
        const holdUnits = 0.8;
        const totalUnits = holdUnits + (PRODUCT_STAGES.length - 1) * stepUnits + stepUnits;

        // Each stage "activates" (for the counter/progress label) at the
        // midpoint of its incoming crossfade, not a uniform fraction of
        // total scroll — the first hold and each 1-unit crossfade aren't
        // evenly spaced, so a linear estimate drifts out of sync by the
        // final stages.
        const activateAt = PRODUCT_STAGES.map((_, i) =>
          i === 0 ? 0 : holdUnits + (i - 1) * stepUnits + 0.5,
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=420%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const currentUnits = self.progress * totalUnits;
              let idx = 0;
              for (let i = 0; i < activateAt.length; i++) {
                if (currentUnits >= activateAt[i]) idx = i;
              }
              setActiveIndex((prev) => (prev === idx ? prev : idx));
            },
          },
        });

        tl.to(progressRef.current, { scaleX: 1, duration: totalUnits, ease: "none" }, 0);

        let cursor = holdUnits;
        PRODUCT_STAGES.forEach((_, i) => {
          if (i === 0) return;
          tl.to(imageRefs.current[i - 1], { opacity: 0, scale: 1.05, duration: 1 }, cursor)
            .to(imageRefs.current[i], { opacity: 1, scale: 1, duration: 1 }, "<")
            .to(verbRefs.current[i - 1], { opacity: 0, y: -16, duration: 0.6 }, "<")
            .to(verbRefs.current[i], { opacity: 1, y: 0, duration: 0.6 }, "<+0.2");
          cursor += stepUnits;
        });

        tl.to(verbRefs.current[PRODUCT_STAGES.length - 1], { opacity: 0, y: -16, duration: 0.5 }, cursor)
          .to(finalRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<+0.1");
      });

      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="product-reveal" className="relative bg-cream py-28 sm:py-36">
      <Container className="mb-14 text-center">
        <Eyebrow className="justify-center">The Collection</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
          Made to hold, wear and keep.
        </h2>
      </Container>

      {/* Desktop / motion-safe: pinned product sequence */}
      <div ref={pinRef} className="relative hidden h-[100svh] overflow-hidden md:motion-safe:block">
        <Container className="relative flex h-full flex-col items-center justify-center">
          <div className="relative aspect-square w-[320px] sm:w-[400px]">
            {PRODUCT_STAGES.map((stage, i) => (
              <div
                key={stage.key}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <Image src={stage.image} alt={stage.name} fill sizes="400px" className="object-contain" />
              </div>
            ))}
          </div>

          <div className="relative mt-6 h-20 w-full max-w-xl">
            {PRODUCT_STAGES.map((stage, i) => (
              <span
                key={stage.key}
                ref={(el) => {
                  verbRefs.current[i] = el;
                }}
                className="absolute inset-x-0 text-center font-display text-5xl sm:text-6xl"
                style={{ color: stage.color }}
              >
                {stage.verb}
              </span>
            ))}
            <p
              ref={finalRef}
              className="absolute inset-x-0 text-center font-display text-5xl text-coral sm:text-6xl"
            >
              Keep it.
            </p>
          </div>

          <div className="absolute bottom-14 flex flex-col items-center gap-3">
            <div className="h-px w-64 overflow-hidden bg-charcoal/10">
              <div ref={progressRef} className="h-full w-full origin-left bg-coral" />
            </div>
            <p className="text-xs tracking-[0.18em] text-charcoal/40" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(PRODUCT_STAGES.length).padStart(2, "0")} —{" "}
              {PRODUCT_STAGES[activeIndex].name}
            </p>
          </div>
        </Container>
      </div>

      {/* Mobile, tablet, and reduced-motion: simple vertical sequence */}
      <div className="block md:motion-safe:hidden">
        <Container className="flex flex-col gap-16">
          {PRODUCT_STAGES.map((stage) => (
            <Reveal key={stage.key} className="flex flex-col items-center text-center">
              <div className="relative aspect-square w-full max-w-[280px]">
                <Image src={stage.image} alt={stage.name} fill sizes="280px" className="object-contain" />
              </div>
              <span className="mt-4 font-display text-4xl" style={{ color: stage.color }}>
                {stage.verb}
              </span>
            </Reveal>
          ))}
          <Reveal className="text-center">
            <p className="font-display text-5xl text-coral">Keep it.</p>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
