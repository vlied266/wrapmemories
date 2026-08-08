"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { REACTIONS, UGC_THUMBNAILS, type Reaction } from "@/data/reactions";
import { cn } from "@/lib/utils";

const QUOTE_SIZE: Record<NonNullable<Reaction["size"]>, string> = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
};

type Block =
  | { kind: "quote"; reaction: Reaction }
  | { kind: "ugc"; thumb: (typeof UGC_THUMBNAILS)[number] };

function buildBlocks(): Block[] {
  const blocks: Block[] = [];
  let ugcIndex = 0;
  REACTIONS.forEach((reaction, i) => {
    blocks.push({ kind: "quote", reaction });
    if ((i + 1) % 2 === 0 && ugcIndex < UGC_THUMBNAILS.length) {
      blocks.push({ kind: "ugc", thumb: UGC_THUMBNAILS[ugcIndex] });
      ugcIndex += 1;
    }
  });
  return blocks;
}

export function SocialProof() {
  const blocks = buildBlocks();

  return (
    <section className="bg-cream py-28 sm:py-36">
      <Container>
        <Reveal className="mb-16 text-center">
          <Eyebrow className="justify-center">Reactions</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
            Reactions we wish we could bottle.
          </h2>
        </Reveal>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {blocks.map((block, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.08}
              className={cn(
                "mb-6 break-inside-avoid",
                i % 3 === 1 && "sm:mt-10",
                i % 3 === 2 && "sm:mt-4",
              )}
            >
              {block.kind === "quote" ? (
                <div
                  className={cn(
                    "rounded-[1.5rem] border border-charcoal/10 bg-cream-deep/30 px-7 py-8",
                    block.reaction.size === "lg" ? "py-10" : "",
                  )}
                >
                  <p
                    className={cn(
                      "font-display italic leading-snug text-balance",
                      QUOTE_SIZE[block.reaction.size ?? "md"],
                    )}
                  >
                    &ldquo;{block.reaction.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm tracking-wide text-charcoal/50">
                    {block.reaction.attribution}
                  </p>
                </div>
              ) : (
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={block.thumb.image}
                    alt={block.thumb.label}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-4 left-4 right-4 text-sm font-medium text-cream drop-shadow">
                    {block.thumb.label}
                  </span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
