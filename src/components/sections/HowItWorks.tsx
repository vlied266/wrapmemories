"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { HOW_IT_WORKS_STEPS } from "@/data/howItWorks";

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineHRef = useRef<HTMLDivElement | null>(null);
  const lineVRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        const target = isDesktop ? lineHRef.current : lineVRef.current;
        const prop = isDesktop ? "scaleX" : "scaleY";

        if (reduceMotion) {
          gsap.set(target, { [prop]: 1 });
          return;
        }

        gsap.set(target, { [prop]: 0 });
        gsap.to(target, {
          [prop]: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-cream py-28 sm:py-36">
      <Container>
        <Reveal className="mb-20 text-center">
          <Eyebrow className="justify-center">How It Works</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
            From memory to gift, in four steps.
          </h2>
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div className="hidden sm:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-charcoal/10" aria-hidden />
            <div
              ref={lineHRef}
              className="absolute left-0 top-[7px] h-px w-full origin-left bg-coral"
              aria-hidden
            />
            <div className="relative grid grid-cols-4">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div key={step.number} className="flex justify-center">
                  <span
                    aria-hidden
                    className="h-[15px] w-[15px] rounded-full bg-cream ring-2 ring-charcoal/25"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.06} className="text-center">
                <p className="font-display text-3xl text-coral/50">{step.number}</p>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="relative flex flex-col gap-12 sm:hidden">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-charcoal/10" aria-hidden />
          <div
            ref={lineVRef}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-coral"
            aria-hidden
          />
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06} className="relative flex gap-6 pl-0">
              <span
                aria-hidden
                className="relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full bg-cream ring-2 ring-charcoal/25"
              />
              <div>
                <p className="font-display text-2xl text-coral/50">{step.number}</p>
                <h3 className="mt-1 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
