import type { LucideIcon } from "lucide-react";

type IconBoxProps = {
  icon: LucideIcon;
  label: string;
  className?: string;
};

export function IconBox({ icon: Icon, label, className = "" }: IconBoxProps) {
  return (
    <span
      aria-label={label}
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-brand-red ${className}`.trim()}
    >
      <Icon aria-hidden="true" className="size-5" />
    </span>
  );
}
