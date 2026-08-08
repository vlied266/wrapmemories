"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { UploadZone } from "@/components/personalization/UploadZone";
import { TransformDemo } from "@/components/personalization/TransformDemo";
import { PERSONALIZATION_SAMPLES } from "@/data/personalization";
import { cn } from "@/lib/utils";

export function PersonalizationStudio() {
  const [selectedKey, setSelectedKey] = useState(PERSONALIZATION_SAMPLES[0].key);
  const [isProcessing, setIsProcessing] = useState(false);
  const [revealStage, setRevealStage] = useState(3);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const selected = PERSONALIZATION_SAMPLES.find((s) => s.key === selectedKey)!;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function runSimulation() {
    if (isProcessing) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setIsProcessing(true);
    setRevealStage(0);

    timers.current.push(setTimeout(() => setRevealStage(1), 450));
    timers.current.push(setTimeout(() => setRevealStage(2), 1250));
    timers.current.push(setTimeout(() => setRevealStage(3), 2050));
    timers.current.push(setTimeout(() => setIsProcessing(false), 2150));
  }

  function selectSample(key: string) {
    if (isProcessing) return;
    setSelectedKey(key);
    setRevealStage(3);
  }

  return (
    <section id="personalization-studio" className="bg-cream-deep/40 py-28 sm:py-36">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        <Reveal>
          <Eyebrow>The Studio</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-balance sm:text-5xl">
            Start with a memory.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70">
            Upload a photo and turn it into something only they could receive.
          </p>

          <div className="mt-10">
            <p className="mb-3 text-sm font-medium text-charcoal/60">Try it with a sample:</p>
            <div className="flex gap-3">
              {PERSONALIZATION_SAMPLES.map((sample) => (
                <button
                  key={sample.key}
                  type="button"
                  onClick={() => selectSample(sample.key)}
                  aria-pressed={selectedKey === sample.key}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-cream transition-all sm:h-20 sm:w-20",
                    selectedKey === sample.key ? "ring-coral" : "ring-transparent hover:ring-charcoal/20",
                  )}
                >
                  <Image src={sample.photo} alt={sample.label} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <UploadZone onTrigger={runSimulation} isProcessing={isProcessing} />
          </div>

          <div className="mt-8">
            <Button variant="primary" onClick={runSimulation}>
              Create Something Personal
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-charcoal/10 bg-cream px-6 py-14 shadow-[0_40px_80px_-40px_rgba(38,50,56,0.25)] sm:px-10">
            <p className="mb-8 text-center text-[0.7rem] font-medium tracking-[0.18em] text-charcoal/40">
              SAMPLE PREVIEW — NOT YOUR UPLOADED PHOTO
            </p>
            <TransformDemo sample={selected} revealStage={revealStage} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
