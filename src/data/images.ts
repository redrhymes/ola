// Image registry for typed asset management
// Recommended export for vehicle cards: 1100x980 WebP (aspect 9/8), scooter centered, with room at bottom for background fade

export const images = {
  // TODO: Ola official logo SVG wordmark
  logoMark: "",
  featured: {
    banner: "/images/about.png",
    bannerObjectPosition: "left center",
  },
  finance: {
    main: "/images/finance.png",
    objectPosition: "center",
  },
  testRide: {
    main: "/images/form.png",
    objectPosition: "center bottom",
    alt: "White Ola Electric scooter in a bright studio beside a plant",
  },
  showroom: {
    exterior: "",
    interior: "",
    // TODO: reuse in Gallery or delete if unused.
  },
  avatars: [
    "",
    "",
    "",
  ] as const, // TODO: /images/avatar-1.webp ... 400x400 (1:1), face centered, only use photos the customer has agreed to share.
  ctaBanner: {
    main: "", // TODO: /images/cta-banner.webp, 2400x780 (about 3:1), near-black showroom, scooter on the right, dark space on the left.
    objectPosition: "right center",
  },
  logo: {
    wordmarkWhite: "", // TODO: /images/ola-electric-logo-white.svg, white wordmark, about 40px high.
  },
  vehicles: {
    s1z: "/images/product/scooter/s1_z/s1_z.png",
    s1zPlus: "/images/product/scooter/s1_z/s1_z_plus.png",
    s1proPlus: "/images/product/scooter/s1_pro/s1_pro_plus_gen3.png",
    s1pro: "/images/product/scooter/s1_pro/s1_pro_gen3.png",
    s1xPlus: "/images/product/scooter/s1_x/s1_x_plus_gen3.png",
    s1x: "/images/product/scooter/s1_x/s1_x_gen3.png",
    s1proSport: "/images/product/scooter/s1pro_sport/s1pro_sport.png",
    roadsterX: "/images/product/bike/mrx/mrx.png",
    roadsterXPlus: "/images/product/bike/mrx_plus/mrx_plus.png",
  },
  vehicleHeroes: {
    s1z: "/images/product/scooter/s1_z/s1_zhero.png",
    s1proPlus: "/images/product/scooter/s1_pro/s1_pro_plushero.png",
    s1pro: "/images/product/scooter/s1_pro/s1_pro_plushero.png",
    s1xPlus: "/images/product/scooter/s1_x/s1_x_gen3_plushero.png",
    s1x: "/images/product/scooter/s1_x/s1_x_gen3_plushero.png",
    s1proSport: "/images/product/scooter/s1pro_sport/s1pro_sporthero.png",
    roadsterX: "/images/product/bike/mrx/mrxhero.png",
    roadsterXPlus: "/images/product/bike/mrx_plus/mrxplushero.png",
  },
} as const;

export type ImageKey = keyof typeof images.vehicles;
