import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: "none" | "default" | "large";
};

const paddingClasses = {
  none: "",
  default: "p-5 md:p-6",
  large: "p-6 md:p-8",
};

export function Card({
  children,
  className = "",
  padding = "default",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-card-lg border border-border bg-white shadow-soft ${paddingClasses[padding]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
