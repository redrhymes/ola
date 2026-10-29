"use client";

import { useEffect, useState } from "react";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { modelsData, VehicleType } from "@/data/vehicles";

interface FilterTab {
  id: VehicleType;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { id: "scooter", label: "Scooters" },
  { id: "motorcycle", label: "Motorcycles" },
];

const HOME_SCOOTER_IDS = new Set(["s1-z", "s1-pro-plus", "s1-x-plus"]);

export function ModelsGrid() {
  const [selectedFilter, setSelectedFilter] = useState<VehicleType>("scooter");

  useEffect(() => {
    const syncFilterWithHash = () => {
      const type =
        window.location.hash === "#motorcycles"
          ? "motorcycle"
          : window.location.hash === "#scooters"
            ? "scooter"
            : null;

      if (type) {
        setSelectedFilter(type);
        window.requestAnimationFrame(() => {
          document.getElementById("scooters")?.scrollIntoView({ behavior: "smooth" });
        });
      }
    };

    syncFilterWithHash();
    window.addEventListener("hashchange", syncFilterWithHash);
    return () => window.removeEventListener("hashchange", syncFilterWithHash);
  }, []);

  const filteredVehicles = modelsData.filter(
    (vehicle) =>
      vehicle.type === selectedFilter &&
      (selectedFilter !== "scooter" || HOME_SCOOTER_IDS.has(vehicle.id)),
  );

  const isScooter = selectedFilter === "scooter";

  return (
    <section
      id="scooters"
      aria-labelledby="models-section-title"
      className="bg-white py-14 md:py-18 lg:py-20"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-9 md:mb-11">
          <p className="text-xs font-bold tracking-[0.22em] text-[#6B6F76] uppercase mb-2">
            {isScooter ? "OUR ELECTRIC SCOOTERS" : "OUR ELECTRIC MOTORCYCLES"}
          </p>

          <h2
            id="models-section-title"
            className="after:mx-auto after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-[''] text-[clamp(40px,5vw,64px)] font-extrabold text-brand-black tracking-[-0.02em] leading-[1.05]"
          >
            Find Your Perfect Ride
          </h2>

          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed max-w-xl mx-auto">
            Explore the Ola Electric range at our dealership and choose a
            scooter that fits your lifestyle.
          </p>

          {/* Filter options (Scooters / Motorcycles) */}
          <div
            role="group"
            aria-label="Filter vehicles by type"
            className="mt-7 inline-flex items-center p-1.5 rounded-full bg-surface border border-border"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red ${
                    isActive
                      ? "bg-brand-red text-white shadow-sm"
                      : "text-brand-black hover:text-brand-red"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            filteredVehicles.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 max-w-[840px]"
          } gap-6 max-w-[420px] md:max-w-none mx-auto justify-center`}
        >
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
