/**
 * Generate premium mockup placeholders for product reveal section.
 * Creates SVG-based realistic product mockups with shadows, perspective, and material cues.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "../public/mockups");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Premium mug mockup with perspective shadow
const mugMockup = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.15" />
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.08" />
    </filter>
    <linearGradient id="mugGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#f5f5f5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e8e8e8;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="rim" cx="50%" cy="20%" r="50%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
    </radialGradient>
  </defs>

  <!-- Shadow on ground -->
  <ellipse cx="200" cy="340" rx="90" ry="12" fill="#000000" opacity="0.08" filter="url(#shadow)" />

  <!-- Mug body with depth -->
  <g transform="skewY(-2)">
    <path d="M 140 80 Q 130 100 130 160 Q 130 240 160 280 Q 200 310 240 310 Q 280 310 240 280 Q 270 240 270 160 Q 270 100 260 80 Z"
          fill="url(#mugGradient)" filter="url(#shadow)" />

    <!-- Printed artwork area (warm coral/teal blend) -->
    <ellipse cx="200" cy="170" rx="55" ry="70" fill="#E8A89A" opacity="0.85" />
    <circle cx="210" cy="150" r="8" fill="#6FA7A2" opacity="0.6" />
    <circle cx="190" cy="180" r="5" fill="#F26B5B" opacity="0.7" />
    <path d="M 170 190 Q 185 200 200 195" stroke="#6FA7A2" stroke-width="2" fill="none" opacity="0.5" />
  </g>

  <!-- Handle -->
  <path d="M 270 120 Q 310 120 310 180 Q 310 240 270 250"
        stroke="url(#mugGradient)" stroke-width="28" fill="none" filter="url(#shadow)" />

  <!-- Rim highlight -->
  <ellipse cx="200" cy="80" rx="65" ry="15" fill="url(#rim)" />

  <!-- Subtle top interior highlight -->
  <ellipse cx="200" cy="85" rx="50" ry="8" fill="#ffffff" opacity="0.3" />
</svg>`;

// Premium t-shirt mockup with fabric texture
const tshirtMockup = `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.12" />
    </filter>
    <linearGradient id="fabricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#e5e5e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d9d9d9;stop-opacity:1" />
    </linearGradient>
    <pattern id="fabricTexture" patternUnits="userSpaceOnUse" width="4" height="4">
      <circle cx="2" cy="2" r="0.5" fill="#000000" opacity="0.02" />
    </pattern>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="200" cy="460" rx="85" ry="15" fill="#000000" opacity="0.08" filter="url(#shadow)" />

  <!-- Shirt body with subtle wrinkles -->
  <g filter="url(#shadow)">
    <!-- Main body -->
    <path d="M 120 60 L 110 180 Q 110 280 140 380 L 260 380 Q 290 280 290 180 L 280 60 Z"
          fill="url(#fabricGradient)" />

    <!-- Fabric texture overlay -->
    <path d="M 120 60 L 110 180 Q 110 280 140 380 L 260 380 Q 290 280 290 180 L 280 60 Z"
          fill="url(#fabricTexture)" opacity="0.4" />

    <!-- Left shoulder fold shadow -->
    <path d="M 120 60 Q 135 80 135 120 Q 130 100 120 90 Z" fill="#000000" opacity="0.06" />

    <!-- Printed design area (centered) -->
    <rect x="160" y="140" width="80" height="120" rx="4" fill="#F8D5D0" opacity="0.9" />
    <circle cx="180" cy="160" r="8" fill="#6FA7A2" opacity="0.7" />
    <circle cx="210" cy="155" r="6" fill="#F26B5B" opacity="0.8" />
    <path d="M 190 190 Q 205 200 220 190" stroke="#6FA7A2" stroke-width="1.5" fill="none" opacity="0.6" />
    <line x1="170" y1="210" x2="230" y2="210" stroke="#F26B5B" stroke-width="1" opacity="0.5" />
  </g>

  <!-- Sleeves -->
  <g filter="url(#shadow)">
    <path d="M 120 60 L 90 120 Q 80 160 85 200 L 110 180 Z" fill="url(#fabricGradient)" opacity="0.95" />
    <path d="M 280 60 L 310 120 Q 320 160 315 200 L 290 180 Z" fill="url(#fabricGradient)" opacity="0.95" />
  </g>

  <!-- Collar depth -->
  <ellipse cx="200" cy="60" rx="60" ry="8" fill="#000000" opacity="0.04" />
</svg>`;

// Premium framed print mockup with glass reflection
const frameMockup = `<svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.14" />
    </filter>
    <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B7D6B;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#6B5D4F;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5C4E42;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glassShine" cx="30%" cy="20%" r="40%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
    </radialGradient>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="200" cy="450" rx="95" ry="18" fill="#000000" opacity="0.1" filter="url(#shadow)" />

  <!-- Frame outer edge with depth -->
  <rect x="70" y="30" width="260" height="340" rx="2" fill="url(#woodGradient)" filter="url(#shadow)" />

  <!-- Frame inner border (mat) -->
  <rect x="85" y="50" width="230" height="300" rx="1" fill="#FAF8F5" />

  <!-- Artwork behind glass -->
  <rect x="90" y="55" width="220" height="290" fill="#E8A89A" />
  <circle cx="115" cy="80" r="12" fill="#6FA7A2" opacity="0.7" />
  <circle cx="180" cy="70" r="8" fill="#F26B5B" opacity="0.8" />
  <path d="M 140 120 Q 165 140 200 125" stroke="#6FA7A2" stroke-width="2" fill="none" opacity="0.6" />
  <line x1="100" y1="200" x2="290" y2="200" stroke="#F26B5B" stroke-width="1.5" opacity="0.4" />
  <rect x="110" y="240" width="180" height="80" fill="#F8D5D0" opacity="0.5" />

  <!-- Glass reflection/shine -->
  <rect x="85" y="50" width="230" height="300" rx="1" fill="url(#glassShine)" />

  <!-- Top edge highlight on glass -->
  <line x1="90" y1="58" x2="310" y2="58" stroke="#ffffff" stroke-width="1.5" opacity="0.25" />
</svg>`;

// Premium tote bag mockup with fabric drape
const toteMockup = `<svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000000" flood-opacity="0.13" />
    </filter>
    <linearGradient id="canvasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f3f0;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#ece8e3;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ddd7d0;stop-opacity:1" />
    </linearGradient>
    <pattern id="canvasWeave" patternUnits="userSpaceOnUse" width="3" height="3">
      <line x1="0" y1="0" x2="3" y2="0" stroke="#000000" stroke-width="0.3" opacity="0.03" />
      <line x1="0" y1="0" x2="0" y2="3" stroke="#000000" stroke-width="0.3" opacity="0.03" />
    </pattern>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="200" cy="390" rx="88" ry="16" fill="#000000" opacity="0.09" filter="url(#shadow)" />

  <!-- Tote bag body -->
  <g filter="url(#shadow)">
    <!-- Main body with soft geometry -->
    <path d="M 130 80 L 120 280 Q 120 340 160 370 L 240 370 Q 280 340 280 280 L 270 80 Z"
          fill="url(#canvasGradient)" />

    <!-- Canvas texture -->
    <path d="M 130 80 L 120 280 Q 120 340 160 370 L 240 370 Q 280 340 280 280 L 270 80 Z"
          fill="url(#canvasWeave)" opacity="0.6" />

    <!-- Left side shadow for depth -->
    <path d="M 130 80 L 120 280 Q 120 340 160 370 L 155 350 Q 145 320 145 280 L 150 100 Z"
          fill="#000000" opacity="0.08" />

    <!-- Artwork print (front center) -->
    <ellipse cx="200" cy="160" rx="50" ry="80" fill="#F0D0C8" opacity="0.85" />
    <circle cx="185" cy="135" r="9" fill="#6FA7A2" opacity="0.65" />
    <circle cx="215" cy="130" r="7" fill="#F26B5B" opacity="0.75" />
    <path d="M 195 170 Q 215 185 230 170" stroke="#6FA7A2" stroke-width="2" fill="none" opacity="0.55" />
    <line x1="170" y1="210" x2="230" y2="210" stroke="#F26B5B" stroke-width="1" opacity="0.45" />
  </g>

  <!-- Left handle -->
  <path d="M 140 80 Q 130 40 120 20 Q 125 25 140 60"
        stroke="url(#canvasGradient)" stroke-width="18" fill="none" filter="url(#shadow)" />

  <!-- Right handle -->
  <path d="M 260 80 Q 270 40 280 20 Q 275 25 260 60"
        stroke="url(#canvasGradient)" stroke-width="18" fill="none" filter="url(#shadow)" />

  <!-- Handle shadow (subtle depth) -->
  <ellipse cx="130" cy="50" rx="6" ry="2" fill="#000000" opacity="0.05" />
  <ellipse cx="270" cy="50" rx="6" ry="2" fill="#000000" opacity="0.05" />
</svg>`;

const mockups = {
  "mug-mockup.svg": mugMockup,
  "tshirt-mockup.svg": tshirtMockup,
  "frame-mockup.svg": frameMockup,
  "tote-mockup.svg": toteMockup,
};

Object.entries(mockups).forEach(([filename, content]) => {
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, content);
  console.log(`✓ Created ${filepath}`);
});

console.log("\n✓ Premium mockup assets generated successfully!");
