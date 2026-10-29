"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { VehicleCard } from "@/components/ui/VehicleCard";
import type { ProductVariant, VehicleModelData } from "@/data/vehicles";
import { modelsData } from "@/data/vehicles";
import { images } from "@/data/images";

interface ProductDetailPageProps {
  product: VehicleModelData;
}

type VariantSpec = {
  label: string;
  value: string;
};

function getVariantSpecs(variant: ProductVariant): VariantSpec[] {
  return [
    { label: "Battery", value: variant.battery ?? "" },
    {
      label: "Claimed / IDC range",
      value: variant.claimedRange ?? "",
    },
    { label: "Top speed", value: variant.topSpeed ?? "" },
    { label: "Peak power", value: variant.peakPower ?? "" },
  ].filter((spec) => Boolean(spec.value));
}

function variantId(variant: ProductVariant) {
  return variant.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function priceFor(product: VehicleModelData, variant: ProductVariant) {
  return variant.priceReference ?? product.priceReference ?? (product.price.full ? `₹${product.price.full}` : "");
}

function numericPrice(price: string) {
  const parsed = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function getStartingPrice(product: VehicleModelData) {
  const prices = product.variants
    .map((variant) => priceFor(product, variant))
    .filter(Boolean)
    .map((price) => ({ display: price, amount: numericPrice(price) }))
    .filter((price): price is { display: string; amount: number } => price.amount !== undefined)
    .sort((left, right) => left.amount - right.amount);
  return prices[0]?.display;
}

function getVariantImage(product: VehicleModelData, index: number) {
  if (product.id === "s1-z" && index === 1 && "s1zPlus" in images.vehicles) {
    return images.vehicles.s1zPlus;
  }
  return images.vehicles[product.imageKey];
}

function VariantCard({
  product,
  variant,
  index,
}: {
  product: VehicleModelData;
  variant: ProductVariant;
  index: number;
}) {
  const specs = getVariantSpecs(variant);
  const highlights = [...product.facts, ...(variant.facts ?? [])];
  const price = priceFor(product, variant);
  const variantName = variant.battery ?? variant.label;
  const image = getVariantImage(product, index);
  const panelTone =
    product.id === "s1-z"
      ? index === 0
        ? "bg-gradient-to-br from-[#E3F0E2] to-[#F3F8F2]"
        : "bg-gradient-to-br from-[#DCEBF6] to-[#F1F7FC]"
      : "bg-gradient-to-br from-[#F1F2F4] to-white";
  const gridColumns =
    specs.length >= 4 ? "md:grid-cols-4" : specs.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  const priceLabel =
    variant.priceReference || product.id === "s1-pro-sport"
      ? "Introductory price*"
      : "Starting price*";
  const bookingHref = `/book?vehicle=${encodeURIComponent(product.slug)}&variant=${encodeURIComponent(variantId(variant))}`;
  const testRideHref = `/#test-ride?vehicle=${encodeURIComponent(product.slug)}&topic=test-ride`;

  return (
    <article
      aria-labelledby={`variant-title-${product.id}-${index}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6E8EC] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_5px_22px_rgba(0,0,0,0.08)] motion-reduce:transition-none"
    >
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${panelTone}`}>
        <Image
          src={image}
          alt={`${product.brand} ${product.model} ${variantName} electric ${product.type}`}
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <h3
            id={`variant-title-${product.id}-${index}`}
            className="text-2xl font-extrabold leading-tight tracking-[-0.02em] text-brand-black sm:text-[28px]"
          >
            {product.brand} {product.model}
          </h3>
          <span className="rounded-full bg-[#F1F2F4] px-3 py-1.5 text-sm font-semibold text-brand-black">
            {variantName}
          </span>
        </div>

        <dl className={`mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#E3E5EA] bg-[#E3E5EA] ${gridColumns}`}>
          {specs.map((spec) => (
            <div key={spec.label} className="min-w-0 bg-[#F6F7F9] p-3.5 sm:px-4">
              <dt className="text-[13px] leading-snug text-[#6B6F76]">{spec.label}</dt>
              <dd className="mt-1 break-words text-base font-bold text-brand-black">{spec.value}</dd>
            </div>
          ))}
        </dl>
        {variant.claimedRange && (
          <p className="mt-2 text-[13px] leading-5 text-[#6B6F76]">
            Claimed/IDC range is not a real-world range guarantee.
          </p>
        )}

        {highlights.length > 0 && (
          <div className="mt-5">
            <h4 className="text-base font-bold text-brand-black">Highlights</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {highlights.map((highlight, highlightIndex) => (
                <li
                  key={`${highlight}-${highlightIndex}`}
                  className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E6E8EC] bg-white px-3 py-2 text-sm text-[#3A3D45]"
                >
                  <Check aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 border-t border-[#E6E8EC] pt-4">
          {price ? (
            <>
              <p className="text-sm text-[#6B6F76]">{priceLabel}</p>
              <p className="mt-1 text-[30px] font-extrabold leading-tight text-brand-black sm:text-[34px]">
                {price.startsWith("₹") ? price : `₹${price}`}*
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-[#6B6F76]">Price</p>
              <p className="mt-1 text-xl font-bold text-brand-black">Verify current official price</p>
            </>
          )}
          {(variant.reservationReference || variant.expectedDelivery) && (
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {variant.reservationReference && (
                <div>
                  <dt className="text-[#6B6F76]">Reservation amount</dt>
                  <dd className="mt-0.5 font-semibold text-brand-black">{variant.reservationReference}</dd>
                </div>
              )}
              {variant.expectedDelivery && (
                <div>
                  <dt className="text-[#6B6F76]">Expected delivery</dt>
                  <dd className="mt-0.5 font-semibold text-brand-black">{variant.expectedDelivery}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-3 pt-6 min-[480px]:grid-cols-2">
          <a
            href={bookingHref}
            aria-label={`Book ${product.brand} ${product.model} ${variantName}`}
            className="group/button inline-flex min-h-14 items-center justify-center gap-3 rounded-button bg-brand-red px-5 text-base font-semibold tracking-normal text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            Book Now
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover/button:translate-x-0.5 motion-reduce:transition-none" />
          </a>
          <a
            href={testRideHref}
            aria-label={`Test drive ${product.brand} ${product.model} ${variantName}`}
            className="group/button inline-flex min-h-14 items-center justify-center gap-3 rounded-button border border-[#111111] bg-white px-5 text-base font-semibold tracking-normal text-brand-black transition-colors hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            Test Drive
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover/button:translate-x-0.5 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </article>
  );
}

function VariantComparison({ product }: { product: VehicleModelData }) {
  if (product.variants.length < 2) return null;

  const rows = [
    { label: "Battery", value: (variant: ProductVariant) => variant.battery },
    { label: "Claimed / IDC range", value: (variant: ProductVariant) => variant.claimedRange },
    { label: "Top speed", value: (variant: ProductVariant) => variant.topSpeed },
    { label: "Peak power", value: (variant: ProductVariant) => variant.peakPower },
    {
      label: "Highlights",
      value: (variant: ProductVariant) =>
        [...product.facts, ...(variant.facts ?? [])].join(", ") || undefined,
    },
    {
      label: "Introductory price*",
      value: (variant: ProductVariant) => priceFor(product, variant) || "Verify current official price",
    },
    { label: "Reservation amount", value: (variant: ProductVariant) => variant.reservationReference },
    { label: "Expected delivery", value: (variant: ProductVariant) => variant.expectedDelivery },
  ];

  return (
    <section
      id="compare-variants"
      aria-labelledby="compare-variants-title"
      className="bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <h2
          id="compare-variants-title"
          className="text-3xl font-extrabold tracking-[-0.02em] text-brand-black sm:text-4xl"
        >
          Compare Variants
        </h2>
        <div
          className="mt-6 overflow-x-auto rounded-xl border border-[#E3E5EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
          tabIndex={0}
          aria-label={`Compare ${product.brand} ${product.model} variants`}
        >
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of {product.brand} {product.model} variants
            </caption>
            <thead className="bg-[#F1F2F4]">
              <tr>
                <th scope="col" className="sticky left-0 z-10 min-w-48 bg-[#F1F2F4] px-4 py-3 font-bold text-brand-black">
                  Specification
                </th>
                {product.variants.map((variant) => (
                  <th key={variant.label} scope="col" className="min-w-48 px-4 py-3 font-bold text-brand-black">
                    {variant.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.label} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#F6F7F9]"}>
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 px-4 py-3 font-semibold text-brand-black ${rowIndex % 2 === 0 ? "bg-white" : "bg-[#F6F7F9]"}`}
                  >
                    {row.label}
                  </th>
                  {product.variants.map((variant) => (
                    <td key={variant.label} className="px-4 py-3 text-[#3A3D45]">
                      {row.value(variant) || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function MobileProductBar({ product, fromPrice }: { product: VehicleModelData; fromPrice: string }) {
  const [visible, setVisible] = useState(false);
  const [testRideVisible, setTestRideVisible] = useState(false);
  const startingVariant =
    product.variants.find((variant) => priceFor(product, variant) === fromPrice) ??
    product.variants[0];
  const bookingHref = `/book?vehicle=${encodeURIComponent(product.slug)}&variant=${encodeURIComponent(variantId(startingVariant))}`;

  useEffect(() => {
    const hero = document.getElementById("product-hero");
    const testRideSection = document.getElementById("test-ride");
    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    heroObserver.observe(hero);

    const testRideObserver = testRideSection
      ? new IntersectionObserver(([entry]) => setTestRideVisible(entry.isIntersecting), { threshold: 0 })
      : undefined;
    if (testRideSection) testRideObserver?.observe(testRideSection);

    return () => {
      heroObserver.disconnect();
      testRideObserver?.disconnect();
    };
  }, []);

  if (!fromPrice) return null;
  const shouldShow = visible && !testRideVisible;

  return (
    <aside
      aria-label="Quick product booking"
      aria-hidden={!shouldShow}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E8EC] bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-200 md:hidden motion-reduce:transition-none ${shouldShow ? "translate-y-0" : "invisible pointer-events-none translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between gap-3">
        <p className="min-w-0 text-sm font-semibold text-brand-black">
          From {fromPrice}*
        </p>
        <a
          href={bookingHref}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-button bg-brand-red px-4 text-sm font-semibold text-white hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          Book Now
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </aside>
  );
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  // TODO: verify all product figures with official Ola sources before publishing.
  const heroImage =
    Object.entries(images.vehicleHeroes).find(([key]) => key === product.imageKey)?.[1] ??
    images.vehicles[product.imageKey];
  const startingPrice = getStartingPrice(product);
  const displayPrice = startingPrice
    ? startingPrice.startsWith("₹")
      ? startingPrice
      : `₹${startingPrice}`
    : undefined;
  const categoryLabel = product.type === "scooter" ? "Scooters" : "Motorcycles";
  const moreModels = modelsData
    .filter((model) => model.type === product.type && model.id !== product.id)
    .slice(0, 3);

  return (
    <main id="main-content" className="pb-20 md:pb-0">
      <section
        id="product-hero"
        aria-label={`${product.brand} ${product.model} hero`}
        className="relative isolate h-[520px] overflow-hidden bg-[#0B0B0F] sm:h-[560px] md:h-[clamp(420px,60vh,680px)]"
      >
        <Image
          src={heroImage}
          alt={`${product.brand} ${product.model} electric ${product.type}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 hidden bg-gradient-to-r from-black/[0.65] via-black/30 via-[42%] to-transparent md:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent md:hidden"
        />
        <div className="relative z-20 mx-auto flex h-full max-w-container items-end px-4 pb-8 pt-16 sm:px-6 sm:pb-10 lg:px-8 md:items-center md:py-12">
          <div className="max-w-[560px] text-white">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/75">
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href="/" className="underline-offset-4 hover:underline">Home</a></li>
                <li aria-hidden="true">/</li>
                <li><a href={`/#${product.type === "scooter" ? "scooters" : "motorcycles"}`} className="underline-offset-4 hover:underline">{categoryLabel}</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{product.model}</li>
              </ol>
            </nav>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white">
              {product.type === "scooter" ? "ELECTRIC SCOOTER" : "ELECTRIC MOTORCYCLE"}
              <span aria-hidden="true" className="mt-3 block h-0.5 w-12 bg-brand-red" />
            </p>
            <h1 className="mt-5 text-[clamp(44px,6vw,80px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance]">
              Ola {product.model}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-xl">
              {product.tagline}
            </p>
            {displayPrice && (
              <p className="mt-4 text-xl font-semibold text-white sm:text-[22px]">
                From {displayPrice}
                <a href="#price-footnote" aria-label="Read price note" className="ml-0.5 align-top text-sm underline underline-offset-2">*</a>
              </p>
            )}
            <div className="mt-6 grid gap-3 min-[480px]:flex">
              <a
                href={`/book?vehicle=${encodeURIComponent(product.slug)}&variant=${encodeURIComponent(variantId(product.variants[0]))}`}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-button bg-brand-red px-6 text-base font-semibold text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book Now
                <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
              <a
                href={`/#test-ride?vehicle=${encodeURIComponent(product.slug)}&topic=test-ride`}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-button border border-white bg-transparent px-6 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Test Drive
                <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="variants" aria-labelledby="variants-title" className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <header className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Explore the range</p>
            <h2 id="variants-title" className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-brand-black sm:text-4xl">
              Choose Your {product.model}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A4D55]">
              Pick the battery option that fits your ride.
            </p>
          </header>
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            {product.variants.map((variant, index) => (
              <VariantCard
                key={`${product.id}-${variant.label}`}
                product={product}
                variant={variant}
                index={index}
              />
            ))}
          </div>
          {displayPrice && (
            <p id="price-footnote" className="mt-5 text-[13px] leading-5 text-[#6B6F76]">
              *Prices, reservation amounts and delivery timelines are indicative and subject to change. Please confirm with the dealership before booking.
              {/* TODO: verify all specs, prices, reservation amounts, and delivery dates with official Ola sources. */}
            </p>
          )}
        </div>
      </section>

      <VariantComparison product={product} />

      {moreModels.length > 0 && (
        <section aria-labelledby="more-scooters-title" className="bg-surface py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <h2 id="more-scooters-title" className="text-3xl font-extrabold tracking-[-0.02em] text-brand-black sm:text-4xl">
              Explore More {product.type === "scooter" ? "Scooters" : "Motorcycles"}
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {moreModels.map((model) => (
                <VehicleCard key={model.id} vehicle={model} />
              ))}
            </div>
          </div>
        </section>
      )}
      {displayPrice && <MobileProductBar product={product} fromPrice={displayPrice} />}
    </main>
  );
}
