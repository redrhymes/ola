/**
 * Product-detail content slots. Add only product information that has been
 * confirmed; these sections intentionally remain unpopulated for now.
 */
export const productDetailSections = [
  {
    id: "specifications",
    eyebrow: "PRODUCT DETAILS",
    title: "Specifications",
    description: "Confirmed specifications will be added here.",
  },
  {
    id: "features",
    eyebrow: "MADE FOR YOUR RIDE",
    title: "Features",
    description: "Product features will be added here when confirmed.",
  },
  {
    id: "variants",
    eyebrow: "MAKE IT YOURS",
    title: "Variants & colours",
    description: "Available variants and colours will be added here.",
  },
] as const;

export const productDetailCopy = {
  backToVehicles: "Explore all Ola Electric vehicles",
  categoryLabels: {
    scooter: "Electric scooter",
    motorcycle: "Electric motorcycle",
  },
  bookTestRide: "Book a test ride",
  productDetails: "Product details",
  priceDisclaimer:
    "Price shown as listed on this website. Please confirm current pricing and offers with the dealership.",
  productImageMissing: "Product image to be supplied",
  sectionsNavigationLabel: "product page sections",
  pendingContent: "Content pending verified product information.",
} as const;
