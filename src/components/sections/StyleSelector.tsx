"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { STYLE_OPTIONS } from "@/data/styles";
import { cn } from "@/lib/utils";

/**
 * Prototype-only style treatment: a CSS filter stands in for a real
 * generated variant. To connect a real generator, swap `activeStyle.filter`
 * for setting the portrait's `src` to the returned image per style, keyed
 * the same way by `STYLE_OPTIONS[i].key`.
 */
export function StyleSelector() {
  const [activeKey, setActiveKey] = useState(STYLE_OPTIONS[0].key);
  const activeStyle = STYLE_OPTIONS.find((s) => s.key === activeKey)!;

  return (
    <section className="bg-cream py-28 sm:py-36">
      <Container className="flex flex-col items-center">
        <Reveal className="mb-14 text-center">
          <Eyebrow className="justify-center">Choose A Style</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
            Your memory. Your style.
          </h2>
        </Reveal>

        <Reveal className="relative w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(38,50,56,0.35)]">
            <Image
              src="/images/photos/portrait-sample.svg"
              alt={`Sample portrait previewed in the ${activeStyle.label} style`}
              fill
              sizes="384px"
              className="object-cover transition-[filter] duration-700 ease-out"
              style={{ filter: activeStyle.filter }}
            />
          </div>
          <p className="mt-4 text-center font-display text-xl italic text-charcoal/70">
            {activeStyle.label}
          </p>
        </Reveal>

        <Reveal
          as="div"
          stagger={0.04}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {STYLE_OPTIONS.map((style) => (
            <button
              key={style.key}
              type="button"
              onClick={() => setActiveKey(style.key)}
              aria-pressed={activeKey === style.key}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                activeKey === style.key
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/40",
              )}
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: style.swatch }}
              />
              {style.label}
            </button>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
