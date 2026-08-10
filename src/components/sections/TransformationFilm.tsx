"use client";

import { useRef, useEffect, useState } from "react";
import NextImage from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const OPENING_TEXT = "Your moment.";
const CLOSING_TEXT = "Made unforgettable.";

// 125 transparent PNG frames
const FRAME_COUNT = 125;
const SMOOTHING_FACTOR = 0.1;

const getFramePath = (frameNum: number) =>
  `/sequences/transformation/frame-${String(frameNum).padStart(3, "0")}.png`;

export function TransformationFilm() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const openingTextRef = useRef<HTMLParagraphElement | null>(null);
  const closingTextRef = useRef<HTMLParagraphElement | null>(null);

  const frameImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const alphaBoundsRef = useRef<Map<number, { x: number; y: number; width: number; height: number }>>(new Map());
  const targetFrameRef = useRef(1);
  const displayedFrameRef = useRef(1);
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
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        frameImagesRef.current.set(i, img);
      }
      isPreloadingRef.current = false;
    };

    preloadFrames();
  }, []);

  // Non-linear frame mapping for cinematic pacing with explicit story zones
  const mapScrollProgressToFrameIndex = (progress: number): number => {
    // progress is 0-1 representing scroll position
    // Story zones with breathing room:
    // 0.00-0.25: frames 1-30   (dog running, establish)
    // 0.25-0.40: frames 31-50  (approach, anticipation)
    // 0.40-0.65: frames 51-90  (flash, early transformation - extended for impact)
    // 0.65-0.85: frames 91-120 (mug formation, reveal)
    // 0.85-1.00: frame 125     (final mug hold - lock and hold)

    let frameNum: number;

    if (progress < 0.25) {
      frameNum = 1 + (progress / 0.25) * 29;
    } else if (progress < 0.4) {
      frameNum = 30 + ((progress - 0.25) / 0.15) * 20;
    } else if (progress < 0.65) {
      frameNum = 50 + ((progress - 0.4) / 0.25) * 40;
    } else if (progress < 0.85) {
      frameNum = 90 + ((progress - 0.65) / 0.2) * 30;
    } else {
      frameNum = 125;
    }

    return Math.round(Math.max(1, Math.min(frameNum, FRAME_COUNT)));
  };

  // Calculate alpha bounding box for subject-based scaling
  const getAlphaBounds = (img: HTMLImageElement): { x: number; y: number; width: number; height: number } => {
    const bounds = alphaBoundsRef.current.get(frameImagesRef.current.size);
    if (bounds) return bounds;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = img.naturalWidth;
    tempCanvas.height = img.naturalHeight;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return { x: 0, y: 0, width: img.naturalWidth, height: img.naturalHeight };

    tempCtx.drawImage(img, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
    const data = imageData.data;

    let minX = img.naturalWidth, maxX = 0;
    let minY = img.naturalHeight, maxY = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 10) {
        const pixelIndex = (i - 3) / 4;
        const x = pixelIndex % img.naturalWidth;
        const y = Math.floor(pixelIndex / img.naturalWidth);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }

    if (minX > maxX) {
      return { x: 0, y: 0, width: img.naturalWidth, height: img.naturalHeight };
    }

    const bounds_result = {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    };

    alphaBoundsRef.current.set(frameImagesRef.current.size, bounds_result);
    return bounds_result;
  };

  // Calculate horizontal position based on frame progression (left to center)
  const getHorizontalOffset = (frameNum: number): number => {
    if (frameNum < 30) {
      return 0.25 + (frameNum / 30) * 0.1;
    } else if (frameNum < 90) {
      return 0.35 + ((frameNum - 30) / 60) * 0.15;
    } else {
      return 0.5;
    }
  };

  // Canvas rendering for transparent frame display with alpha-based scaling
  const renderFrame = (frameNum: number) => {
    if (!canvasRef.current) return;

    const img = frameImagesRef.current.get(frameNum);
    if (!img || !img.complete) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    const bounds = getAlphaBounds(img);
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    const targetWidth = canvasWidth * 0.4;
    const subjectAspect = bounds.width / bounds.height;
    let renderWidth = targetWidth;
    let renderHeight = targetWidth / subjectAspect;

    if (renderHeight > canvasHeight * 0.8) {
      renderHeight = canvasHeight * 0.8;
      renderWidth = renderHeight * subjectAspect;
    }

    const hOffset = getHorizontalOffset(frameNum);
    const x = canvasWidth * hOffset - renderWidth / 2;
    const y = (canvasHeight - renderHeight) / 2;

    ctx.drawImage(img, bounds.x, bounds.y, bounds.width, bounds.height, x, y, renderWidth, renderHeight);
  };

  // Smooth frame interpolation using RAF
  useEffect(() => {
    if (isReducedMotion) return;

    let animationId: number;
    const animate = () => {
      const diff = targetFrameRef.current - displayedFrameRef.current;
      if (Math.abs(diff) > 0.1) {
        displayedFrameRef.current += diff * SMOOTHING_FACTOR;
        const frameNum = Math.round(displayedFrameRef.current);
        renderFrame(frameNum);
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isReducedMotion]);

  // Desktop scroll scrubbing with frame sequence
  useGSAP(
    () => {
      if (!canvasRef.current || !sectionRef.current || isReducedMotion) {
        return;
      }

      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        return;
      }

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
            end: "+=600vh",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              targetFrameRef.current = mapScrollProgressToFrameIndex(progress);
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
      renderFrame(1);
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

          {/* Canvas element - transparent frames */}
          <canvas
            ref={canvasRef}
            className="relative z-10 w-[95%] max-w-6xl h-auto"
            style={{
              maxHeight: "80vh",
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
