"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const OPENING_TEXT = "Your moment.";
const CLOSING_TEXT = "Made unforgettable.";
const VIDEO_SRC = "/transformation-film.mp4";

export function TransformationFilm() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const openingTextRef = useRef<HTMLParagraphElement | null>(null);
  const closingTextRef = useRef<HTMLParagraphElement | null>(null);

  const [videoDuration, setVideoDuration] = useState(0);
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

  // Handle mobile autoplay when section is visible
  useEffect(() => {
    if (!videoRef.current || isReducedMotion) return;

    // Only autoplay on mobile (below md breakpoint: 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay blocked; video will show poster
          });
        } else if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isReducedMotion]);

  // Handle video metadata and desktop scroll scrubbing
  useGSAP(
    () => {
      if (!videoRef.current || !sectionRef.current || isReducedMotion) {
        console.log("[TransformationFilm] GSAP effect skipped:", {
          videoRef: !!videoRef.current,
          sectionRef: !!sectionRef.current,
          isReducedMotion,
        });
        return;
      }

      // Only scrub on desktop
      const isDesktop = window.innerWidth >= 768;
      console.log("[TransformationFilm] Viewport width:", window.innerWidth, "isDesktop:", isDesktop);
      if (!isDesktop) {
        console.log("[TransformationFilm] Not desktop, skipping scrub setup");
        return;
      }

      const video = videoRef.current;

      // Wait for metadata to be loaded
      const handleMetadataLoaded = () => {
        console.log("[TransformationFilm] Metadata loaded:", {
          duration: video.duration,
          readyState: video.readyState,
          paused: video.paused,
          error: video.error,
        });

        if (!videoDuration) {
          setVideoDuration(video.duration);
        }

        const mm = gsap.matchMedia();

        mm.add(MOTION_CONDITIONS, (context) => {
          const { isDesktop: isDesktopCondition } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          console.log("[TransformationFilm] MatchMedia conditions:", { isDesktopCondition });

          if (!isDesktopCondition) {
            console.log("[TransformationFilm] MatchMedia says not desktop, returning");
            return;
          }

          console.log("[TransformationFilm] Setting up scroll scrub timeline");

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
                const newTime = progress * video.duration;
                video.currentTime = newTime;
                console.log("[ScrollTrigger] Progress:", progress.toFixed(3), "Time:", newTime.toFixed(2), "Duration:", video.duration);
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
      };

      console.log("[TransformationFilm] Video readyState:", video.readyState);

      if (video.readyState >= 1) {
        console.log("[TransformationFilm] Video metadata already loaded, calling handler");
        handleMetadataLoaded();
      } else {
        console.log("[TransformationFilm] Waiting for loadedmetadata event");
        video.addEventListener("loadedmetadata", handleMetadataLoaded, { once: true });
      }

      return () => {
        video.removeEventListener("loadedmetadata", handleMetadataLoaded);
      };
    },
    { scope: sectionRef, dependencies: [isReducedMotion, videoDuration] }
  );

  return (
    <section id="transformation" className="relative bg-cream py-28 sm:py-36">
      <Container className="mb-14 text-center">
        <Eyebrow className="justify-center">The Transformation</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl">
          Photo. Artwork. Gift.
        </h2>
      </Container>

      {/* Desktop and reduced-motion: pinned video scrubbing or static frame */}
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

          {/* Video element - large cinematic scale */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="relative z-10 w-[95%] max-w-6xl h-auto object-contain"
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

      {/* Mobile: autoplay without scroll scrubbing */}
      <div className="block md:hidden">
        <Container className="flex flex-col gap-8">
          {/* Opening text */}
          <p className="font-display text-3xl sm:text-4xl text-charcoal text-center">
            {OPENING_TEXT}
          </p>

          {/* Video */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="metadata"
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
