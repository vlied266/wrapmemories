"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { AUDIENCE_LINKS, AUDIENCE_PANELS } from "@/data/audiences";
import { cn } from "@/lib/utils";

const ACCENT_OVERLAY: Record<string, string> = {
  coral: "from-coral/60",
  teal: "from-teal/60",
  charcoal: "from-charcoal/80",
};

export function AudienceSection() {
  const [active, setActive] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section id="audiences" className="bg-cream py-28 sm:py-36">
      <Container>
        <Reveal className="mb-14 text-center">
          <Eyebrow className="justify-center">Made For Them</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
            Make something unmistakably theirs.
          </h2>
        </Reveal>

        <Reveal
          as="div"
          className="flex h-[560px] flex-col gap-3 sm:h-[620px] sm:flex-row"
        >
          {AUDIENCE_PANELS.map((panel, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={panel.key}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                animate={
                  isMobile
                    ? { flexGrow: 1 }
                    : { flexGrow: isActive ? 2.2 : active === null ? 1 : 0.75 }
                }
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-h-[160px] flex-1 overflow-hidden rounded-[1.5rem] text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                aria-label={`Shop gifts ${panel.label.toLowerCase()}`}
              >
                <Image
                  src={panel.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isActive ? "scale-110" : "scale-100",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500",
                    ACCENT_OVERLAY[panel.accent],
                    isActive ? "opacity-90" : "opacity-70",
                  )}
                  aria-hidden
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <span
                    className={cn(
                      "font-display text-cream transition-all duration-500 text-balance",
                      isActive ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
                    )}
                  >
                    {panel.label}
                  </span>
                  <p
                    className={cn(
                      "mt-3 max-w-[26ch] text-sm text-cream/85 transition-all duration-500",
                      isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    )}
                  >
                    {panel.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.05}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-charcoal/60"
        >
          {AUDIENCE_LINKS.map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <Link href="#" className="transition-colors hover:text-coral">
                {label}
              </Link>
              {i < AUDIENCE_LINKS.length - 1 && <span aria-hidden>·</span>}
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
