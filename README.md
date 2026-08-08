# Wrap Memories — Cinematic Homepage Prototype

_Your story. Creatively wrapped._

This is a visual/UX prototype for the Wrap Memories homepage: a personalized-gifting
brand that turns photos, pets, and relationships into creative gifts. It's built
to demonstrate the full cinematic art direction — pinned scroll storytelling,
editorial typography, a mock personalization flow — before any commerce,
auth, or real AI generation is wired up.

**Not included on purpose:** Shopify/commerce, authentication, checkout, a real
AI image-generation API. See [What's simulated / still needed](#whats-simulated--still-needed).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css` (no `tailwind.config.js`)
- **GSAP** + **ScrollTrigger** (`@gsap/react`'s `useGSAP` hook for lifecycle-safe scoping)
- **Lenis** for smooth scrolling, synced to GSAP's ticker
- **Motion** (the current package name for Framer Motion) for a handful of UI
  micro-interactions (expanding audience panels, the upload-zone drag state)
- **React Three Fiber + drei** for exactly one moment: a soft sparkle field
  behind the hero photo card

## Architecture

```
src/
  app/                    # Next.js App Router entry (layout.tsx, page.tsx, globals.css)
  components/
    layout/               # Navigation, Footer, SmoothScrollProvider (Lenis + GSAP wiring, anchor-link handling)
    sections/              # One component per homepage scene (Hero, ProductReveal, FinalCTA, ...)
    motion/               # Reveal — the one shared scroll-reveal primitive used across sections
    three/                # HeroParticles (gate) + SparkleField (the actual R3F canvas, dynamically imported)
    ui/                   # Button, Container, Eyebrow — small style primitives
    product/, personalization/  # UploadZone, TransformDemo — the mock personalization studio
  data/                   # Section copy/content as plain arrays, separate from components
  hooks/                  # useReducedMotion, useMediaQuery/useIsMobile
  lib/                    # gsap.ts (plugin registration), motion.ts (breakpoint/easing constants), utils.ts (cn)
public/images/            # Placeholder SVG assets (see below)
```

`page.tsx` is a plain list of section components — each section owns its own
content, animation, and responsive behavior, so there's no giant homepage
file to reason about.

## The animation system

**Two scroll systems, kept in sync.** Lenis intercepts wheel/touch input and
smooths native scroll; every frame it also calls `ScrollTrigger.update()` (see
`SmoothScrollProvider`), so GSAP's scroll-linked animations track the smoothed
position exactly. Lenis is **not instantiated at all** on touch/mobile
viewports or when `prefers-reduced-motion: reduce` — those get plain native
scrolling, which is both more correct for touch and the simplest way to avoid
scroll-jacking on mobile.

**`gsap.matchMedia()` everywhere.** Every section that branches on
device/motion uses the shared `MOTION_CONDITIONS` object in `src/lib/motion.ts`:

```ts
export const MOTION_CONDITIONS = {
  isDesktop: MEDIA.tabletUp,
  isMobile: MEDIA.mobile,
  reduceMotion: MEDIA.motionReduced,
};
```

`isDesktop`/`isMobile` are a complementary, mutually-exclusive pair. This
matters: `gsap.matchMedia().add()` only invokes its callback when **at least
one** listed query currently matches — it does not fire once with all
booleans available. A conditions object built only from independent
non-exhaustive queries (e.g. just `isDesktop` + `reduceMotion`) can leave both
false simultaneously (a mobile viewport with no reduced-motion preference) and
the callback silently never runs. Keeping one exhaustive pair in the object
guarantees it always fires.

**Pinned sections use two DOM trees, not one conditional pin.** The
transformation story, product reveal, and final CTA each render:

- a `hidden md:motion-safe:block` desktop version that pins and scrubs a
  multi-stage GSAP timeline, and
- a `block md:motion-safe:hidden` version for mobile/tablet/reduced-motion
  that lays the same stages out as a plain vertical scroll with simple
  `Reveal` fade-ups — no pin, no scroll-jacking.

This is deliberate rather than trying to branch one pinned timeline at
runtime: a couple of bugs surfaced during development from treating a pin as
just another motion tweak (see below), and keeping the two layouts fully
separate sidesteps that class of bug entirely.

**Two GSAP gotchas worth knowing if you extend this:**
1. Relative ScrollTrigger `end` values like `"+=120%"` are a percentage of
   the *trigger element's own size*, not the viewport. Pinning a small
   element with a `%` end desyncs GSAP's auto pin-spacer from the actual pin
   duration. Everything pinned here either uses a full-viewport-height
   trigger (safe with `%`) or an explicit pixel `end`.
2. Content that should be revealed *during* a pin needs to live inside the
   pinned container and be driven by the same timeline. Content placed after
   the pin in normal document flow keeps scrolling underneath the
   still-fixed pinned element and visually collides with it.

**`Reveal` (`src/components/motion/Reveal.tsx`)** is the one shared
fade-up-on-scroll primitive, used anywhere a section just needs "appear when
scrolled near" rather than a bespoke sequence. It also branches on
`prefers-reduced-motion` via matchMedia (falls back to a fast opacity-only
fade, no translation).

**Reduced motion, concretely:** global CSS in `globals.css` collapses all
CSS transitions/animations to ~0 under `prefers-reduced-motion: reduce`;
every GSAP scene additionally checks the same preference and either skips
its pin/scrub entirely or jumps straight to the resolved end state.

## How to replace the placeholder assets

Every image under `public/images/` is a generated placeholder SVG — tasteful
gradients/line-art standing in for real photography and mockups, not
external stock. Swap by filename; aspect ratios and object-fit are already
tuned:

| Path | Used for | Replace with |
|---|---|---|
| `photos/hero-memory.svg` | Hero floating card | A real customer photo |
| `photos/{pet,couple,family,friends,baby}.svg` | Transformation story, emotional film-strip, personalization samples | Real category photography |
| `photos/for-{her,him,pets}.svg` | "Who are you making it for" panels | Editorial photography per audience |
| `photos/portrait-sample.svg` | Style selector base portrait | A neutral sample portrait for style previews |
| `artwork/*-stylized.svg`, `*-illustrated.svg`, `*-lineart.svg` | Transformation story "art" stage, personalization samples | Real stylized-art outputs |
| `artwork/style-*.svg` | Style selector thumbnails | Real per-style sample renders |
| `products/{mug,tshirt,print,tote}.svg` | Product reveal, transformation story | Photographed or 3D-rendered product mockups |
| `ugc/reel-*.svg` | Social proof video thumbnails | Real UGC video poster frames |

**Fonts:** `Fraunces` (display/headlines) and `Inter` (body/UI), both loaded
via `next/font/google` in `src/app/layout.tsx` — self-hosted automatically,
no further setup.

**Brand tokens** live in `src/app/globals.css` under `:root` (`--color-coral`,
`--color-charcoal`, `--color-cream`, `--color-teal`, plus soft/deep variants)
and are re-exposed as Tailwind utilities (`bg-coral`, `text-charcoal/70`,
etc.) via the `@theme inline` block right below them.

## What's simulated / still needed

- **Personalization Studio** (`components/sections/PersonalizationStudio.tsx`,
  `components/personalization/*`): the upload zone accepts drag/drop and
  clicks but never reads or uploads a file — it just runs a timed reveal
  through pre-made sample assets. Wire a real endpoint by replacing
  `runSimulation()`'s `setTimeout` chain with actual upload + generation
  calls, keyed the same way by `PERSONALIZATION_SAMPLES[i].key`.
- **Style Selector** (`components/sections/StyleSelector.tsx`): style
  "treatments" are CSS `filter` values applied to one shared portrait, not
  real generated variants — documented inline in the component. Swap
  `activeStyle.filter` for setting the portrait's `src` per style once a
  generator exists.
- **Commerce**: no cart, no checkout, no Shopify. CTA buttons currently link
  to in-page anchors (mostly `#personalization-studio`).
- **Auth**: none.
- **Favicon**: still the default Next.js one at `src/app/favicon.ico` —
  replace with a brand mark (the coral-dot wordmark from the nav is a
  reasonable starting point).
- **Newsletter form** (footer): submit handler is a no-op (`preventDefault`
  only) — wire to a real list provider.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production build
npm run lint
```

## Manual QA performed

- Production build (`next build`) and typecheck (`tsc --noEmit`) both clean; `eslint .` clean.
- Verified in a real browser (not just build success) at 375, 430, 768, 1024, and 1440px:
  no horizontal overflow, no console errors, every in-page anchor link resolves,
  every image loads.
- Verified with `prefers-reduced-motion: reduce` emulated: all pins/scrub
  animations are skipped or resolved instantly; total scroll distance drops
  from ~20,000px to ~12,300px, confirming pinned scroll-jacking is actually
  removed rather than just visually muted.
- Verified keyboard tab order reaches nav, CTAs, and interactive controls
  with a visible focus ring.
