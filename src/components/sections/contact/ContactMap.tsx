import { MapPin } from "lucide-react";
import { site } from "@/data/site";
import { getSiteMapEmbedSrc, isAddressPlaceholder } from "@/lib/map";

const addressText = site.address.lines.join(", ");
const hasMap =
  Boolean(site.mapEmbedUrl) || !isAddressPlaceholder(addressText);

export function ContactMap() {
  return (
    <section
      aria-labelledby="contact-map-title"
      className="bg-surface py-14 md:py-20"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            {site.contactPage.mapEyebrow}
          </p>
          <h2
            id="contact-map-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-brand-black md:text-4xl"
          >
            {site.contactPage.form.mapTitle}
          </h2>
        </div>
        <div className="overflow-hidden rounded-[20px] border border-[#E3E5EA] bg-white p-3 shadow-soft">
          <div className="relative min-h-[300px] overflow-hidden rounded-[14px] bg-[#E9EBEF] sm:min-h-[380px] lg:min-h-[460px]">
            {hasMap ? (
              <iframe
                title={site.contactPage.mapFrameTitle}
                src={getSiteMapEmbedSrc()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#E9EBEF] bg-[linear-gradient(to_right,#dfe2e7_1px,transparent_1px),linear-gradient(to_bottom,#dfe2e7_1px,transparent_1px)] bg-[size:32px_32px] px-6 text-center"
                aria-label={site.contactPage.mapFallbackLabel}
              >
                <MapPin
                  aria-hidden="true"
                  className="size-10 text-[#6B6F76]"
                  strokeWidth={1.5}
                />
                <p className="mt-4 max-w-sm text-base font-medium leading-6 text-[#4A4D55]">
                  {site.contactPage.mapFallbackLabel}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
