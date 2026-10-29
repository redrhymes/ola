import { site } from "@/data/site";

export function isAddressPlaceholder(address: string) {
  // Keep the existing ShowroomInfo fallback condition unchanged.
  return address.includes("Your Street Name");
}

export function getMapEmbedSrc(address: string, embedUrl: string) {
  if (embedUrl) return embedUrl;
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export function getSiteMapEmbedSrc() {
  return getMapEmbedSrc(site.address.lines.join(", "), site.mapEmbedUrl);
}
