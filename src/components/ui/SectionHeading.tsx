type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  centered?: boolean;
  variant?: "lineBelow" | "lineAbove" | "none";
  titleId?: string;
  className?: string;
  eyebrowClassName?: string;
  underlineClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  centered: centeredOption,
  variant = "lineBelow",
  titleId,
  className = "",
  eyebrowClassName = "",
  underlineClassName = "",
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const centered = centeredOption ?? align === "center";
  const lineAbove = variant === "lineAbove";
  const noEyebrowLine = variant === "none";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : "text-left"} max-w-3xl ${className}`.trim()}
    >
      <p
        className={
          lineAbove
            ? `flex flex-col items-center gap-[14px] text-xs font-medium uppercase tracking-[0.3em] text-[#2A2C33] ${eyebrowClassName}`
            : noEyebrowLine
              ? `text-xs font-medium uppercase tracking-[0.3em] text-[#2A2C33] ${eyebrowClassName}`
            : eyebrowClassName
              ? `text-xs uppercase ${eyebrowClassName} ${
                  centered ? "after:mx-auto" : ""
                } ${
                  underlineClassName ||
                  "after:mt-3 after:block after:h-0.5 after:w-6 after:bg-brand-red"
                }`
              : `text-xs font-semibold uppercase tracking-eyebrow text-muted ${
                  centered ? "after:mx-auto" : ""
                } after:mt-3 after:block after:h-0.5 after:w-6 after:bg-brand-red`
        }
      >
        {lineAbove ? (
          <span className="block h-0.5 w-14 bg-brand-red" aria-hidden="true" />
        ) : null}
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={
          `${titleClassName ?? "mt-4 text-3xl font-heading leading-tight tracking-tightest text-brand-black md:text-4xl"} ${centered ? "after:mx-auto" : ""} after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-['']`.trim()
        }
      >
        {title}
      </h2>
      {description ? (
        <p className={descriptionClassName ?? "mt-4 text-base leading-7 text-muted"}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
