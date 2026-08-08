export type ProductStage = {
  key: string;
  name: string;
  verb: string;
  image: string;
  color: string;
};

export const PRODUCT_STAGES: ProductStage[] = [
  { key: "mug", name: "Mug", verb: "Hold it.", image: "/images/products/mug.svg", color: "#6FA7A2" },
  { key: "tshirt", name: "T-shirt", verb: "Wear it.", image: "/images/products/tshirt.svg", color: "#F26B5B" },
  { key: "print", name: "Framed print", verb: "Frame it.", image: "/images/products/print.svg", color: "#263238" },
  { key: "tote", name: "Tote bag", verb: "Carry it.", image: "/images/products/tote.svg", color: "#9CC4C0" },
];
