export type ProductStage = {
  key: string;
  name: string;
  verb: string;
  image: string;
  color: string;
  layout?: "left" | "right"; // Asymmetrical layout option
};

export const PRODUCT_STAGES: ProductStage[] = [
  {
    key: "mug",
    name: "Mug",
    verb: "Hold it.",
    image: "/mockups/mug-mockup.svg",
    color: "#6FA7A2",
    layout: "left",
  },
  {
    key: "tshirt",
    name: "T-shirt",
    verb: "Wear it.",
    image: "/mockups/tshirt-mockup.svg",
    color: "#F26B5B",
    layout: "right",
  },
  {
    key: "print",
    name: "Framed print",
    verb: "Frame it.",
    image: "/mockups/frame-mockup.svg",
    color: "#263238",
    layout: "left",
  },
  {
    key: "tote",
    name: "Tote bag",
    verb: "Carry it.",
    image: "/mockups/tote-mockup.svg",
    color: "#9CC4C0",
    layout: "right",
  },
];
