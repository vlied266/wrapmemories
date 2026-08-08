export type Reaction = {
  quote: string;
  attribution: string;
  size?: "sm" | "md" | "lg";
};

export const REACTIONS: Reaction[] = [
  { quote: "STOP. Is that Milo?!", attribution: "Jenna, on a mug", size: "lg" },
  { quote: "My dad actually cried.", attribution: "Priya, framed print", size: "md" },
  { quote: "This is so us.", attribution: "Marcus & Dee, sweatshirt", size: "lg" },
  { quote: "I wasn't ready for how good this looks in person.", attribution: "Alina, tote bag", size: "sm" },
  { quote: "She screamed. Actually screamed.", attribution: "Tom, birthday gift", size: "md" },
  { quote: "We put it right by the door.", attribution: "The Osei family", size: "sm" },
];

export type UgcThumbnail = {
  image: string;
  label: string;
};

export const UGC_THUMBNAILS: UgcThumbnail[] = [
  { image: "/images/ugc/reel-1.svg", label: "Unboxing a coral mug" },
  { image: "/images/ugc/reel-2.svg", label: "Pet portrait reveal" },
  { image: "/images/ugc/reel-3.svg", label: "Framed print unwrapping" },
];
