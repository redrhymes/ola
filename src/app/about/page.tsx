import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `About Us | ${site.name}`,
  description:
    "Learn about your Ola Electric authorized dealership and how our team can help you explore scooters, motorcycles, test rides and booking enquiries.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us | ${site.name}`,
    description:
      "Learn about your Ola Electric authorized dealership and how our team can help you explore the range.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePath="/about" />
      <main id="main-content">
        <section
          aria-labelledby="about-title"
          className="bg-white py-14 sm:py-18 lg:py-20"
        >
          <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <header className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
                About our dealership
                <span
                  aria-hidden="true"
                  className="mx-auto mt-3 block h-0.5 w-12 bg-brand-red"
                />
              </p>
              <h1
                id="about-title"
                className="mt-5 text-[clamp(34px,5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-black [text-wrap:balance]"
              >
                {site.aboutPage.title}
              </h1>
            </header>

            <div className="mx-auto mt-8 max-w-[1180px] space-y-6 text-base leading-7 text-[#626670] sm:mt-10 sm:space-y-8 sm:text-lg sm:leading-8">
              <p className="text-left">{site.aboutPage.introduction}</p>
              {site.aboutPage.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-left">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
