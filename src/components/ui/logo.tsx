import Link from "next/link";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className = "", isDark = false }: LogoProps) {
  const textColor = isDark ? "text-white" : "text-brand-black";
  const dividerColor = isDark ? "bg-white/40" : "bg-brand-black/40";
  const subtextColor = isDark ? "text-neutral-300" : "text-[#1C1C1E]";

  return (
    <Link
      href="/"
      className={`inline-flex flex-col group select-none ${className}`}
      aria-label="Ola Electric Authorized Dealership Home"
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`font-black text-2xl tracking-[-0.04em] leading-none ${textColor}`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 900 }}
        >
          OLA
        </span>
        <span className={`h-4 w-[1.5px] ${dividerColor}`} aria-hidden="true" />
        <span className={`text-[13px] font-semibold tracking-[0.2em] uppercase leading-none ${textColor}`}>
          ELECTRIC
        </span>
      </div>
      <span
        className={`text-[8.5px] font-semibold tracking-[0.24em] uppercase mt-1 leading-none ${subtextColor}`}
      >
        AUTHORIZED DEALERSHIP
      </span>
    </Link>
  );
}
