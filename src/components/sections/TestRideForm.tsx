import Image from "next/image";
import { HardHat, Route, Users } from "lucide-react";
import { TestRideFormCard } from "@/components/forms/TestRideFormCard";
import { images } from "@/data/images";
import { modelsData } from "@/data/vehicles";
import { site } from "@/data/site";

const featureIcons = {
  HardHat,
  Route,
  Users,
} as const;

const testRideVehicles = modelsData.filter((model) => model.type === "scooter");

export function TestRideForm() {
  const imageAvailable = Boolean(images.testRide.main.trim());

  return (
    <section
      id="test-ride"
      aria-labelledby="test-ride-title"
      className="scroll-mt-24 bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:items-stretch lg:grid-cols-[1.25fr_1fr] lg:gap-6">
          <div className="relative min-w-0 lg:flex lg:min-h-[720px] lg:flex-col">
            <div className="relative z-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#2A2C33]">
                {site.testRide.eyebrow}
              </p>

              <h2
                id="test-ride-title"
                className="mb-5 mt-6 after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-[''] max-w-[700px] text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-brand-black [text-wrap:balance]"
              >
                {site.testRide.titleLines[0]}
                <br className="hidden md:block" /> {site.testRide.titleLines[1]}
              </h2>

              <p className="mb-8 max-w-[520px] text-base leading-[1.55] text-[#4A4D55] [text-wrap:pretty] md:text-lg">
                {site.testRide.description}
              </p>

              <ul className="grid max-w-[640px] grid-cols-1 md:grid-cols-3">
                {site.testRide.features.map((feature, index) => {
                  const Icon = featureIcons[feature.icon];
                  return (
                    <li
                      key={feature.title}
                      className={[
                        "relative flex min-w-0 items-center gap-4 border-b border-[#E3E5EA] py-4 first:pt-0 last:border-b-0 last:pb-0",
                        "md:block md:border-b-0 md:px-4 md:py-2 md:pr-6 md:first:pl-0",
                        index > 0
                          ? "md:before:absolute md:before:bottom-2 md:before:left-0 md:before:top-2 md:before:w-px md:before:bg-[#E3E5EA] md:before:content-[''] md:pl-7"
                          : "",
                      ].join(" ")}
                    >
                      <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-[#F1F2F4] text-brand-black md:size-[72px]">
                        <Icon
                          aria-hidden="true"
                          className="size-6 stroke-[1.5] md:size-[30px]"
                        />
                      </span>
                      <span className="min-w-0 md:block">
                        <h3 className="text-[17px] font-bold leading-[1.3] text-brand-black md:mt-4">
                          {feature.title}
                        </h3>
                        <p className="mt-1.5 text-[15px] leading-[1.5] text-[#5A5D66]">
                          {feature.description}
                        </p>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-white lg:mt-auto lg:h-[360px] lg:w-full lg:shrink-0 lg:aspect-auto">
              {imageAvailable ? (
                <Image
                  src={images.testRide.main}
                  alt={images.testRide.alt}
                  fill
                  sizes="(min-width:1024px) 60vw, 100vw"
                  priority={false}
                  quality={80}
                  className="object-contain"
                  style={{ objectPosition: images.testRide.objectPosition }}
                />
              ) : (
                <span
                  className="absolute bottom-4 left-4 text-xs font-medium text-[#6B6F76]"
                  aria-hidden="true"
                >
                  Test ride image
                </span>
              )}
            </div>
          </div>

          <TestRideFormCard vehicles={testRideVehicles} content={site.testRide.form} />
        </div>
      </div>
    </section>
  );
}
