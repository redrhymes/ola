export type SocialNetwork = "Facebook" | "Instagram" | "YouTube" | "LinkedIn";

type SocialIconsProps = {
  network: SocialNetwork;
  className?: string;
};

export function SocialIcons({ network, className = "" }: SocialIconsProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      {network === "Facebook" ? (
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
      ) : null}
      {network === "Instagram" ? (
        <>
          <rect
            x="3.2"
            y="3.2"
            width="17.6"
            height="17.6"
            rx="5.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.7" cy="6.5" r="1.2" />
        </>
      ) : null}
      {network === "YouTube" ? (
        <>
          <path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1a31 31 0 0 0-.5 4.9A31 31 0 0 0 1 17a3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-4.9Z" />
          <path d="m9.7 15.5 5.9-3.5-5.9-3.5v7Z" fill="#1C1D22" />
        </>
      ) : null}
      {network === "LinkedIn" ? (
        <>
          <path d="M5.2 8.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.5 10h3.4v10.5H3.5V10Zm5.4 0h3.3v1.4h.1a3.6 3.6 0 0 1 3.2-1.7c3.4 0 4 2.2 4 5v5.8h-3.4v-5.1c0-1.2 0-2.8-1.8-2.8s-2.1 1.3-2.1 2.7v5.2H8.9V10Z" />
        </>
      ) : null}
    </svg>
  );
}
