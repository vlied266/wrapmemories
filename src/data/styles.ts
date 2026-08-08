export type StyleOption = {
  key: string;
  label: string;
  image: string;
  /** CSS filter applied to the shared base portrait to simulate a style pass. */
  filter: string;
  swatch: string;
};

export const STYLE_OPTIONS: StyleOption[] = [
  {
    key: "minimal",
    label: "Minimal",
    image: "/images/artwork/style-minimal.svg",
    filter: "grayscale(0.5) contrast(1.05) brightness(1.05)",
    swatch: "#263238",
  },
  {
    key: "cute",
    label: "Cute",
    image: "/images/artwork/style-cute.svg",
    filter: "saturate(1.5) hue-rotate(-8deg) brightness(1.08)",
    swatch: "#F26B5B",
  },
  {
    key: "storybook",
    label: "Storybook",
    image: "/images/artwork/style-storybook.svg",
    filter: "sepia(0.35) saturate(1.2) contrast(1.05)",
    swatch: "#B5793F",
  },
  {
    key: "retro",
    label: "Retro",
    image: "/images/artwork/style-retro.svg",
    filter: "sepia(0.5) hue-rotate(-20deg) saturate(1.4)",
    swatch: "#C1543A",
  },
  {
    key: "bold",
    label: "Bold",
    image: "/images/artwork/style-bold.svg",
    filter: "contrast(1.4) saturate(1.6) brightness(0.95)",
    swatch: "#1A2126",
  },
  {
    key: "romantic",
    label: "Romantic",
    image: "/images/artwork/style-romantic.svg",
    filter: "saturate(1.3) hue-rotate(-10deg) brightness(1.1) contrast(0.95)",
    swatch: "#C9483A",
  },
];
