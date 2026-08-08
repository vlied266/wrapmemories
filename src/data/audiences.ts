export type AudiencePanel = {
  key: string;
  label: string;
  image: string;
  accent: "coral" | "teal" | "charcoal";
  description: string;
};

export const AUDIENCE_PANELS: AudiencePanel[] = [
  {
    key: "her",
    label: "For Her",
    image: "/images/photos/for-her.svg",
    accent: "coral",
    description: "Portraits, florals and keepsakes made from her favourite moments.",
  },
  {
    key: "him",
    label: "For Him",
    image: "/images/photos/for-him.svg",
    accent: "charcoal",
    description: "Understated pieces that carry the memories he won't say out loud.",
  },
  {
    key: "pets",
    label: "For Pets",
    image: "/images/photos/for-pets.svg",
    accent: "teal",
    description: "The good boys and girls, immortalised in ink and print.",
  },
];

export const AUDIENCE_LINKS = [
  "Couples",
  "Parents",
  "Friends",
  "Kids",
  "Pets",
  "Just Because",
] as const;
