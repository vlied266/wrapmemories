"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { PersonalizationSample } from "@/data/personalization";

export function TransformDemo({
  sample,
  revealStage,
}: {
  sample: PersonalizationSample;
  revealStage: number;
}) {
  const stages = [
    { image: sample.photo, label: "Your photo" },
    { image: sample.art, label: "Styled art" },
    { image: sample.product, label: sample.productLabel },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6">
      {stages.map((stage, i) => (
        <Fragment key={stage.label}>
          {i > 0 && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
              className={cn(
                "shrink-0 transition-colors duration-500",
                revealStage > i ? "text-coral" : "text-charcoal/20",
              )}
            >
              <path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <motion.div
            animate={{
              opacity: revealStage > i ? 1 : 0.3,
              scale: revealStage > i ? 1 : 0.9,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-xl shadow-[0_12px_30px_-12px_rgba(38,50,56,0.4)] sm:h-28 sm:w-28">
              <Image src={stage.image} alt="" fill sizes="112px" className="object-cover" />
            </div>
            <span className="text-xs text-charcoal/60">{stage.label}</span>
          </motion.div>
        </Fragment>
      ))}
    </div>
  );
}
