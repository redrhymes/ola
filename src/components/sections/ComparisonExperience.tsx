"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Card } from "@/components/ui/Card";
import {
  comparisonSpecLabels,
  type Vehicle,
  type VehicleCategory,
  vehicles,
} from "@/data/vehicles";

type VehicleFilter = "all" | VehicleCategory;
type ComparisonSide = "left" | "right";

const filters: { label: string; value: VehicleFilter }[] = [
  { label: "All vehicles", value: "all" },
  { label: "Scooters", value: "Scooter" },
  { label: "Motorcycles", value: "Motorcycle" },
];

function getSpecValue(value: string | string[]) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function ComparisonCard({
  vehicle,
  options,
  label,
  onVehicleChange,
}: {
  vehicle: Vehicle;
  options: Vehicle[];
  label: string;
  onVehicleChange: (vehicleId: string) => void;
}) {
  return (
    <Card className="overflow-hidden" padding="none">
      <div className="relative h-56 bg-surface sm:h-64">
        <Image
          src={vehicle.image}
          alt={vehicle.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1280px) 40vw, 480px"
          className="object-cover"
        />
      </div>

      <div className="p-5 sm:p-6">
        <label
          className="mb-3 block text-xs font-semibold uppercase tracking-wide text-muted"
          htmlFor={`${label}-vehicle`}
        >
          {label}
        </label>
        <select
          id={`${label}-vehicle`}
          value={vehicle.id}
          onChange={(event) => onVehicleChange(event.target.value)}
          className="min-h-12 w-full rounded-button border border-border bg-white px-3 text-base font-semibold text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <h2 className="mt-1 text-2xl font-extrabold tracking-tightest text-brand-black">
          {vehicle.name}
        </h2>
        <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
          {vehicle.description}
        </p>

        <div className="mt-5 rounded-card bg-surface p-4">
          <p className="text-sm text-muted">Starting price</p>
          <p className="mt-1 text-xl font-bold text-brand-black">
            {vehicle.price}
          </p>
        </div>

        <dl className="mt-5 divide-y divide-border">
          {comparisonSpecLabels.map(({ key, label: specLabel }) => (
            <div
              key={key}
              className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <dt className="min-w-0 text-sm text-muted">{specLabel}</dt>
              <dd className="min-w-0 break-words text-right text-sm font-semibold text-brand-black [overflow-wrap:anywhere]">
                {getSpecValue(vehicle.specs[key])}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={`#test-ride?vehicle=${vehicle.id}`}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-button bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          Enquire about this vehicle
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </Card>
  );
}

export function ComparisonExperience() {
  const [filter, setFilter] = useState<VehicleFilter>("all");
  const [leftVehicleId, setLeftVehicleId] = useState(vehicles[0]?.id ?? "");
  const [rightVehicleId, setRightVehicleId] = useState(vehicles[1]?.id ?? "");

  const options = vehicles.filter(
    (vehicle) => filter === "all" || vehicle.category === filter,
  );
  const leftVehicle =
    options.find((vehicle) => vehicle.id === leftVehicleId) ?? options[0];
  const rightVehicle =
    options.find((vehicle) => vehicle.id === rightVehicleId) ??
    options.find((vehicle) => vehicle.id !== leftVehicle?.id) ??
    options[0];

  function updateVehicle(side: ComparisonSide, id: string) {
    if (side === "left") {
      setLeftVehicleId(id);
      if (id === rightVehicle?.id && leftVehicle) {
        setRightVehicleId(leftVehicle.id);
      }
      return;
    }

    setRightVehicleId(id);
    if (id === leftVehicle?.id && rightVehicle) {
      setLeftVehicleId(rightVehicle.id);
    }
  }

  return (
    <section
      aria-labelledby="comparison-title"
      className="bg-white py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted">
            Find your ride
          </p>
          <h1
            id="comparison-title"
            className="mt-3 after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-[''] text-3xl font-extrabold leading-tight tracking-tightest text-brand-black sm:text-4xl lg:text-5xl"
          >
            Compare Ola Electric vehicles
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            Choose two vehicles to review their features and specifications side
            by side.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside
            aria-labelledby="vehicle-filter-title"
            className="h-fit rounded-card-lg border border-border bg-white p-5 shadow-soft"
          >
            <h2
              id="vehicle-filter-title"
              className="text-base font-bold text-brand-black"
            >
              Filter vehicles
            </h2>
            <div
              aria-label="Filter by vehicle type"
              className="mt-4 flex gap-2 overflow-x-auto lg:flex-col"
            >
              {filters.map((item) => {
                const active = filter === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(item.value)}
                    className={`inline-flex min-h-11 shrink-0 items-center justify-between gap-3 rounded-button border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red lg:w-full ${
                      active
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-border bg-white text-brand-black hover:border-brand-red"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <Check aria-hidden="true" className="size-4" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </aside>

          {leftVehicle && rightVehicle ? (
            <div className="grid min-w-0 gap-6 md:grid-cols-2">
              <ComparisonCard
                vehicle={leftVehicle}
                options={options}
                label="First vehicle"
                onVehicleChange={(id) => updateVehicle("left", id)}
              />
              <ComparisonCard
                vehicle={rightVehicle}
                options={options}
                label="Second vehicle"
                onVehicleChange={(id) => updateVehicle("right", id)}
              />
            </div>
          ) : (
            <p className="rounded-card-lg border border-border bg-surface p-6 text-muted">
              No vehicles are available for this filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
