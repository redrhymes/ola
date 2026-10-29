import type { ButtonHTMLAttributes, ReactNode } from "react";

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  active?: boolean;
};

export function Pill({
  children,
  active = false,
  className = "",
  type = "button",
  ...props
}: PillProps) {
  return (
    <button
      {...props}
      aria-pressed={active}
      className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${
        active
          ? "border-brand-red bg-brand-red text-white"
          : "border-border bg-white text-brand-black hover:border-brand-red"
      } ${className}`.trim()}
      type={type}
    >
      {children}
    </button>
  );
}
