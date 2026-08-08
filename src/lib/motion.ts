// Shared media-query strings for gsap.matchMedia() so every section
// branches on the same breakpoints and motion preference.
export const MEDIA = {
  desktop: "(min-width: 1024px)",
  tabletUp: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  motionOk: "(prefers-reduced-motion: no-preference)",
  motionReduced: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Standard condition set for `gsap.matchMedia().add(...)`.
 *
 * IMPORTANT gsap gotcha: MatchMedia only invokes the callback when at
 * least one listed query currently matches ("active" is OR'd across all
 * keys). `isDesktop` + `isMobile` are mutually exclusive and exhaustive,
 * so exactly one is always true and the callback is guaranteed to fire on
 * every combination — including e.g. mobile + no reduced-motion
 * preference, which previously fell through both conditions silently.
 */
export const MOTION_CONDITIONS = {
  isDesktop: MEDIA.tabletUp,
  isMobile: MEDIA.mobile,
  reduceMotion: MEDIA.motionReduced,
} as const;

/** Ease tokens reused across sections for a consistent "cinematic" feel. */
export const EASE = {
  cinematic: "power3.out",
  soft: "power2.out",
  reveal: "power4.out",
} as const;
