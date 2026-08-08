"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

const STAGES = [
  { key: "photo", image: "/images/photos/pet.svg", alt: "A personal pet photo — placeholder", caption: "Your photo" },
  { key: "art", image: "/images/artwork/pet-illustrated.svg", alt: "The photo reimagined as illustrated artwork — placeholder", caption: "We turn it into art" },
  { key: "gift", image: "/images/products/mug.svg", alt: "The artwork printed onto a mug — placeholder", caption: "You make it personal" },
] as const;

export function TransformationStory() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const captionRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const finalRef = useRef<HTMLParagraphElement | null>(null);

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

        gsap.set(stageRefs.current[1], { opacity: 0, scale: 0.94 });
        gsap.set(stageRefs.current[2], { opacity: 0, scale: 0.94 });
        gsap.set(captionRefs.current[1], { opacity: 0, y: 12 });
        gsap.set(captionRefs.current[2], { opacity: 0, y: 12 });
        gsap.set(finalRef.current, { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=280%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(stageRefs.current[0], { opacity: 0, scale: 1.06, duration: 1 }, 1)
          .to(stageRefs.current[1], { opacity: 1, scale: 1, duration: 1 }, "<")
          .to(captionRefs.current[0], { opacity: 0, y: -12, duration: 0.6 }, "<")
          .to(captionRefs.current[1], { opacity: 1, y: 0, duration: 0.6 }, "<+0.2")

          .to(stageRefs.current[1], { opacity: 0, scale: 1.06, duration: 1 }, 2.4)
          .to(stageRefs.current[2], { opacity: 1, scale: 1, duration: 1 }, "<")
          .to(captionRefs.current[1], { opacity: 0, y: -12, duration: 0.6 }, "<")
          .to(captionRefs.current[2], { opacity: 1, y: 0, duration: 0.6 }, "<+0.2")

          .to(captionRefs.current[2], { opacity: 0, y: -12, duration: 0.5 }, 3.8)
          .to(finalRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<+0.1");
      });

      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="transformation" className="relative bg-cream py-28 sm:py-36">
      <Container className="mb-14 text-center">
        <Eyebrow className="justify-center">The Transformation</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
          Photo. Artwork. Gift.
        </h2>
      </Container>

      {/* Desktop / motion-safe: pinned crossfade sequence */}
      <div ref={pinRef} className="relative hidden h-[100svh] overflow-hidden md:motion-safe:block">
        <Container className="relative flex h-full flex-col items-center justify-center">
          <div className="relative aspect-[4/5] w-[340px]">
            {STAGES.map((stage, i) => (
              <div
                key={stage.key}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(38,50,56,0.35)]"
              >
                <Image src={stage.image} alt={stage.alt} fill sizes="340px" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="relative mt-10 h-10 w-full">
            {STAGES.map((stage, i) => (
              <p
                key={stage.key}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute inset-x-0 text-center font-display text-2xl italic text-charcoal/80"
              >
                {stage.caption}
              </p>
            ))}
          </div>

          <p
            ref={finalRef}
            className="absolute bottom-16 left-0 right-0 text-center font-display text-4xl text-coral sm:text-5xl"
          >
            We make it real.
          </p>
        </Container>
      </div>

      {/* Mobile, tablet, and reduced-motion: simple vertical story */}
      <div className="block md:motion-safe:hidden">
        <Container className="flex flex-col gap-16">
          {STAGES.map((stage) => (
            <Reveal key={stage.key} className="flex flex-col items-center text-center">
              <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-24px_rgba(38,50,56,0.3)]">
                <Image src={stage.image} alt={stage.alt} fill sizes="280px" className="object-cover" />
              </div>
              <p className="mt-6 font-display text-2xl italic text-charcoal/80">{stage.caption}</p>
            </Reveal>
          ))}
          <Reveal className="text-center">
            <p className="font-display text-4xl text-coral">We make it real.</p>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
