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

        // Initialize product stages with sophisticated entry state
        PRODUCT_STAGES.forEach((_, i) => {
          if (i > 0) {
            gsap.set(imageRefs.current[i], { opacity: 0, scale: 0.94, y: 20 });
            gsap.set(verbRefs.current[i], { opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
          } else {
            gsap.set(imageRefs.current[i], { opacity: 1, scale: 1 });
            gsap.set(verbRefs.current[i], {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            });
          }
        });
        gsap.set(finalRef.current, { opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
        gsap.set(progressRef.current, { scaleX: 0 });

        const stepUnits = 1.8;
        const holdUnits = 1;
        const totalUnits = holdUnits + (PRODUCT_STAGES.length - 1) * stepUnits + stepUnits;

        const activateAt = PRODUCT_STAGES.map((_, i) =>
          i === 0 ? 0 : holdUnits + (i - 1) * stepUnits + 0.6,
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=450%",
            scrub: 1.2,
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
        PRODUCT_STAGES.forEach((stage, i) => {
          if (i === 0) return;

          // Exit previous product and verb
          tl.to(
            imageRefs.current[i - 1],
            { opacity: 0, scale: 1.06, y: 16, duration: 1.1, ease: "power2.inOut" },
            cursor,
          );
          tl.to(
            verbRefs.current[i - 1],
            {
              opacity: 0,
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
              duration: 0.7,
              ease: "power2.in",
            },
            cursor,
          );

          // Enter new product and verb
          tl.to(
            imageRefs.current[i],
            { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" },
            cursor,
          );
          tl.to(
            verbRefs.current[i],
            {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 0.8,
              ease: "power3.out",
            },
            cursor + 0.3,
          );

          cursor += stepUnits;
        });

        // Final "Keep it" reveal
        tl.to(
          verbRefs.current[PRODUCT_STAGES.length - 1],
          {
            opacity: 0,
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 0.6,
            ease: "power2.in",
          },
          cursor,
        );
        tl.to(
          finalRef.current,
          {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.9,
            ease: "power3.out",
          },
          cursor + 0.2,
        );
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

      {/* Desktop / motion-safe: pinned premium product sequence */}
      <div ref={pinRef} className="relative hidden h-[100svh] overflow-hidden md:motion-safe:block">
        <Container className="relative flex h-full flex-col items-center justify-center">
          {/* Premium product composition with editorial asymmetry */}
          <div className="relative w-full max-w-5xl">
            <div className="relative flex items-center justify-between gap-8 lg:gap-12">
              {/* Product image area (35-50% visual weight) */}
              <div
                className="relative aspect-[3/4] w-[45%] flex-shrink-0 sm:w-[42%]"
                style={{
                  perspective: 1200,
                }}
              >
                <div className="relative h-full w-full">
                  {PRODUCT_STAGES.map((stage, i) => (
                    <div
                      key={stage.key}
                      ref={(el) => {
                        imageRefs.current[i] = el;
                      }}
                      className="absolute inset-0"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <Image
                        src={stage.image}
                        alt={stage.name}
                        fill
                        sizes="(min-width: 1024px) 380px, 200px"
                        className="object-contain drop-shadow-[0_30px_60px_rgba(38,50,56,0.12)]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Text/verb area (intentionally spaced) */}
              <div className="flex-1">
                <div className="relative h-24 w-full overflow-hidden">
                  {PRODUCT_STAGES.map((stage, i) => (
                    <span
                      key={stage.key}
                      ref={(el) => {
                        verbRefs.current[i] = el;
                      }}
                      className="absolute left-0 top-0 font-display text-5xl leading-tight sm:text-6xl lg:text-7xl"
                      style={{
                        color: stage.color,
                        clipPath: i === 0 ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)",
                      }}
                    >
                      {stage.verb}
                    </span>
                  ))}
                  <p
                    ref={finalRef}
                    className="absolute left-0 top-0 font-display text-5xl leading-tight text-coral sm:text-6xl lg:text-7xl"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                    }}
                  >
                    Keep it.
                  </p>
                </div>

                {/* Product info + progress indicator */}
                <div className="mt-8 flex items-center justify-between border-t border-charcoal/10 pt-6">
                  <div>
                    <p className="text-xs tracking-[0.18em] text-charcoal/50" aria-live="polite">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(PRODUCT_STAGES.length).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-sm italic text-charcoal/70">
                      {PRODUCT_STAGES[activeIndex].name}
                    </p>
                  </div>
                  <div className="h-px w-32 overflow-hidden bg-charcoal/10">
                    <div ref={progressRef} className="h-full w-full origin-left bg-coral" />
                  </div>
                </div>
              </div>
            </div>
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
