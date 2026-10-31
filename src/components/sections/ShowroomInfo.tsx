import {
  ArrowRight,
  Clock3,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { getSiteMapEmbedSrc, isAddressPlaceholder } from "@/lib/map";

const rowIcons = {
  mapPin: MapPin,
  clock: Clock3,
  phone: Phone,
} as const;

const addressText = site.address.lines.join(", ");
function getDirectionsHref() {
  if (site.mapsUrl) return site.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
}

function getPhoneHref() {
  return `tel:${site.phone.display.replace(/\s/g, "")}`;
}

export function ShowroomInfo() {
  const showMap = Boolean(site.mapEmbedUrl) || !isAddressPlaceholder(addressText);

  return (
    <section
      id="contact"
      aria-labelledby="showroom-title"
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={site.showroom.eyebrow}
          title={site.showroom.title}
          titleId="showroom-title"
          description={site.showroom.description}
          variant="none"
          centered
          className="mb-12 w-full max-w-[760px]"
          titleClassName="mt-5 text-[clamp(38px,4.6vw,64px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-brand-black [text-wrap:balance]"
          descriptionClassName="mx-auto mt-4 max-w-[640px] text-base leading-[1.6] text-[#5A5D66] [text-wrap:balance] md:text-lg"
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <div className="h-full rounded-[20px] border border-[#E3E5EA] bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)] lg:min-h-[500px]">
            <div className="relative h-[300px] overflow-hidden rounded-[14px] bg-[#E9EBEF] md:h-[380px] lg:h-full lg:min-h-[476px]">
              {showMap ? (
                <iframe
                  title="Map showing the Ola Electric dealership location"
                  src={getSiteMapEmbedSrc()}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  width="100%"
                  height="100%"
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#E9EBEF] bg-[linear-gradient(to_right,#dfe2e7_1px,transparent_1px),linear-gradient(to_bottom,#dfe2e7_1px,transparent_1px)] bg-[size:32px_32px] px-6 text-center"
                  aria-label={site.showroom.mapFallbackLabel}
                >
                  <MapPin
                    aria-hidden="true"
                    className="size-10 text-[#6B6F76]"
                    strokeWidth={1.5}
                  />
                  <p className="mt-4 max-w-sm text-base font-medium leading-6 text-[#4A4D55]">
                    {site.showroom.mapFallbackLabel}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[20px] border border-[#E3E5EA] bg-white p-5 md:p-7 lg:min-h-[500px] lg:p-8">
            <ul className="flex-1 divide-y divide-[#DADCE2]">
              {site.showroom.rows.map((row, index) => {
                const Icon = rowIcons[row.icon];
                return (
                  <li
                    key={row.id}
                    className={`flex items-start gap-4 py-4 first:pt-0 last:pb-0 sm:gap-5 lg:py-[18px] ${
                      index === site.showroom.rows.length - 1
                        ? "border-b-0"
                        : ""
                    }`}
                  >
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#E9EAEE] text-brand-black md:size-14 lg:size-[72px]">
                      <Icon
                        aria-hidden="true"
                        className="size-5 stroke-[1.5] md:size-6 lg:size-8"
                      />
                    </span>
                    <div className="min-w-0 flex-1 pt-1">
                      <h3 className="text-lg font-bold leading-[1.2] text-brand-black">
                        {row.title}
                      </h3>

                      {row.id === "address" ? (
                        <address className="mt-2 not-italic text-base leading-[1.55] text-[#4A4D55]">
                          {site.address.lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      ) : null}

                      {row.id === "hours" ? (
                        <dl className="mt-2 space-y-1 text-base leading-[1.55] text-[#4A4D55]">
                          {site.hours.map((hours) => (
                            <div
                              key={hours.days}
                              className="grid grid-cols-1 gap-y-0.5 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:gap-x-3 lg:gap-x-4"
                            >
                              <dt className="sm:min-w-[96px]">{hours.days}</dt>
                              <span aria-hidden="true" className="hidden sm:inline">:</span>
                              <dd className="min-w-0">{hours.time}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}

                      {row.id === "contact" ? (
                        <>
                          <ul className="mt-2 space-y-1.5">
                            {site.dealershipLocations.map(({ name, phone }) => (
                              <li
                                key={name}
                                className="grid grid-cols-1 gap-x-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                              >
                                <span className="text-sm leading-5 text-[#4A4D55]">
                                  {name}
                                </span>
                                <a
                                  href={phone.href}
                                  className="inline-flex min-h-9 items-center text-sm font-semibold leading-5 text-[#4A4D55] hover:text-brand-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
                                >
                                  {phone.display}
                                </a>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-1 text-base leading-[1.55] text-[#4A4D55]">
                            {row.note}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2 sm:gap-4 lg:pt-5">
              <a
                href={getDirectionsHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-between gap-2 rounded-button bg-brand-red px-4 text-base font-semibold leading-none text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:min-h-14 sm:w-[94%] sm:justify-self-center sm:gap-3 sm:px-6 sm:text-[17px]"
              >
                <Navigation
                  aria-hidden="true"
                  className="size-5 shrink-0 sm:size-6"
                />
                <span className="min-w-0 flex-1 whitespace-nowrap text-center">
                  {site.showroom.directionsLabel}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </a>
              <a
                href={getPhoneHref()}
                className="group inline-flex min-h-11 items-center justify-between gap-2 rounded-button border border-[#111] bg-white px-4 text-base font-semibold leading-none text-brand-black transition-colors hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:min-h-14 sm:w-[94%] sm:justify-self-center sm:gap-3 sm:px-6 sm:text-[17px]"
              >
                <Phone aria-hidden="true" className="size-5 shrink-0 sm:size-6" />
                <span className="min-w-0 flex-1 whitespace-nowrap text-center">
                  {site.showroom.callLabel}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
