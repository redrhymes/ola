import { Clock3, MapPin, Phone } from "lucide-react";
import { modelsData, vehicleMenuModels } from "@/data/vehicles";
import { site } from "@/data/site";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { Logo } from "@/components/ui/logo";

const socialLinks = site.footer.social;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0E0F13] text-white">
      <div className="mx-auto max-w-container px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:grid-cols-[1.35fr_1fr_1fr_1.45fr] lg:gap-12">
          <div className="relative min-w-0 md:col-span-2 lg:col-span-1 lg:pr-10 lg:after:absolute lg:after:right-0 lg:after:top-2 lg:after:bottom-2 lg:after:w-px lg:after:bg-white/[0.12] lg:after:content-['']">
            <Logo isDark />
            <p className="mt-6 max-w-[340px] text-base leading-[1.65] text-[#C3C6CE]">
              {site.footer.blurb}
            </p>
            <ul className="mt-8 flex gap-4">
              {socialLinks.map((social) => {
                const icon = (
                  <SocialIcons
                    network={social.name}
                    className="size-[22px]"
                  />
                );

                return (
                  <li key={social.name}>
                    {social.href ? (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ola Electric on ${social.name}`}
                        className="inline-flex size-12 items-center justify-center rounded-full bg-[#1C1D22] text-white transition-colors hover:bg-[#2A2B31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:size-[52px]"
                      >
                        {icon}
                      </a>
                    ) : (
                      <span
                        aria-label={`${social.name} profile coming soon`}
                        className="inline-flex size-12 items-center justify-center rounded-full bg-[#1C1D22] text-white opacity-60 lg:size-[52px]"
                      >
                        {icon}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Quick links" className="min-w-0">
            <h2 className="text-lg font-bold text-white">
              {site.footer.quickLinksTitle}
            </h2>
            <span
              className="mt-3 mb-5 block h-0.5 w-12 bg-brand-red"
              aria-hidden="true"
            />
            <ul className="flex flex-col">
              {site.footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base leading-[1.4] text-[#C3C6CE] transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our vehicles" className="min-w-0">
            <h2 className="text-lg font-bold text-white">
              {site.footer.vehiclesTitle}
            </h2>
            <span
              className="mt-3 mb-5 block h-0.5 w-12 bg-brand-red"
              aria-hidden="true"
            />
            <ul className="flex flex-col">
              {vehicleMenuModels.scooter.map((model) => {
                const product = modelsData.find((item) => item.id === model.id);

                return (
                  <li key={model.id}>
                    <a
                      href={product ? `/products/${product.slug}` : "/#scooters"}
                      className="inline-flex min-h-11 items-center text-base leading-[1.4] text-[#C3C6CE] transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {site.footer.vehicleBrandPrefix}{model.model}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="#compare"
                  className="inline-flex min-h-11 items-center text-base leading-[1.4] text-[#C3C6CE] transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {site.footer.compareLabel}
                </a>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-dealership-title" className="min-w-0">
            <h2
              id="footer-dealership-title"
              className="text-lg font-bold text-white"
            >
              {site.footer.dealershipTitle}
            </h2>
            <span
              className="mt-3 mb-5 block h-0.5 w-12 bg-brand-red"
              aria-hidden="true"
            />
            <ul className="divide-y divide-white/[0.14]">
              <li className="flex gap-5 py-5 first:pt-0">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 size-[26px] shrink-0 stroke-[1.5] text-white"
                />
                <address className="not-italic text-base leading-[1.6] text-[#E6E8EC]">
                  {site.address.lines.map((line) => (
                    <span className="block" key={line}>
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-5 py-5">
                <Phone
                  aria-hidden="true"
                  className="mt-1 size-[26px] shrink-0 stroke-[1.5] text-white"
                />
                <div className="min-w-0">
                  <ul className="space-y-2">
                    {site.dealershipLocations.map(({ name, phone }) => (
                      <li
                        key={name}
                        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3"
                      >
                        <span className="min-w-0 text-sm leading-5 text-[#C3C6CE]">
                          {name}
                        </span>
                        <a
                          href={phone.href}
                          className="inline-flex min-h-10 items-center whitespace-nowrap text-sm font-semibold text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {phone.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-base leading-[1.5] text-[#A9ACB5]">
                    {site.footer.contactNote}
                  </p>
                </div>
              </li>
              <li className="flex gap-5 py-5 last:pb-0">
                <Clock3
                  aria-hidden="true"
                  className="mt-1 size-[26px] shrink-0 stroke-[1.5] text-white"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white">
                    {site.footer.openingHoursTitle}
                  </h3>
                  <dl className="mt-2 space-y-1 text-base leading-[1.5] text-[#E6E8EC]">
                    {site.hours.map((hours) => (
                      <div
                        key={hours.days}
                        className="grid grid-cols-[auto_auto_1fr] gap-x-3"
                      >
                        <dt className="min-w-[72px]">{hours.days}</dt>
                        <span aria-hidden="true">:</span>
                        <dd>{hours.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.14] py-7 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <p className="text-base text-[#C3C6CE]">
            © {year} {site.name}. {site.footer.copyrightSuffix}
          </p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-0">
              {site.footer.legal.map((link) => (
                <li
                  key={link.label}
                  className="sm:border-r sm:border-white/30 sm:px-3 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0"
                >
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base text-[#C3C6CE] transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
