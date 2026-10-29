"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: string;
  image: string;
  eyebrow: string;
  heading: string;
  highlightText?: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero/hero1.png",
    eyebrow: "MOVE INTO ELECTRIC",
    heading: "Your Next Ride",
    highlightText: "Starts Here",
    description:
      "Explore Ola Electric scooters designed for a cleaner, smarter and brighter tomorrow.",
    primaryCtaText: "Explore Scooters",
    primaryCtaHref: "#scooters",
    secondaryCtaText: "Book a Test Ride",
    secondaryCtaHref: "#test-ride",
    alt: "Ola Electric scooter range in stylish colors overlooking modern city skyline",
  },
  {
    id: "slide-2",
    image: "/images/hero/hero2.png",
    eyebrow: "THE FESTIVE REVOLUTION",
    heading: "Power, Performance &",
    highlightText: "Pure Electric",
    description:
      "Discover unmatched savings, exclusive dealership offers, and the complete electric lineup.",
    primaryCtaText: "View Offers",
    primaryCtaHref: "#offers",
    secondaryCtaText: "Explore Models",
    secondaryCtaHref: "#scooters",
    alt: "Ola Electric scooters and Roadster motorcycle in dynamic festive setting",
  },
  {
    id: "slide-3",
    image: "/images/hero/hero3.png",
    eyebrow: "NEXT-GEN TECHNOLOGY",
    heading: "Engineered for",
    highlightText: "Tomorrow",
    description:
      "Experience hyper-performance, revolutionary MoveOS smart tech, and instant acceleration.",
    primaryCtaText: "Explore S1 Pro",
    primaryCtaHref: "#scooters",
    secondaryCtaText: "Book a Test Ride",
    secondaryCtaHref: "#test-ride",
    alt: "Ola S1 scooter showcased in futuristic cyber studio showroom",
  },
  {
    id: "slide-4",
    image: "/images/hero/hero4.png",
    eyebrow: "THE ROADSTER ERA",
    heading: "Feel the Thrill of",
    highlightText: "Electric",
    description:
      "Redefining electric motorcycling with bold aerodynamic engineering and pure highway freedom.",
    primaryCtaText: "Explore Motorcycles",
    primaryCtaHref: "#motorcycles",
    secondaryCtaText: "Reserve Now",
    secondaryCtaHref: "#test-ride",
    alt: "Ola Roadster electric motorcycle cruising at speed on scenic highway",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Avoid rotating the carousel for users who prefer reduced motion and
  // suspend its timer while the page is in the background.
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateRotation = () => {
      setAutoRotateEnabled(!motionPreference.matches && !document.hidden);
    };

    updateRotation();
    motionPreference.addEventListener("change", updateRotation);
    document.addEventListener("visibilitychange", updateRotation);
    return () => {
      motionPreference.removeEventListener("change", updateRotation);
      document.removeEventListener("visibilitychange", updateRotation);
    };
  }, []);

  // Autoplay rotation (5.5s)
  useEffect(() => {
    if (isPaused || !autoRotateEnabled) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(interval);
  }, [autoRotateEnabled, isPaused, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-label="Hero Banner Carousel"
      className="relative w-full select-none overflow-hidden bg-[#0B0B0F]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Keep enough vertical room for the responsive copy and actions;
          restore the supplied 1920:680 banner ratio on wide desktop screens. */}
      <div className="relative mx-auto h-[560px] w-full max-w-[1920px] overflow-hidden sm:h-[580px] md:h-[520px] lg:h-[clamp(520px,35.42vw,680px)]">
        {/* Background Slides */}
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* 1920 x 680 Banner Image */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1920px) 100vw, 1920px"
                  className="object-cover object-center"
                />

                {/* 
                  Refined Black Gradient Overlay on Left:
                  Gives contrast and readability to the text without obscuring vehicles.
                */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 via-42% to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Bottom subtle shadow for dash indicators */}
                <div
                  className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}

        {/* 
          Text directly overlapping the image (NO CARD)
          Sized proportionally for the 1920x680 canvas.
        */}
        <div className="relative z-20 h-full max-w-[1360px] mx-auto px-3 sm:px-4 lg:px-4 flex items-center">
          <div className="w-full max-w-[540px] py-6 sm:py-10 lg:max-w-[620px]">
            {/* Eyebrow */}
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase sm:text-[13px]">
                {HERO_SLIDES[currentIndex].eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mb-5 mt-5 after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-[''] max-w-[14ch] text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] [text-wrap:balance] md:leading-[1.1]"
            >
              {HERO_SLIDES[currentIndex].heading}
              {HERO_SLIDES[currentIndex].highlightText ? (
                <>
                  <br className="hidden md:block" />{" "}
                  {HERO_SLIDES[currentIndex].highlightText}
                </>
              ) : null}
            </h1>

            {/* Subheading / Description */}
            <p className="mb-8 mt-0 max-w-[520px] text-base font-normal leading-[1.6] tracking-normal text-white/90 [text-wrap:pretty] md:text-lg md:leading-[1.6]">
              {HERO_SLIDES[currentIndex].description}
            </p>

            {/* CTA Action Buttons directly over image with proper spacing */}
            <div className="flex flex-col items-stretch gap-3 min-[480px]:flex-row min-[480px]:items-center sm:gap-4">
              <a
                href={HERO_SLIDES[currentIndex].primaryCtaHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-[10px] rounded-button bg-brand-red px-4 py-4 text-base font-semibold leading-none tracking-normal text-white shadow-lg transition-colors duration-200 hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-7"
              >
                <span>{HERO_SLIDES[currentIndex].primaryCtaText}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>

              <a
                href={HERO_SLIDES[currentIndex].secondaryCtaHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-[10px] rounded-button border border-white bg-transparent px-4 py-4 text-base font-semibold leading-none tracking-normal text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-7"
              >
                <span>{HERO_SLIDES[currentIndex].secondaryCtaText}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Previous Slide Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous banner slide"
          className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 flex items-center justify-center shadow-lg transition-all backdrop-blur-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>

        {/* Next Slide Arrow */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner slide"
          className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 flex items-center justify-center shadow-lg transition-all backdrop-blur-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>

        {/* Dash Indicators at Bottom */}
        <div
          className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2"
          role="group"
          aria-label="Hero slide indicators"
        >
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                aria-pressed={isActive}
                aria-label={`Go to slide ${index + 1}: ${slide.heading}`}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 h-1 rounded-full ${
                  isActive
                    ? "w-9 sm:w-12 bg-brand-red shadow-sm"
                    : "w-5 sm:w-7 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
