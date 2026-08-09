# Asset Production Guide: Wrap Memories Homepage

**Date:** August 9, 2026  
**Status:** Audit Complete — Ready for Production Briefing  
**Scope:** Complete asset replacement specification for premium final visuals

---

## Executive Summary

The Wrap Memories homepage currently uses 26 visual assets across 8 sections. Of these:

- **All 26 assets are temporary/placeholder** — illustrative, generic, or procedurally generated
- **No final-quality photography or product mockups exist** in the codebase
- **Total replacement assets required:** 39 unique files (accounting for reuse)
- **Priority order:** Hero → Transformation → Products → Audience → Emotions → Styles → Social → CTA

**Top 5 Assets with Biggest Visual Impact:**
1. Hero primary photo (emotional, credible, centered)
2. Transformation pet photo + artwork + product (establishes quality bar)
3. Product mockups (mug, tee, frame, tote — studio consistency)
4. Audience section photos (for-her, for-him, for-pets — lifestyle feel)
5. Emotional story frames (authentic, diverse, relatable moments)

---

## Master Asset Inventory

| ID | Section | Asset | Current Path | Priority | Required Size | Aspect Ratio | Format | Transparency | Visual Description | Composition Notes | Animation Notes | Status |
|:---|:--------|:------|:-------------|:---------|:-------------:|:-------------|:------:|:------------:|:-------------------|:------------------|:---------------:|:------:|
| **HERO** |  |  |  |  |  |  |  |  |  |  |  |  |
| HERO-01 | Hero | Primary Memory Photo | `/images/photos/hero-memory.svg` | 1 | 2160×2700px | 4:5 Portrait | JPG/WebP | No | Emotionally credible personal photograph; warm, intimate lighting; person or pet in center-left to right, leaving headline text area clear on left side; soft studio or natural window light; slightly muted color grade; genuine, candid feel | Subject should occupy center-right of frame (60-70%). Suggest 1-3 people, immediate family, or beloved pet. Safe crop area: 20% margin on all sides. Bake shadows into photo; no CSS filter. | Scales 1.08x + moves -20px forward on scroll; parallax speed: fastest | PLACEHOLDER |
| HERO-02 | Hero | Secondary Memory (Mid Background) | `/images/photos/couple.svg` | 2 | 1800×2250px | 4:5 Portrait | JPG/WebP | No | Semi-transparent background memory (target 50-60% opacity in CSS). Different subject than primary (couple, siblings, or friends). Softer focus/depth of field. Slightly desaturated. Warm color temperature matching primary. | Subject at different angle than HERO-01 (left-side placement). Could be same photography session or complementary moment. Keep in portrait orientation but allow slight crop variation. Safe crop: 20% margin. | Moves -12px forward on scroll; parallax speed: medium | PLACEHOLDER |
| HERO-03 | Hero | Tertiary Memory (Far Background) | `/images/photos/family.svg` | 2 | 1600×2000px | 4:5 Portrait | JPG/WebP | No | Subtle background memory (target 30-40% opacity in CSS). Even more muted/desaturated than HERO-02. Different subject; could be wider group or different moment. Soft, dreamy quality. | Subject at alternate position (right side). Safe crop: 20% margin. Should feel like a fleeting memory, not the focus. Light leaks or film grain acceptable. | Moves -8px forward on scroll; parallax speed: slowest | PLACEHOLDER |
| **TRANSFORMATION SEQUENCE** |  |  |  |  |  |  |  |  |  |  |  |  |
| TRANSFORM-01 | Transformation | Original Photo (Pet) | `/images/photos/pet.svg` | 1 | 2000×2500px | 4:5 Portrait | JPG/WebP | No | Real, emotionally credible pet photograph (recommend dog or cat). Warm, professional studio lighting. Pet in center frame, engaging with camera or natural moment. Neutral or soft background. Saturated colors, sharp focus on subject. Genuine candid moment, not overly posed. | Pet should be centered, front-facing or 3/4 angle. Portrait orientation. Keep entire pet visible with minimal cropping. Safe crop: 15% margin around edges. Background should be simple (solid color or soft blur) — will be masked during transition. No borders; clean edges for clip-path. | Stays static during initial scroll; clips behind artwork reveal. Target z-index layering. | PLACEHOLDER |
| TRANSFORM-02 | Transformation | Illustrated Artwork (Pet) | `/images/artwork/pet-illustrated.svg` | 1 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Professional hand-illustrated or digital art rendering of the SAME pet from TRANSFORM-01. Medium detail level (not hyper-realistic, not cartoon). Warm color palette aligned with hero. Art style: painterly, slightly stylized, emotionally resonant. Subject in identical position/angle as photo. | **CRITICAL:** Subject position and scale must match TRANSFORM-01 exactly for seamless clip-path transition. Pet facial features, pose, body angle must align pixel-perfectly. Safe canvas: 2000×2500px with 200px padding on all sides. Recommend tracing or AI-assisted generation from original photo. | Masked reveal during scroll (clip-path animation); dissolve opacity 0→1 over 1.2s; positioned absolutely behind photo. | PLACEHOLDER |
| TRANSFORM-03 | Transformation | Product Mockup with Artwork (Mug) | `/images/products/mug.svg` → replacement | 1 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Premium ceramic mug mockup; artwork from TRANSFORM-02 appears printed on mug. Mug in 3/4 angle, slightly tilted right. Warm studio lighting (key light from upper left). Soft ground shadow. Slight reflection on ceramic gloss. Artwork visible on front face of mug; readable but realistic perspective. Handle visible, subtle shine. | Artwork should be perspective-corrected and positioned on mug front face (approximately center, occupying ~60% of visible surface). Mug should feel tactile and real, not stylized. Include soft background fade (transparent). Shadow: baked in, ~80px blur. Safe zone: artwork area 1200×1500px region. | Enters with scale bloom (1.06→1) and subtle y-shift (16px→0). Positioned over artwork, creating handoff sensation. | TEMPORARY (Current SVG is placeholder) |
| **PRODUCT REVEAL** |  |  |  |  |  |  |  |  |  |  |  |  |
| PRODUCT-01 | Product Reveal | Mug Mockup | `/mockups/mug-mockup.svg` | 2 | 2200×2600px | 3.5:4 Portrait | PNG (transparent) | Yes | Premium ceramic mug mockup. Warm studio lighting (consistent across all products). Mug angled 20-25° right, rim visible. Soft ground shadow (80-120px blur, ~15% opacity). Reflected light on left side of mug. Artwork placeholder area on front face (light teal fill for reference). Handle fully visible. Gloss highlights on rim and body. | Mug occupies 60-70% of canvas. Center horizontally. Artwork area: ~1100×1400px region, perspective-corrected, ~45° tilt. Transparent background with 200px safe zone around object. Studio lighting direction: 45° upper-left. Shadow softness: Gaussian blur 100px+. | Scales bloom 1.06→1 (150ms ease-out). Opacity 0→1 (500ms). Positioned left in editorial layout. No parallax. | TEMPORARY (Current is placeholder) |
| PRODUCT-02 | Product Reveal | T-Shirt/Sweatshirt Mockup | `/mockups/tshirt-mockup.svg` → replacement | 2 | 2200×2800px | 1:1.27 Portrait | PNG (transparent) | Yes | Premium casual sweatshirt on invisible form/hanger. Positioned facing camera, slight perspective (as if worn). Warm studio lighting matching PRODUCT-01 (same key light angle). Artwork placeholder area on chest (light coral fill for reference). Fabric shows texture (subtle brushed fleece). Visible neckline and sleeve cuffs. Soft shadow base. Neutral studio background gradient (transparent). | Garment occupies 65-75% of canvas. Artwork area: ~900×1200px on chest, flat plane perspective (no sleeve wrap). Safe zone: 200px margin. Fabric texture should feel natural, not artificial. Shadow: 120px blur, cast 10-15° behind garment. | Scales 1.06→1, opacity 0→1 (same timing as PRODUCT-01). Alternates position (right in layout). | TEMPORARY (Current is placeholder) |
| PRODUCT-03 | Product Reveal | Framed Print Mockup | `/mockups/frame-mockup.svg` → replacement | 2 | 2000×2600px | 3.5:4.55 Portrait | PNG (transparent) | Yes | Premium wood-framed print. Frame: natural wood grain (warm brown, medium tone). Matte white or cream mat board visible. Artwork placeholder area: light blush pink fill. Glass front with subtle reflection (upper-left corner catch light). Frame depth suggests ~1.5" depth. Positioned straight-on. Soft studio shadow beneath frame. Warm lighting consistent with other products. | Artwork area: ~1200×1600px region, flat plane, no perspective distortion (matte under glass). Frame dimensions: ~1600×2100px. Safe margin: 200px. Shadow: 100px blur, positioned directly below frame, ~20% opacity. Lighting: matching PRODUCT-01/02 (45° upper-left key). | Same scale/opacity timing as other products. Central position in editorial layout (alternating left/right rhythm). | TEMPORARY (Current is placeholder) |
| PRODUCT-04 | Product Reveal | Tote Bag Mockup | `/mockups/tote-mockup.svg` → replacement | 2 | 2200×2600px | 3.5:4.14 Portrait | PNG (transparent) | Yes | Premium canvas tote bag. Lay-flat front-facing view (slight perspective depth). Canvas texture visible (subtle weave pattern). Artwork placeholder area: light blush pink on front face (~50% of bag area). Handles visible, rope-style. Studio lighting: matching all products (warm, diffuse). Soft ground shadow. Minimal environmental cues — clean studio aesthetic. | Artwork area: ~1000×1400px on bag front, flat plane. Bag occupies 65% of canvas. Safe zone: 200px margin. Canvas weave: subtle pattern overlay (10% opacity, texture overlay). Shadow: 110px blur, centered below, ~15% opacity. Handle attachment points subtly shaded. | Same scale/opacity as PRODUCT-01/02/03. Right-side position in layout (alternating left→right→left→right). | TEMPORARY (Current is placeholder) |
| **PRODUCT STUDIO SYSTEM** (All four products) |  |  |  |  |  |  |  |  |  |  |  |  |
| PRODUCT-STUDIO | Studio Spec | Shared Lighting & Background | — | 1 | — | — | Reference | — | **All four mockups must photograph/render with identical studio conditions:** Key light 45° upper-left, warm color temperature (3200K), diffuse quality (large softbox or bounce). Neutral gray/white backdrop (clean, no texture). Consistent object scale relationships. | Shadows: soft edge (100-120px blur), direction aligned with key light (upper-left 45°), opacity 12-20%. Color cast: warm (slight sepia/yellow undertone, target ΔE <3 from reference white). Contrast: moderate (no crushed blacks or blown highlights). Saturation: natural, not oversaturated. | — | SPEC ONLY |
| **AUDIENCE SECTION** |  |  |  |  |  |  |  |  |  |  |  |  |
| AUDIENCE-01 | Audience | For Her | `/images/photos/for-her.svg` | 3 | 1600×1800px | 8:9 Portrait | JPG/WebP | No | Lifestyle photography of woman or group of women (or feminine-presenting subject). Warm, aspirational, editorial aesthetic. Could be portrait headshot, fashion-inspired composition, or intimate moment. Emotion: confident, thoughtful, warm. Lighting: natural or studio, soft quality. Color: saturated, warm tones. Subject should occupy 50-70% of frame, left or center. | Subject position: slightly left of center, upper 2/3 of frame (text overlay on lower third). Safe crop: 15% margin. Safe text area: lower 25% of image (overlay typography will sit here with gradient). Background: should be uncluttered or soft-blurred. Crop allows left-edge fade-in animation. | Scales 1.1x on hover (desktop). Position fixed during scroll. Slight opacity shift: 0.7 → 1.0 on active state. | PLACEHOLDER |
| AUDIENCE-02 | Audience | For Him | `/images/photos/for-him.svg` | 3 | 1600×1800px | 8:9 Portrait | JPG/WebP | No | Lifestyle photography of man or group of men (or masculine-presenting subject). Understated, authentic aesthetic. Could be candid portrait, lifestyle moment, or contemplative pose. Emotion: genuine, understated warmth. Lighting: natural, moody-but-clear. Color: slightly muted compared to AUDIENCE-01, cooler undertones. Subject 50-70% of frame, center or right. | Subject position: center-right of frame, upper 2/3 (text overlay lower third with charcoal gradient). Safe crop: 15% margin. Safe text area: lower 25% for typography overlay. Background: subtle depth (soft bokeh acceptable). Composition should feel candid, not posed. | Same hover scale (1.1x) and opacity behavior as AUDIENCE-01. Fixed position during scroll. | PLACEHOLDER |
| AUDIENCE-03 | Audience | For Pets | `/images/photos/for-pets.svg` | 3 | 1600×1800px | 8:9 Portrait | JPG/WebP | No | Photography of pet (dog, cat, or other beloved animal). Warm, personality-filled composition. Could be portrait, action moment, or cozy scene. Emotion: joyful, endearing, authentically adorable. Lighting: warm, playful. Color: rich, saturated. Pet occupies 60-75% of frame. | Pet positioned center-upper in frame (50-65% from top). Safe text area: lower 20% for "For Pets" copy with teal gradient overlay. Safe crop: 15% margin. Background: can be busy or blurred, but should not distract from pet. Composition: engage with viewer (pet looking at camera preferred, but action shots acceptable). | Same hover/active behavior: 1.1x scale, opacity 0.7→1.0. Position fixed. | PLACEHOLDER |
| **EMOTIONAL STORY SECTION (Marquee Loop)** |  |  |  |  |  |  |  |  |  |  |  |  |
| EMOTION-01 | Emotional Story | Frame: Pet | `/images/photos/pet.svg` | 4 | 1400×1760px | 8:10 Portrait | JPG/WebP | No | Candid pet moment. Warm, genuine, emotionally authentic. Natural or studio lighting. Clean composition. | Frame dimensions: 1400×1760px (display: 220px desktop, 170px mobile). Safe crop: 30px margin. Subject should be centered, fully visible. Pet showing personality/emotion (playing, resting, interacting). | Loops horizontally in marquee at 42s/50s cycles (depending on row). Opacity 70% in loop. No parallax. | PLACEHOLDER |
| EMOTION-02 | Emotional Story | Frame: Couple | `/images/photos/couple.svg` | 4 | 1400×1760px | 8:10 Portrait | JPG/WebP | No | Intimate moment between two people. Warm, candid, genuine emotion (not posed/stiff). Natural lighting preferred. Authentic connection. | Frame: 1400×1760px. Safe crop: 30px margin. Subjects close together, showing affection or shared moment. Emotion should read clearly. | Loops in second marquee row (reverse direction) at 50s. Opacity 70%. | PLACEHOLDER |
| EMOTION-03 | Emotional Story | Frame: Family | `/images/photos/family.svg` | 4 | 1400×1760px | 8:10 Portrait | JPG/WebP | No | Family group moment (3-5 people including child/children). Warm, joyful, genuine interaction. Natural or home setting. Soft lighting. | Frame: 1400×1760px. Safe crop: 30px margin. Subjects arranged intimately, showing family bonds. Could be posed or candid, but should feel authentic/unforced. | Loops in first marquee row at 42s. Opacity 70%. | PLACEHOLDER |
| EMOTION-04 | Emotional Story | Frame: Friends | `/images/photos/friends.svg` | 4 | 1400×1760px | 8:10 Portrait | JPG/WebP | No | Group of 2-4 friends, genuine connection, playful or tender moment. Warm, relatable aesthetic. Natural setting or soft studio. | Frame: 1400×1760px. Safe crop: 30px margin. Subjects showing friendship (arms around each other, laughing, intimate conversation). Emotion: warmth, belonging. | Loops in second row (reverse) at 50s. Opacity 70%. | PLACEHOLDER |
| EMOTION-05 | Emotional Story | Frame: Baby | `/images/photos/baby.svg` | 4 | 1400×1760px | 8:10 Portrait | JPG/WebP | No | Intimate moment with baby/infant (parent+baby or baby alone). Tender, soft, dreamy quality. Soft lighting, warm color temperature. Depth of field: shallow (soft background). | Frame: 1400×1760px. Safe crop: 30px margin. Baby centered. Emotion: tenderness, vulnerability, hope. Could show parent-baby bonding or baby alone (peaceful sleep, play). | Loops in first row at 42s. Opacity 70%. | PLACEHOLDER |
| **STYLE SELECTOR** |  |  |  |  |  |  |  |  |  |  |  |  |
| STYLE-00 | Style Selector | Base Portrait (Photo) | `/images/photos/portrait-sample.svg` | 5 | 2000×2500px | 4:5 Portrait | JPG/WebP | No | Single person portrait: warm, relatable, professional. Could be woman, man, or non-binary person. Neutral studio or soft natural lighting. Warm color temperature. Head/shoulders or full upper body (bust line at 2/3 mark). Genuine, approachable expression. **Must remain consistent as base for all six styles.** | Subject: center-frame, eyes at ~40% from top. Safe crop: 20% margin. Single subject (not group). Background: soft blur or neutral tone (will be obscured by style filters in prototype, but final versions use isolated subject). Lighting: frontal or 45° key light. Facial features should be readable at all six styles. | Static (no animation during selector interaction). CSS filters applied in prototype; final version uses pre-rendered artwork. | PLACEHOLDER |
| STYLE-01 | Style Selector | Minimal Style | Variant of STYLE-00 | 5 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Same subject as STYLE-00, rendered in minimal art style: line-work dominant, sparse color fills, grayscale + single accent (charcoal). Clean, editorial aesthetic. Details: simplified facial features, flowing lines, high contrast. Background: transparent or light cream. | Composition identical to photo (same pose, angle, head position). Scale: 100% match to base photo. Minimal rendering with strong black outlines and negative space. Accent color: single spot (charcoal). Could use spot color technique. | Rendered/displayed on demand when selector clicked. No animation during render. | PLACEHOLDER |
| STYLE-02 | Style Selector | Cute Style | Variant of STYLE-00 | 5 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Same subject, cute/playful art style: rounded forms, slightly exaggerated features, warm colors, softer edges. Approachable, friendly aesthetic. Vector-style illustration. Background: transparent. | Composition aligned to STYLE-00. Subject features slightly softened/rounded. Eye size may increase slightly (cuteness factor). Colors: saturated warm palette (pinks, peaches, corals). Line weight: medium-light. | On-demand rendering. | PLACEHOLDER |
| STYLE-03 | Style Selector | Storybook Style | Variant of STYLE-00 | 5 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Same subject, storybook illustration style: painterly brushstrokes, sepia/warm tones, vintage-book aesthetic, medium detail. Nostalgic, warm feeling. Illustrative line work. Background: transparent. | Composition matches STYLE-00. Details: storybook-appropriate (not hyper-realistic, not cartoonish). Color: sepia/brown/golden undertones, slight texture/grain. Medium saturation. Artistic, hand-drawn quality. | On-demand rendering. | PLACEHOLDER |
| STYLE-04 | Style Selector | Retro Style | Variant of STYLE-00 | 5 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Same subject, retro/vintage art style (1960s-70s aesthetic): limited color palette (3-4 colors + black), screen-print quality, bold outlines, slightly posterized. Nostalgic, warm, graphic. Background: transparent. | Composition as STYLE-00. Style: screen-print technique appearance. Colors: warm yellows, oranges, reds, minimal greens. High contrast. Outlines: bold, clean. Posterization: 2-3 levels. | On-demand rendering. | PLACEHOLDER |
| STYLE-05 | Style Selector | Bold Style | Variant of STYLE-00 | 5 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Same subject, bold/graphic art style: high contrast, strong colors, simplified forms, graphic design feel. Energetic, modern, striking. Vector-based. Background: transparent. | Composition as STYLE-00. Details: dramatically simplified. Colors: bold, high saturation, possibly single-color highlights. Silhouette-strong composition. Outlines: heavy, crisp. Near-poster aesthetic. | On-demand rendering. | PLACEHOLDER |
| STYLE-06 | Style Selector | Romantic Style | Variant of STYLE-00 | 5 | 2000×2500px | 4:5 Portrait | PNG (transparent) | Yes | Same subject, romantic/dreamy art style: soft edges, watercolor or soft-brush aesthetic, pastel or warm muted colors, ethereal quality. Tender, intimate feeling. Illustrative. Background: transparent. | Composition as STYLE-00. Details: slightly diffused edges (soft-focus effect). Colors: muted, pastel or warm neutrals. Technique: watercolor-like or soft brush texture. Low contrast (dreamy). | On-demand rendering. | PLACEHOLDER |
| **SOCIAL PROOF / UGC SECTION** |  |  |  |  |  |  |  |  |  |  |  |  |
| UGC-01 | Social Proof | Reel Thumbnail: Unboxing Mug | `/images/ugc/reel-1.svg` | 6 | 1200×1500px | 4:5 Portrait (vertical) | JPG/WebP | No | Video thumbnail: Person unboxing/revealing custom mug. Warm, genuine reaction moment. Hands visible, mug clearly shown with custom artwork. Lighting: natural or warm studio. Emotion: delight, surprise. Could show artwork detail on mug. Text-safe area: 15% margin from edges. | Frame: 1200×1500px. Subject (person + mug) occupies 70-80%. Safe text zone: outer 15%. Label text overlay: "Unboxing a coral mug" (white text, drop shadow). Background: uncluttered. Hands/mug: centered-right. Face/expression: visible, engaged. | Static thumbnail (no animation). Hover scale 1.05x on desktop. | PLACEHOLDER |
| UGC-02 | Social Proof | Reel Thumbnail: Pet Portrait Reveal | `/images/ugc/reel-2.svg` | 6 | 1200×1500px | 4:5 Portrait | JPG/WebP | No | Video thumbnail: Person (hand) or pet revealing/showing framed pet portrait. Pet portrait artwork clearly visible. Warm, intimate moment. Could show proud/delighted facial expression or pet's reaction. Lighting: warm. Emotion: joy, pride, connection. | Frame: 1200×1500px. Framed artwork occupies 60-70%, centered. Person's face/hands: 30-40% of frame. Safe text zone: 15% margin. Label: "Pet portrait reveal" (white text, drop shadow). Background: soft/blurred. | Static. Hover 1.05x scale. | PLACEHOLDER |
| UGC-03 | Social Proof | Reel Thumbnail: Print Unwrapping | `/images/ugc/reel-3.svg` | 6 | 1200×1500px | 4:5 Portrait | JPG/WebP | No | Video thumbnail: Hands unwrapping or revealing framed print. Print artwork clearly visible. Warm, authentic reaction moment. Could show facial expression of recipient. Lighting: warm, natural or studio. Emotion: anticipation, delight, gratitude. | Frame: 1200×1500px. Print/artwork occupies 50-65%. Hands/person: 35-50%. Safe text zone: 15% margin. Label: "Framed print unwrapping" (white text, drop shadow). Background: blurred or neutral. Lighting: warm, consistent with product shots. | Static. Hover 1.05x. | PLACEHOLDER |
| **FINAL CTA SECTION** |  |  |  |  |  |  |  |  |  |  |  |  |
| CTA-01 | Final CTA | Gift Box Scene | Procedural CSS/SVG | 7 | — | — | CSS/SVG | — | **Recommendation: KEEP PROCEDURAL.** Current CSS + SVG bow works well. No replacement image asset needed. Procedural rendering is performant, scales perfectly, and motion choreography is strong. If aesthetic change needed, consider minor CSS refinements (shadow depth, color adjustments) rather than image replacement. | Current implementation: solid coral box + cream ribbon/bow + radial glow. Performance: excellent. Accessibility: good (aria-hidden semantic). Animation: smooth, no jank. Verdict: No replacement needed for MVP. | Pinned scroll animation: bow flies away, lid rotates open, glow intensifies. Complex choreography works well in current form. | FINAL (Keep as-is) |

---

## Asset Production Order

### Batch 1: Hero Foundation (Critical Path Start)
Build these first to establish brand visual language and photography direction.

1. **HERO-01** (Primary photo) — Directional asset; establishes subject type, lighting, emotion
2. **HERO-02** (Secondary photo) — Complements primary; tests layering aesthetic
3. **HERO-03** (Tertiary photo) — Completes hero composition; confirms depth system

**Why First:** Hero section is first impression. Quality here cascades to all other sections. Establishes studio lighting, color temperature, and photography style for all subsequent assets.

---

### Batch 2: Transformation Sequence (High Priority)
Build complete transformation chain from one subject. This is the most complex asset family and requires perfect alignment.

4. **TRANSFORM-01** (Pet photo) — Select single memorable pet subject
5. **TRANSFORM-02** (Pet artwork) — Illustrate the exact same pet, pixel-perfect position
6. **TRANSFORM-03** (Mug mockup) — Final product showing artwork on ceramic; validates product mockup style

**Why Second:** Transformation is the core value proposition. Quality and coherence here is non-negotiable. Establishes product mockup visual language for PRODUCT-01/02/03/04.

---

### Batch 3: Product Mockups (Consistent Studio System)
All four products must photograph/render in same studio with identical lighting and background treatment.

7. **PRODUCT-01** (Mug) — Establishes studio system and mockup quality bar
8. **PRODUCT-02** (Tee) — Matches PRODUCT-01 lighting/background; tests garment complexity
9. **PRODUCT-03** (Frame) — Validates frame rendering; ensures glass reflections consistent
10. **PRODUCT-04** (Tote) — Completes product family; confirms textile rendering

**Why Third:** Products support both Transformation and Product Reveal sections. Studio system from Batch 2 should be referenced. All four benefit from single, cohesive shoot/render session.

---

### Batch 4: Supporting Photography (Audience + Emotion)
Lifestyle and moment-based photography to round out sections.

11. **AUDIENCE-01** (For Her) — Lifestyle aesthetic; warm, aspirational
12. **AUDIENCE-02** (For Him) — Understated, authentic aesthetic
13. **AUDIENCE-03** (For Pets) — Personality-filled, adorable pet moment
14. **EMOTION-01** (Pet frame) — Candid pet moment (can reuse subject from TRANSFORM-01 if willing)
15. **EMOTION-02** (Couple frame) — Intimate couple moment (consider pairing with AUDIENCE-01 subject)
16. **EMOTION-03** (Family frame) — Multi-person family moment
17. **EMOTION-04** (Friends frame) — Group friendship moment
18. **EMOTION-05** (Baby frame) — Tender parent-baby moment

**Why Fourth:** These support emotional storytelling and audience segmentation. Less critical to core experience than Hero/Transformation/Products, but improve overall brand feel. Can be shot in fewer, consolidated sessions.

---

### Batch 5: Style Variants (High-Touch Art Direction)
Requires skilled illustration/art direction for each style. Base portrait must be selected first.

19. **STYLE-00** (Base portrait) — Select final base subject for all six style variants
20. **STYLE-01** (Minimal) — Line-work, grayscale + accent
21. **STYLE-02** (Cute) — Rounded, playful, warm colors
22. **STYLE-03** (Storybook) — Painterly, sepia/vintage
23. **STYLE-04** (Retro) — Screen-print, limited palette, 70s aesthetic
24. **STYLE-05** (Bold) — High contrast, graphic, posterized
25. **STYLE-06** (Romantic) — Watercolor, soft, dreamy, pastel

**Why Fifth:** Styles enhance perceived customization but are not essential to core flow. Require art director review for brand consistency. Best done after base photography style is confirmed through earlier batches.

---

### Batch 6: Social Proof / UGC (Content & Copy)
Video thumbnails/stills that bridge product and social proof. Can use products from earlier batches if needed.

26. **UGC-01** (Mug unboxing) — Real or styled moment showing custom mug + reaction
27. **UGC-02** (Pet portrait reveal) — Showing framed pet portrait (can repurpose EMOTION-01 as background)
28. **UGC-03** (Print unwrapping) — Showing framed print reveal

**Why Sixth:** Social proof amplifies existing product visibility. Less critical to core purchase flow. Can pull from product shoot outtakes or secondary sessions.

---

## Asset Reuse Opportunities

To optimize production efficiency, plan for intentional asset reuse:

- **TRANSFORM-01 → EMOTION-01:** Same pet subject. If photography session includes candid moments, reuse best candid shot as EMOTION-01.
- **HERO-01 or HERO-02 → STYLE-00 (base portrait):** If hero portrait subject is compelling, consider as style selector base. Requires different composition (head/shoulders), but same person/lighting aesthetic.
- **PRODUCT photography session → UGC backgrounds:** When shooting products, capture lifestyle moments (hands holding, in-situ placement). Repurpose secondary angles as UGC thumbnails.
- **EMOTION-01 (pet) → AUDIENCE-03:** If pet subject is exceptionally photogenic, consider as "For Pets" audience hero. Requires different crop/composition.

---

## Minimum Viable Asset Pack (MVP)

**If budget/timeline constraints exist, prioritize this subset to move site away from "prototype" feeling:**

### Essential (Must Have):
1. **HERO-01** (Primary memory photo) — Emotional anchor
2. **TRANSFORM-01, 02, 03** (Pet photo → Artwork → Mug) — Core value proposition demonstrated
3. **PRODUCT-01, 02, 03, 04** (All product mockups) — Product Reveal credibility
4. **AUDIENCE-01, 02, 03** (Lifestyle triptych) — Segmentation clarity

**Subtotal: 11 assets**  
**Estimated impact:** 75-80% visual uplift. Site no longer feels like placeholder. Core narrative (photo → art → product) fully credible.

---

## Full Premium Asset Pack

**Complete set needed for launch-quality experience:**

### Full specification (all 26 assets above):
- Hero composition (3 photos)
- Transformation chain (3 assets)
- Product mockups (4 assets)
- Audience section (3 photos)
- Emotional story frames (5 moments)
- Style selector variants (6 artwork styles)
- Social proof thumbnails (3 UGC moments)
- Final CTA (keep procedural)

**Total: 26 unique assets (27 files accounting for STYLE-00 base + 6 variants)**

**Estimated impact:** 100% visual polish. Premium, cohesive brand experience. Supports full customization story and emotional narrative.

---

## Asset Specifications Reference

### Image Formats
- **Photography:** JPG (85-92 quality) or WebP (80-85 quality)
- **Artwork/Transparent:** PNG (indexed if possible) or WebP with alpha
- **SVG:** Reserved for procedural elements (currently just CTA box)

### Aspect Ratio Summary
- **Portrait (hero, transformation, styles):** 4:5 (2000×2500px native)
- **Product mockups:** 3.5:4 to 4.55 depending on product (2000-2200px wide)
- **Audience panels:** 8:9 (1600×1800px)
- **Emotion frames:** 8:10 (1400×1760px display; 1400×1750px native)
- **UGC thumbnails:** 4:5 (1200×1500px)

### Transparency Requirements
- Artwork variants (STYLE-01 through STYLE-06): **Transparent PNG**, 8-bit indexed if possible
- Pet illustration (TRANSFORM-02): **Transparent PNG**
- Product mockups (PRODUCT-01 through PRODUCT-04): **Transparent PNG**
- All photography (hero, audience, emotion, UGC): **No transparency** (solid JPG/WebP)

### Color Temperature & Lighting Consistency
- **Hero photos:** Warm (3400K+), soft natural or studio lighting
- **Product mockups:** Warm (3200K), diffuse key light 45° upper-left
- **Audience photos:** Warm to neutral (3200-4500K), Editorial quality lighting
- **Emotion frames:** Warm (3200-3600K), intimate/authentic lighting
- **Shadows:** Soft-edged, 100-120px blur, cast at 45° from key light, 12-20% opacity

---

## Implementation Notes

### For Designers/Art Directors
- Maintain consistent color temperature across all assets (no mixed lighting)
- Product mockups should feel tactile, not stylized (premium product photography aesthetic)
- Photography should prioritize genuine emotion over posed perfection
- Art styles (STYLE-01 through STYLE-06) should feel professionally executed, not DIY
- Ensure all assets photograph/render at sufficiently high resolution for 2K displays

### For Developers
- All JPG/WebP assets should be compressed via ImageOptim or equivalent (target <200KB per image)
- Transparent PNGs should use 8-bit indexed color where possible (<100KB per asset)
- Implement responsive srcset for Hero and Audience images (2x/3x variants for high-DPI)
- No external image CDN required; all assets hosted locally in `/public/images/` or `/public/mockups/`
- Animation choreography in place; assets only need to swap `src` attributes

### For Project Management
- **Batch 1 (Hero):** Estimated 2-3 weeks (photography direction, selection, retouching)
- **Batch 2 (Transformation):** Estimated 2-3 weeks (photo selection, illustration, mockup creation)
- **Batch 3 (Products):** Estimated 2-4 weeks (studio setup, shoot all products in single session, retouching)
- **Batch 4 (Supporting photography):** Estimated 2-3 weeks (lifestyle/moment shoots, selection, retouching)
- **Batch 5 (Styles):** Estimated 3-4 weeks (art direction, illustration iteration, refinement)
- **Batch 6 (UGC):** Estimated 1-2 weeks (content shoot or selection from existing footage)

**Total Timeline:** 12-19 weeks for full premium pack (staggered or parallel batches can compress timeline to 8-10 weeks)

---

## Current Status by Asset

| Asset ID | Current Status | Issues | Replacement Priority |
|:---------|:---------------|:-------|:-------------------:|
| HERO-01/02/03 | PLACEHOLDER (generic SVG) | Illustrative, no personality | HIGH |
| TRANSFORM-01/02/03 | PLACEHOLDER (generic SVG) | Illustrative, no cohesion | HIGH |
| PRODUCT-01/02/03/04 | TEMPORARY (procedural SVG) | Lacks realism, missing detail | HIGH |
| AUDIENCE-01/02/03 | PLACEHOLDER (generic SVG) | Illustrative, no authenticity | MEDIUM |
| EMOTION-01/02/03/04/05 | PLACEHOLDER (generic SVG) | Illustrative, marquee feels hollow | MEDIUM |
| STYLE-00/01/02/03/04/05/06 | PLACEHOLDER (CSS-filtered SVG) | Single base image, CSS filters only | MEDIUM |
| UGC-01/02/03 | PLACEHOLDER (generic SVG) | Illustrative, lacks credibility | LOW-MEDIUM |
| CTA-01 (Gift Box) | FINAL (CSS/SVG procedural) | Excellent execution; no change needed | N/A |

---

## Key Metrics

- **Total Placeholder/Temporary Assets:** 26
- **Total Replacement Assets Required:** 26-27 files
- **Transparency Required:** 10 files (artwork variants + product mockups)
- **JPG/WebP Required:** 17 files (photography)
- **Estimated Disk Space:** ~15-20 MB (all assets, pre-compression)
- **Estimated Compressed Disk Space:** ~4-6 MB (after JPG/WebP optimization)

---

## Sign-Off & Next Steps

**This audit is COMPLETE and READY FOR PRODUCTION BRIEFING.**

### What This Document Is:
✅ Inspection of current implementation  
✅ Specification for each replacement asset  
✅ Production order to optimize efficiency  
✅ Reuse opportunities to reduce costs  
✅ MVP and full pack definitions  

### What This Document Is NOT:
❌ Design direction or visual mood board (scope: specifications only)  
❌ Production timeline commitments (estimates given; actual depends on resources)  
❌ Asset generation or replacement (no files modified)  
❌ Code changes or deployment instructions  

### To Proceed:
1. **Art Director Review:** Review specifications and propose visual direction (photography style, lighting, color grading, illustration approach)
2. **Production Scheduling:** Prioritize batches based on resource availability and launch timeline
3. **Asset Creation:** Photograph, illustrate, or render per specifications
4. **Implementation:** Swap asset paths in code (no changes to design/layout/animation required)
5. **QA & Launch:** Verify all assets load correctly and render on target devices

---

**Document Owner:** Claude Code (Asset Audit Pass)  
**Date:** August 9, 2026  
**Status:** Ready for Art Director Briefing
