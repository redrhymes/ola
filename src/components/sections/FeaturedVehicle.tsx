import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { images } from "@/data/images";
import { featuredVehicle, modelsData } from "@/data/vehicles";

const featuredModel = modelsData.find(
  (model) => model.id === featuredVehicle.vehicleId,
);

if (!featuredModel) {
  throw new Error(
    `Featured vehicle model "${featuredVehicle.vehicleId}" is missing.`,
  );
}

export function FeaturedVehicle() {
  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="relative isolate grid overflow-hidden rounded-[24px] bg-surface shadow-soft lg:aspect-[2.2/1] lg:min-h-[520px] lg:grid-cols-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
            {images.featured.banner ? (
              <Image
                src={images.featured.banner}
                alt="Ola S1 Pro+ electric scooter in a studio setting"
                fill
                sizes="(min-width:1280px) 1280px, 100vw"
                quality={80}
                priority={false}
                className="object-cover"
                style={{
                  objectPosition: images.featured.bannerObjectPosition,
                }}
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-surface to-[#E9EAEE]"
                aria-hidden="true"
              >
                <span className="absolute -left-[10%] top-[7%] size-[78%] rounded-full bg-[#DADCE2]/40 blur-sm" />
                <span className="absolute -left-[3%] top-[24%] size-[70%] rounded-full bg-[#DADCE2]/40 blur-sm" />
                <span className="absolute -left-[13%] top-[48%] size-[78%] rounded-full bg-[#DADCE2]/40 blur-sm" />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-medium text-muted">
                  Featured banner image
                </span>
              </div>
            )}
          </div>

          <div className="relative z-10 bg-surface p-6 md:p-8 lg:col-span-5 lg:col-start-8 lg:flex lg:flex-col lg:justify-center lg:bg-transparent lg:py-12 lg:pl-0 lg:pr-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#4A4D55]">
              {featuredVehicle.eyebrow}
              <span
                className="mt-4 block h-0.5 w-14 bg-brand-red"
                aria-hidden="true"
              />
            </p>

            <h2
              id="featured-title"
              className="mt-7 mb-5 text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-brand-black [text-wrap:balance] lg:whitespace-nowrap"
            >
              {featuredVehicle.title}
            </h2>

            <p className="mb-8 max-w-[520px] text-base leading-[1.6] text-[#4A4D55] [text-wrap:pretty] md:text-lg">
              {featuredVehicle.description}
            </p>

            <dl className="grid grid-cols-3 max-[399px]:grid-cols-1">
              {featuredVehicle.specs.map((spec) => {
                const Icon = spec.icon;
                const hasConfirmedValue = spec.value !== "TBC";

                return (
                  <div
                    key={spec.label}
                    className={[
                      "relative flex min-w-0 flex-col px-3 first:pl-0 sm:px-4 sm:first:pl-0",
                      "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-[#DADCE2] before:content-[''] first:before:hidden",
                      "max-[399px]:flex-row max-[399px]:items-center max-[399px]:gap-4 max-[399px]:border-b max-[399px]:border-[#DADCE2] max-[399px]:px-0 max-[399px]:py-4 max-[399px]:first:pt-0 max-[399px]:last:border-b-0 max-[399px]:before:hidden",
                    ].join(" ")}
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EAEBEE] text-brand-black sm:size-14">
                      <Icon
                        aria-hidden="true"
                        className="size-[22px] stroke-[1.5] sm:size-[26px]"
                      />
                    </span>

                    <span className="min-w-0 max-[399px]:flex max-[399px]:items-baseline max-[399px]:gap-3">
                      <dt className="mt-2 text-xs leading-5 text-[#4A4D55] sm:mt-[14px] sm:text-sm max-[399px]:mt-0">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 break-words text-[15px] font-bold leading-5 text-brand-black sm:text-[17px] max-[399px]:mt-0">
                        {hasConfirmedValue
                          ? [
                              "prefix" in spec ? spec.prefix : undefined,
                              spec.value,
                              "unit" in spec ? spec.unit : undefined,
                            ]
                              .filter(Boolean)
                              .join(" ")
                          : spec.value}
                      </dd>
                    </span>

                  </div>
                );
              })}
            </dl>

            <div className="mt-9 flex flex-col gap-3 min-[640px]:flex-row min-[640px]:flex-wrap min-[640px]:gap-6">
              <a
                href={featuredVehicle.primaryCta.href}
                className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-button bg-brand-red px-6 py-[18px] text-base font-semibold leading-none text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red min-[640px]:min-h-14 min-[640px]:w-auto min-[640px]:flex-1 min-[640px]:px-8 min-[640px]:text-[17px]"
              >
                {featuredVehicle.primaryCta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
                />
              </a>
              <a
                href={featuredVehicle.secondaryCta.href}
                className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-button border border-[#111111] bg-white px-6 py-[18px] text-base font-semibold leading-none text-brand-black transition-colors hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red min-[640px]:min-h-14 min-[640px]:w-auto min-[640px]:flex-1 min-[640px]:px-8 min-[640px]:text-[17px]"
              >
                {featuredVehicle.secondaryCta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
