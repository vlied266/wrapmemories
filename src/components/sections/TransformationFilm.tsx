"use client";

import { useRef, useEffect, useState } from "react";
import NextImage from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const OPENING_TEXT = "Your moment.";
const CLOSING_TEXT = "Made unforgettable.";

// Available frame numbers (77 total frames with sampling pattern)
const AVAILABLE_FRAMES = [
  1, 2, 3, 7, 8, 9, 13, 14, 15, 19, 20, 21, 25, 26, 27, 31, 32, 33, 37, 38, 39, 43, 44, 45, 49, 50, 51, 55, 56, 57, 61, 62, 63, 67, 68, 69, 73, 74, 75, 79, 80, 81, 85, 86, 87, 91, 92, 93, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125,
];

const getFramePath = (frameNum: number) => `/frame-${String(frameNum).padStart(3, "0")}.jpg`;

export function TransformationFilm() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const openingTextRef = useRef<HTMLParagraphElement | null>(null);
  const closingTextRef = useRef<HTMLParagraphElement | null>(null);

  const frameImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameIndexRef = useRef(0);
  const isPreloadingRef = useRef(true);

  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Handle reduced motion media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Preload all frame images
  useEffect(() => {
    const preloadFrames = async () => {
      console.log("[TransformationFilm] Starting frame preload...");
      for (const frameNum of AVAILABLE_FRAMES) {
        const img = new Image();
        img.src = getFramePath(frameNum);
        frameImagesRef.current.set(frameNum, img);
      }
      console.log("[TransformationFilm] Frame preload started for", AVAILABLE_FRAMES.length, "frames");
      isPreloadingRef.current = false;
    };

    preloadFrames();
  }, []);

  // Canvas rendering for frame display
  const renderFrame = (frameIndex: number) => {
    if (!canvasRef.current) return;

    const frameNum = AVAILABLE_FRAMES[frameIndex];
    const img = frameImagesRef.current.get(frameNum);

    if (!img || !img.complete) {
      // Frame not loaded, try next available frame
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = "#F5EFE7"; // cream color
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw image with contain scaling (preserve aspect ratio)
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    const imgAspect = img.naturalWidth / img.naturalHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasWidth / imgAspect;

    if (drawHeight > canvasHeight) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
    }

    const x = (canvasWidth - drawWidth) / 2;
    const y = (canvasHeight - drawHeight) / 2;

    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  // Desktop scroll scrubbing with frame sequence
  useGSAP(
    () => {
      if (!canvasRef.current || !sectionRef.current || isReducedMotion) {
        console.log("[TransformationFilm] GSAP effect skipped");
        return;
      }

      // Only scrub on desktop
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        console.log("[TransformationFilm] Mobile detected, skipping desktop scrub");
        return;
      }

      console.log("[TransformationFilm] Setting up canvas frame sequence scrub");

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop: isDesktopCondition } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        if (!isDesktopCondition) {
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180vh",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const frameIndex = Math.round(progress * (AVAILABLE_FRAMES.length - 1));

              if (frameIndex !== currentFrameIndexRef.current) {
                currentFrameIndexRef.current = frameIndex;
                renderFrame(frameIndex);
              }
            },
          },
        });

        // Add text animations
        if (openingTextRef.current) {
          tl.to(
            openingTextRef.current,
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.2
          );
          tl.to(
            openingTextRef.current,
            { opacity: 0, y: -20, duration: 0.6, ease: "power2.in" },
            "+=1.5"
          );
        }

        if (closingTextRef.current) {
          tl.to(
            closingTextRef.current,
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.3"
          );
        }

        return () => {
          mm.revert();
        };
      });

      // Render initial frame
      renderFrame(0);
    },
    { scope: sectionRef, dependencies: [isReducedMotion] }
  );

  return (
    <section id="transformation" className="relative bg-cream py-28 sm:py-36">
      <Container className="mb-14 text-center">
        <Eyebrow className="justify-center">The Transformation</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
          Photo. Artwork. Gift.
        </h2>
      </Container>

      {/* Desktop: pinned canvas scrubbing */}
      <div
        ref={sectionRef}
        className="relative hidden h-[100svh] overflow-hidden md:block bg-cream"
      >
        {/* Background container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
          {/* Opening text overlay */}
          <p
            ref={openingTextRef}
            className="absolute top-24 z-20 font-display text-4xl sm:text-5xl text-charcoal opacity-0 translate-y-6"
          >
            {OPENING_TEXT}
          </p>

          {/* Canvas element - large cinematic scale */}
          <canvas
            ref={canvasRef}
            className="relative z-10 w-[95%] max-w-6xl h-auto"
            style={{
              maxHeight: "80vh",
              aspectRatio: "16/9",
              backgroundColor: "#F5EFE7",
            }}
          />

          {/* Closing text overlay - positioned at bottom */}
          <p
            ref={closingTextRef}
            className="absolute bottom-24 z-20 font-display text-4xl sm:text-5xl text-coral opacity-0 translate-y-6"
          >
            {CLOSING_TEXT}
          </p>
        </div>
      </div>

      {/* Mobile: static final frame */}
      <div className="block md:hidden">
        <Container className="flex flex-col gap-8">
          {/* Opening text */}
          <p className="font-display text-3xl sm:text-4xl text-charcoal text-center">
            {OPENING_TEXT}
          </p>

          {/* Static final frame image */}
          <NextImage
            src={getFramePath(125)}
            alt="Transformation final frame"
            width={1920}
            height={1080}
            className="w-full h-auto rounded-2xl shadow-[0_20px_40px_rgba(38,50,56,0.2)]"
          />

          {/* Closing text */}
          <p className="font-display text-3xl sm:text-4xl text-coral text-center">
            {CLOSING_TEXT}
          </p>
        </Container>
      </div>
    </section>
  );
}
