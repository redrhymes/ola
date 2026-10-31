import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

const cards = [
  { key: "phone", Icon: Phone },
  { key: "email", Icon: Mail },
  { key: "location", Icon: MapPin },
  { key: "hours", Icon: Clock3 },
] as const;

const addressText = site.address.lines.join(", ");
const addressIsPlaceholder =
  addressText.includes("Your Street Name") || addressText.includes("PIN Code");

function getDirectionsHref() {
  if (site.mapsUrl) return site.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
}

export function ContactInfoCards() {
  return (
    <section aria-label={site.contactPage.infoLabel} className="w-full">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
        {cards.map(({ key, Icon }) => {
          const title =
            site.contactPage.cards[`${key}Title` as keyof typeof site.contactPage.cards];
          const description =
            key === "hours"
              ? null
              : site.contactPage.cards[
                  `${key}Description` as keyof typeof site.contactPage.cards
                ];

          return (
            <li
              key={key}
              className="rounded-card-lg border border-border bg-white p-5 shadow-soft md:p-6"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#FCEAEA] text-brand-red">
                <Icon aria-hidden="true" className="size-5 stroke-[1.7]" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-brand-black">{title}</h2>
              {description ? (
                <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
              ) : null}

              {key === "phone" ? (
                <ul className="mt-3 space-y-2">
                  {site.dealershipLocations.map(({ name, phone }) => (
                    <li
                      key={name}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 rounded-md bg-surface px-3 py-2"
                    >
                      <span className="min-w-0 text-sm font-medium text-brand-black">
                        {name}
                      </span>
                      <a
                        href={phone.href}
                        className="inline-flex min-h-10 items-center whitespace-nowrap text-sm font-semibold text-brand-black underline-offset-4 hover:text-brand-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
                      >
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              {key === "email" ? (
                site.email.href ? (
                  <a
                    href={site.email.href}
                    className="mt-3 inline-flex min-h-11 items-center break-all font-semibold text-brand-black underline-offset-4 hover:text-brand-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
                  >
                    {site.email.display}
                  </a>
                ) : (
                  <p className="mt-3 flex min-h-11 items-center text-sm font-medium text-muted">
                    {site.email.display}
                  </p>
                )
              ) : null}

              {key === "location" ? (
                <>
                  <address className="mt-3 not-italic text-sm leading-6 text-brand-black">
                    {site.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  {site.mapsUrl || !addressIsPlaceholder ? (
                    <a
                      href={getDirectionsHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
                    >
                      {site.contactPage.directionsLabel}
                      <span className="sr-only"> {site.contactPage.directionsNewTabLabel}</span>
                    </a>
                  ) : null}
                </>
              ) : null}

              {key === "hours" ? (
                <dl className="mt-3 space-y-2 text-sm leading-5 text-brand-black">
                  {site.hours.map((hours) => (
                    <div key={hours.days} className="grid grid-cols-[auto_1fr] gap-x-3">
                      <dt className="font-medium">{hours.days}</dt>
                      <dd className="text-muted">{hours.time}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
