import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { QuickActions } from "@/components/sections/QuickActions";
import { ModelsGrid } from "@/components/sections/ModelsGrid";
import { FeaturedVehicle } from "@/components/sections/FeaturedVehicle";
import { TestRideForm } from "@/components/sections/TestRideForm";
import { ShowroomInfo } from "@/components/sections/ShowroomInfo";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-white">
      {/* Dealership Header with TopBar & Drawer */}
      <Header activePath="/" />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* Section 01: Hero Section */}
        <Hero />

        {/* Section 02: Quick Actions */}
        <QuickActions />

        {/* Section 03: Models Grid */}
        <ModelsGrid />

        {/* Section 04: Featured Vehicle */}
        <FeaturedVehicle />

        {/* Section 05: Test Ride */}
        <TestRideForm />

        {/* Section 06: Showroom */}
        <ShowroomInfo />

        {/* Section 07: Testimonials */}
        <Testimonials />

      </main>
      <Footer />
    </div>
  );
}
