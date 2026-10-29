"use client";

import { ExternalLink, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/data/images";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";

const avatarImages = {
  "avatar-1": images.avatars[0],
  "avatar-2": images.avatars[1],
  "avatar-3": images.avatars[2],
} as const;

function getInitials(name: string) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (!mostVisible) return;

        const index = Array.from(list.children).indexOf(mostVisible.target);
        if (index >= 0) setActiveReview(index);
      },
      { root: list, threshold: [0.6, 0.8] },
    );

    Array.from(list.children).forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  function showReview(index: number) {
    const list = listRef.current;
    const card = list?.children[index];
    if (!(card instanceof HTMLElement)) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    list?.scrollTo({
      left: card.offsetLeft - (list?.offsetLeft ?? 0),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setActiveReview(index);
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={site.testimonials.eyebrow}
          title={site.testimonials.title}
          titleId="testimonials-title"
          description={site.testimonials.description}
          centered
          className="mb-12 w-full max-w-[760px]"
          eyebrowClassName="font-medium tracking-[0.3em] text-[#2A2C33]"
          underlineClassName="after:mt-6 after:w-14"
          titleClassName="mt-5 text-[clamp(36px,4.4vw,60px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-brand-black [text-wrap:balance]"
          descriptionClassName="mx-auto mt-4 max-w-[620px] text-base leading-[1.6] text-[#5A5D66] [text-wrap:balance] md:text-lg"
        />

        <ul
          ref={listRef}
          tabIndex={0}
          aria-label={site.testimonials.carouselLabel}
          className="mx-[-16px] flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none lg:grid-cols-3"
        >
          {reviews.map((review) => {
            const avatarSrc = avatarImages[review.avatarKey];
            const initials = getInitials(review.name);

            return (
              <li
                key={review.id}
                className="flex min-w-[85%] snap-center md:min-w-0"
              >
                <figure className="flex h-full w-full flex-col rounded-[20px] border border-[#E6E8EC] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-6">
                  <Quote
                    aria-hidden="true"
                    fill="currentColor"
                    className="mb-3 size-7 shrink-0 text-brand-red"
                    strokeWidth={0}
                  />
                  <blockquote className="mb-5 flex-1 text-base leading-[1.5] text-[#4A4D55]">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4">
                    <ImageSlot
                      src={avatarSrc}
                      alt={avatarSrc ? `Photo of ${review.name}` : ""}
                      aspect="aspect-square"
                      sizes="(min-width:768px) 64px, 56px"
                      initialsFallback={initials}
                      className="size-14 shrink-0 rounded-full sm:size-16"
                    />
                    <div className="min-w-0">
                      <p className="text-lg font-bold leading-[1.2] text-brand-black">
                        {review.name}
                      </p>
                      {review.reviewUrl ? (
                        <>
                          <p className="mt-1 text-base text-[#6B6F76]">
                            {site.testimonials.verifiedLabel}
                          </p>
                          <a
                            href={review.reviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex min-h-11 items-center gap-2 text-base text-[#111] underline decoration-[#C9CCD3] underline-offset-[6px] transition-colors hover:text-brand-red hover:decoration-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                          >
                            <span>{site.testimonials.linkLabel}</span>
                            <span className="sr-only">
                              {site.testimonials.newTabLabel}
                            </span>
                            <ExternalLink
                              aria-hidden="true"
                              className="size-5 shrink-0 stroke-[1.5]"
                            />
                          </a>
                        </>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex justify-center gap-1 md:hidden">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              aria-label={`${site.testimonials.dotLabel} ${index + 1} ${site.testimonials.dotOfLabel} ${reviews.length}`}
              aria-current={activeReview === index ? "true" : undefined}
              onClick={() => showReview(index)}
              className="flex size-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-red"
            >
              <span
                className={`size-2 rounded-full ${
                  activeReview === index ? "bg-brand-red" : "bg-[#D0D3DA]"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
