export type PersonalizationSample = {
  key: string;
  label: string;
  photo: string;
  art: string;
  product: string;
  productLabel: string;
};

export const PERSONALIZATION_SAMPLES: PersonalizationSample[] = [
  {
    key: "pet",
    label: "Pet photo",
    photo: "/images/photos/pet.svg",
    art: "/images/artwork/pet-illustrated.svg",
    product: "/images/products/mug.svg",
    productLabel: "Mug",
  },
  {
    key: "couple",
    label: "Couple photo",
    photo: "/images/photos/couple.svg",
    art: "/images/artwork/couple-stylized.svg",
    product: "/images/products/tshirt.svg",
    productLabel: "Sweatshirt",
  },
  {
    key: "family",
    label: "Family photo",
    photo: "/images/photos/family.svg",
    art: "/images/artwork/family-lineart.svg",
    product: "/images/products/print.svg",
    productLabel: "Framed print",
  },
];
