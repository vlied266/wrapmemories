"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

// Decorative background imagery only — the section's meaning is carried
// by the headline, so these are marked aria-hidden with empty alt text.
const FRAMES = [
  "/images/photos/pet.svg",
  "/images/photos/couple.svg",
  "/images/photos/family.svg",
  "/images/photos/friends.svg",
  "/images/photos/baby.svg",
];

function FilmRow({ reverse = false, speed = 38 }: { reverse?: boolean; speed?: number }) {
  const frames = [...FRAMES, ...FRAMES];
  return (
    <div
      aria-hidden
      className="flex w-max shrink-0 gap-6 motion-safe:animate-marquee"
      style={{
        animationDirection: reverse ? "reverse" : "normal",
        animationDuration: `${speed}s`,
      }}
    >
      {frames.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative h-[220px] w-[170px] shrink-0 overflow-hidden rounded-lg border border-cream/15 sm:h-[280px] sm:w-[220px]"
        >
          <Image src={src} alt="" fill sizes="220px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export function EmotionalStory() {
  return (
    <section
      id="emotional-story"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-charcoal py-28 text-cream sm:py-36"
    >
      <div className="flex w-full min-w-0 flex-col gap-6 overflow-hidden opacity-70">
        <FilmRow speed={42} />
        <FilmRow reverse speed={50} />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/80 to-charcoal/40"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <Reveal distance={18} duration={1.1}>
          <p className="max-w-lg font-display text-3xl italic leading-snug text-cream/70 text-balance sm:text-4xl">
            Some gifts say &ldquo;I thought of you.&rdquo;
          </p>
        </Reveal>
        <Reveal distance={18} duration={1.1} delay={0.5}>
          <p className="mt-6 max-w-xl font-display text-4xl leading-snug text-balance sm:text-6xl">
            The best ones say, <span className="text-coral">&ldquo;I know you.&rdquo;</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
