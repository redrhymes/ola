import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  desktopLarge?: boolean;
}

export function Logo({
  className = "",
  isDark = false,
  desktopLarge = false,
}: LogoProps) {
  const textColor = isDark ? "text-white" : "text-brand-black";
  const dividerColor = isDark ? "bg-white/40" : "bg-brand-black/40";
  const subtextColor = isDark ? "text-neutral-300" : "text-[#1C1C1E]";

  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 max-w-full items-center gap-1.5 group select-none sm:gap-2.5 ${className}`}
      aria-label="Lamba Ola Electric Authorized Dealership Home"
    >
      <Image
        src="/images/logo.webp"
        alt="Lamba"
        width={56}
        height={56}
        sizes="(min-width: 1024px) 56px, 44px"
        className={`size-8 shrink-0 object-contain sm:size-11 ${desktopLarge ? "lg:size-14" : ""}`}
      />
      <span
        aria-hidden="true"
        className={`h-8 w-px shrink-0 sm:h-9 ${desktopLarge ? "lg:h-11" : ""} ${dividerColor}`}
      />
      <span className="flex min-w-0 flex-col gap-1">
        <span className={`flex min-w-0 items-center gap-1.5 sm:gap-2 ${textColor}`}>
          <span
            className={`shrink-0 font-black text-xl leading-none tracking-[-0.04em] sm:text-2xl ${desktopLarge ? "lg:text-[28px]" : ""}`}
            style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 900 }}
          >
            OLA
          </span>
          <span aria-hidden="true" className={`h-4 w-px shrink-0 ${dividerColor}`} />
          <span className={`whitespace-nowrap text-[9px] font-semibold uppercase leading-none tracking-[0.1em] sm:text-[13px] sm:tracking-[0.2em] ${desktopLarge ? "lg:text-sm" : ""}`}>
            ELECTRIC
          </span>
        </span>
        <span className={`whitespace-nowrap text-[6px] font-semibold uppercase leading-none tracking-[0.1em] sm:text-[8.5px] sm:tracking-[0.24em] ${desktopLarge ? "lg:text-[9px]" : ""} ${subtextColor}`}>
          AUTHORIZED OLA DEALERSHIP
        </span>
      </span>
    </Link>
  );
}
