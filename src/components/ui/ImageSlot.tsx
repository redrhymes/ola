import Image from "next/image";
import { Bike } from "lucide-react";

interface ImageSlotProps {
  src?: string;
  alt: string;
  aspect?: string; // e.g. "aspect-[9/8]"
  sizes: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
  placeholderLabel?: string;
  placeholderTone?: "light" | "dark";
  initialsFallback?: string;
}

export function ImageSlot({
  src,
  alt,
  aspect = "aspect-[9/8]",
  sizes,
  priority = false,
  className = "",
  objectPosition = "center",
  placeholderLabel,
  placeholderTone = "light",
  initialsFallback,
}: ImageSlotProps) {
  const isImageAvailable = Boolean(src && src.trim().length > 0);

  const toneBg =
    placeholderTone === "dark"
      ? "bg-slate-700/30 text-slate-300"
      : "bg-[#E6E8EE] text-[#555A64]";

  return (
    <div className={`relative w-full overflow-hidden ${aspect} ${className}`}>
      {isImageAvailable ? (
        <Image
          src={src!}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      ) : (
        initialsFallback ? (
          <div
            className="flex h-full w-full items-center justify-center rounded-full bg-[#E9EAEE] text-xl font-bold text-[#2A2C33]"
            aria-hidden="true"
          >
            {initialsFallback}
          </div>
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-4 transition-colors select-none ${toneBg}`}
            role="img"
            aria-label={alt}
          >
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center mb-2">
              <Bike className="w-5 h-5 opacity-80" aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase opacity-90">
              {placeholderLabel || alt}
            </span>
          </div>
        )
      )}
    </div>
  );
}
