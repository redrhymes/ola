import type { MetadataRoute } from "next";
import { modelsData } from "@/data/vehicles";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"; // TODO: configure the live site origin.

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/comparison",
    "/finance",
    "/book",
    ...modelsData.map((model) => `/products/${model.slug}`),
  ];
  return routes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: new Date(),
    changeFrequency:
      route === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "/" ? 1 : route === "/contact" ? 0.8 : 0.7,
  }));
}
