export type GalleryCategory =
  | "Showroom"
  | "Vehicles"
  | "Deliveries"
  | "Events";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
};

export const galleryImages: GalleryImage[] = [];
