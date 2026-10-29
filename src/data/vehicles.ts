import { BatteryFull, Gauge, Zap } from "lucide-react";
import { images } from "./images";

export type VehicleType = "scooter" | "motorcycle";

export type VehicleModelData = {
  id: string;
  slug: string;
  type: VehicleType;
  brand: "OLA";
  model: string;
  generation?: string;
  tagline: string;
  price: {
    startingLabel: string;
    monthly?: string;
    full?: string;
    fullPrefix?: "OR"; // shown when monthly exists
  };
  priceNote?: string;
  priceReference?: string;
  headline?: string;
  facts: string[];
  variants: ProductVariant[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  imageKey: keyof typeof images.vehicles;
  imageTone: "light" | "dark";
};

export type ProductVariant = {
  label: string;
  battery?: string;
  claimedRange?: string;
  topSpeed?: string;
  peakPower?: string;
  acceleration?: string;
  facts?: string[];
  priceReference?: string;
  reservationReference?: string;
  expectedDelivery?: string;
  performanceNote?: string;
};

const verifyPrice = "Verify current official price";

export const modelsData: VehicleModelData[] = [
  {
    id: "s1-z",
    slug: "s1-z",
    type: "scooter",
    brand: "OLA",
    model: "S1 Z",
    tagline: "Electric scooter",
    price: { startingLabel: verifyPrice },
    facts: [],
    variants: [
      { label: "3.1 kWh", battery: "3.1 kWh", claimedRange: "179 km", topSpeed: "70 km/h", peakPower: "4 kW", facts: ["LFP battery", "MoveOS 5"], priceReference: "₹79,999", reservationReference: "₹999", expectedDelivery: "December 2026" },
      { label: "5.1 kWh", battery: "5.1 kWh", claimedRange: "301 km", topSpeed: "70 km/h", peakPower: "4 kW", facts: ["LFP battery", "MoveOS 5"], priceReference: "₹99,999", reservationReference: "₹999", expectedDelivery: "March 2027" },
    ],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "s1z",
    imageTone: "light",
  },
  {
    id: "s1-pro-plus",
    slug: "s1-pro-plus",
    type: "scooter",
    brand: "OLA",
    model: "S1 Pro+",
    generation: "3rd Gen",
    tagline: "3rd Gen",
    price: { startingLabel: verifyPrice },
    priceReference: "1,49,999",
    priceNote: "Price shown in the supplied reference image; verify current official pricing.",
    facts: [],
    variants: [
      { label: "5.2 kWh", battery: "5.2 kWh", claimedRange: "320 km", topSpeed: "130 km/h", peakPower: "13 kW", acceleration: "2.1 s (0–40 km/h)" },
      { label: "4 kWh", battery: "4 kWh", claimedRange: "242 km", topSpeed: "128 km/h", peakPower: "13 kW", acceleration: "2.3 s (0–40 km/h)" },
    ],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "s1proPlus",
    imageTone: "dark",
  },
  {
    id: "s1-pro",
    slug: "s1-pro",
    type: "scooter",
    brand: "OLA",
    model: "S1 Pro",
    generation: "3rd Gen",
    tagline: "3rd Gen",
    price: { startingLabel: verifyPrice },
    priceReference: "1,30,999",
    priceNote: "Price shown in the supplied reference image; verify current official pricing.",
    facts: [],
    variants: [
      { label: "4 kWh", battery: "4 kWh", claimedRange: "242 km", topSpeed: "125 km/h", peakPower: "11 kW", acceleration: "2.7 s (0–40 km/h)" },
      { label: "3 kWh", battery: "3 kWh", claimedRange: "176 km", topSpeed: "117 km/h", peakPower: "11 kW", acceleration: "2.7 s (0–40 km/h)" },
    ],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "s1pro",
    imageTone: "dark",
  },
  {
    id: "s1-x-plus",
    slug: "s1-x-plus",
    type: "scooter",
    brand: "OLA",
    model: "S1 X+",
    generation: "3rd Gen",
    tagline: "3rd Gen",
    price: { startingLabel: verifyPrice },
    priceReference: "1,21,999",
    priceNote: "Price shown in the supplied reference image; verify current official pricing.",
    facts: [],
    variants: [
      { label: "5.2 kWh", battery: "5.2 kWh", claimedRange: "320 km", topSpeed: "125 km/h", peakPower: "11 kW", facts: ["Front disc: Yes", "CBS"] },
      { label: "4 kWh", battery: "4 kWh", claimedRange: "242 km", topSpeed: "125 km/h", peakPower: "11 kW", facts: ["Front disc: Yes", "CBS", "4.3-inch coloured segmented LCD"] },
    ],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "s1xPlus",
    imageTone: "dark",
  },
  {
    id: "s1-x",
    slug: "s1-x",
    type: "scooter",
    brand: "OLA",
    model: "S1 X",
    generation: "3rd Gen",
    tagline: "3rd Gen",
    price: { startingLabel: verifyPrice },
    priceReference: "80,999",
    priceNote: "Price shown in the supplied reference image; verify current official pricing.",
    facts: ["4.3-inch coloured segmented LCD", "CBS"],
    variants: [
      { label: "4 kWh", battery: "4 kWh", claimedRange: "242 km", topSpeed: "123 km/h", peakPower: "7 kW" },
      { label: "3 kWh", battery: "3 kWh", claimedRange: "176 km", topSpeed: "115 km/h", peakPower: "7 kW" },
      { label: "2 kWh", battery: "2 kWh", claimedRange: "108 km", topSpeed: "101 km/h", peakPower: "7 kW" },
    ],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "s1x",
    imageTone: "dark",
  },
  {
    id: "s1-pro-sport",
    slug: "s1-pro-sport",
    type: "scooter",
    brand: "OLA",
    model: "S1 Pro Sport",
    generation: "Gen 3",
    tagline: "All-Rounder. All Sport.",
    price: { startingLabel: "Reference introductory price", full: "1,49,999" },
    priceNote: "Reference price; verify before relying on current price or availability.",
    facts: ["4680 Bharat Cell", "Ferrite Motor", "MoveOS"],
    variants: [{ label: "Variants and specifications coming soon" }],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "s1proSport",
    imageTone: "dark",
  },
  {
    id: "roadster-x",
    slug: "roadster-x",
    type: "motorcycle",
    brand: "OLA",
    model: "Roadster X",
    tagline: "Electric motorcycle",
    price: { startingLabel: verifyPrice },
    priceReference: "95,280",
    priceNote: "Price shown in the supplied reference image; verify current official pricing.",
    headline: "Model-family figures: IDC range 252 km · Top speed 118 km/h · Peak power 7 kW · 0–40 km/h 3.1 s",
    facts: ["Available in 4.5 / 3.5 / 2.5 kWh battery capacities", "Brake-by-wire"],
    variants: [
      { label: "4.5 kWh", battery: "4.5 kWh", performanceNote: "Verify before publishing variant-wise performance" },
      { label: "3.5 kWh", battery: "3.5 kWh", performanceNote: "Verify before publishing variant-wise performance" },
      { label: "2.5 kWh", battery: "2.5 kWh", performanceNote: "Verify before publishing variant-wise performance" },
    ],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "roadsterX",
    imageTone: "dark",
  },
  {
    id: "roadster-x-plus",
    slug: "roadster-x-plus",
    type: "motorcycle",
    brand: "OLA",
    model: "Roadster X+",
    tagline: "Electric motorcycle",
    price: { startingLabel: verifyPrice },
    priceReference: "1,23,999",
    priceNote: "Price shown in the supplied reference image; verify current official pricing.",
    facts: ["Available in 9.1 / 4.5 kWh battery capacities"],
    variants: [
      { label: "9.1 kWh", battery: "9.1 kWh", claimedRange: "500 km", topSpeed: "125 km/h", peakPower: "11 kW", acceleration: "2.7 s (0–40 km/h)", facts: ["Front disc", "Brake-by-wire"] },
      { label: "4.5 kWh", battery: "4.5 kWh" },
    ],
    primaryCta: { label: "Enquire Now", href: "/#test-ride" },
    secondaryCta: { label: "Book a Test Ride", href: "/#test-ride" },
    imageKey: "roadsterXPlus",
    imageTone: "dark",
  },
];

export const vehicleMenuModels: Record<
  VehicleType,
  { id: string; model: string }[]
> = {
  scooter: modelsData
    .filter((model) =>
      ["s1-z", "s1-pro-plus", "s1-x-plus", "s1-pro-sport"].includes(model.id),
    )
    .map(({ id, model }) => ({ id, model })),
  motorcycle: modelsData
    .filter((model) => model.type === "motorcycle")
    .map(({ id, model }) => ({ id, model })),
};

export const featuredVehicle = {
  vehicleId: "s1-pro-plus",
  eyebrow: "FEATURED VEHICLE",
  // TODO: design reference says "Ola S1 Pro"; confirm title for S1 Pro+ record.
  title: "Ola S1 Pro+",
  description:
    "A smarter, cleaner and more connected way to move. Experience powerful performance, modern design and advanced technology with the Ola S1 Pro+.",
  specs: [
    { label: "Range", value: "TBC", prefix: "Up to", unit: "km", icon: Zap },
    {
      label: "Top Speed",
      value: "TBC",
      prefix: "Up to",
      unit: "km/h",
      icon: Gauge,
    },
    {
      label: "Battery Capacity",
      value: "TBC",
      unit: "kWh",
      icon: BatteryFull,
    },
  ],
  primaryCta: {
    label: "Enquire Now",
    href: "#test-ride?vehicle=s1-pro-plus",
  },
  secondaryCta: {
    label: "View Specifications",
    href: "#compare",
  },
} as const;

// Preserved for comparison table sections
export type VehicleCategory = "Scooter" | "Motorcycle";

export type VehicleSpecs = {
  range: string;
  topSpeed: string;
  battery: string;
  chargingTime: string;
  motorType: string;
  display: string;
  bootSpace: string;
  variants: string[];
};

export type Vehicle = {
  id: string;
  name: string;
  category: VehicleCategory;
  description: string;
  image: string;
  imageAlt: string;
  price: string;
  specs: VehicleSpecs;
};

const unverifiedVehicleSpecs: VehicleSpecs = {
  range: "TBC",
  topSpeed: "TBC",
  battery: "TBC",
  chargingTime: "TBC",
  motorType: "TBC",
  display: "TBC",
  bootSpace: "TBC",
  variants: ["TBC"],
};

export const vehicles: Vehicle[] = modelsData.map((model) => ({
  id: model.id,
  name: `${model.brand} ${model.model}`,
  category: model.type === "scooter" ? "Scooter" : "Motorcycle",
  description: model.tagline,
  image: images.vehicles[model.imageKey],
  imageAlt: `${model.brand} ${model.model} electric ${model.type}`,
  price:
    model.id === "s1-pro-sport"
      ? "Reference introductory price ₹1,49,999 (unverified)"
      : model.id === "s1-z"
        ? "Reference introductory prices vary by variant (unverified)"
        : model.priceReference
          ? `Reference starting price ₹${model.priceReference} (unverified)`
        : "Verify current official price",
  specs: {
    ...unverifiedVehicleSpecs,
    variants: [model.model],
  },
}));

export const comparisonSpecLabels = [
  { key: "battery", label: "Battery Capacity" },
  { key: "range", label: "Claimed Range" },
  { key: "topSpeed", label: "Top Speed" },
  { key: "chargingTime", label: "Charging Time (0-100%)" },
  { key: "motorType", label: "Motor Type" },
  { key: "display", label: "Display" },
  { key: "bootSpace", label: "Boot Space" },
  { key: "variants", label: "Variants" },
] as const satisfies ReadonlyArray<{
  key: keyof VehicleSpecs;
  label: string;
}>;
