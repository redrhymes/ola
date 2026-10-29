import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "text";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
};

type LinkButtonProps = SharedProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-hover focus-visible:outline-offset-4",
  secondary:
    "border border-brand-black bg-white text-brand-black hover:bg-surface",
  text: "px-0 text-brand-black underline underline-offset-4 hover:text-brand-red",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red";

export function Button(props: ButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    const {
      children,
      variant = "primary",
      className = "",
      showArrow = variant !== "secondary",
      href,
      external,
      ...linkProps
    } = props;
    const classes =
      `${baseClasses} ${variantClasses[variant]} ${className}`.trim();
    const content = (
      <>
        <span>{children}</span>
        {showArrow ? (
          <ArrowRight aria-hidden="true" className="size-4" />
        ) : null}
      </>
    );

    if (external) {
      return (
        <a
          {...linkProps}
          className={classes}
          href={href}
          rel="noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...linkProps} className={classes} href={href}>
        {content}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    className = "",
    showArrow = variant !== "secondary",
    ...buttonProps
  } = props as NativeButtonProps;
  const classes =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();
  return (
    <button {...buttonProps} className={classes}>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight aria-hidden="true" className="size-4" />
      ) : null}
    </button>
  );
}
