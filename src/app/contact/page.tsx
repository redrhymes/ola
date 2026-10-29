import type { Metadata } from "next";
import { ContactFormCard } from "@/components/forms/ContactFormCard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactInfoCards } from "@/components/sections/contact/ContactInfoCards";
import { ContactMap } from "@/components/sections/contact/ContactMap";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us | Ola Electric",
  description:
    "Contact your authorized Ola Electric dealership for sales, test rides and general enquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Ola Electric",
    description:
      "Contact your authorized Ola Electric dealership for sales, test rides and general enquiries.",
    url: "/contact",
    siteName: "Ola Electric",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePath="/contact" />
      <main id="main-content">
        <ContactHero />
        <section className="py-10 md:py-14 lg:py-16">
          <div className="mx-auto grid max-w-container grid-cols-1 items-start gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:px-8">
            <div className="order-2 lg:order-1">
              <ContactInfoCards />
            </div>
            <div className="order-1 lg:order-2">
              <ContactFormCard content={site.contactPage.form} />
            </div>
          </div>
        </section>
        <ContactMap />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
