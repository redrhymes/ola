import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { ComparisonExperience } from "@/components/sections/ComparisonExperience";

export const metadata: Metadata = {
  title: "Compare Ola Electric Vehicles",
  description:
    "Compare Ola Electric scooter and motorcycle specifications side by side.",
};

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePath="/comparison" />
      <main id="main-content">
        <ComparisonExperience />
      </main>
      <Footer />
    </div>
  );
}
