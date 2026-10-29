import { Megaphone, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

export function TopBar() {
  return (
    <div className="bg-surface border-b border-border text-xs text-brand-black transition-colors">
      <div className="mx-auto flex h-9 max-w-[1360px] items-center justify-between gap-2 px-3 sm:px-4 lg:px-4">
        {/* Left announcement */}
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <Megaphone className="w-3.5 h-3.5 shrink-0 text-brand-black -rotate-12" aria-hidden="true" />
          <span className="font-semibold text-brand-black shrink-0">Visit Our Showroom</span>
          <span className="text-border hidden md:inline">|</span>
          <span className="text-muted hidden sm:inline truncate">
            Experience the Future with Ola Electric
          </span>
        </div>

        {/* Right quick contact links */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[11.5px] font-medium">
          <a
            href="/contact#contact-map-title"
            className="hidden items-center gap-1.5 text-brand-black transition-colors hover:text-brand-red sm:inline-flex"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-black" aria-hidden="true" />
            <span>Our Locations</span>
          </a>

          <span className="hidden text-border sm:inline" aria-hidden="true">
            |
          </span>

          <a
            href={site.phone.href}
            aria-label={`Call ${site.phone.display}`}
            className="inline-flex items-center gap-1.5 text-brand-black hover:text-brand-red transition-colors font-medium tracking-tight"
          >
            <Phone className="w-3.5 h-3.5 text-brand-black" aria-hidden="true" />
            <span className="hidden sm:inline">{site.phone.display}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
