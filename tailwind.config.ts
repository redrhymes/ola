import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E11313",
          "red-hover": "#CF1111",
          black: "#0B0B0F",
        },
        surface: "#F4F5F7",
        border: "#E8E9EC",
        muted: "#6B6F76",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      fontWeight: {
        heading: "800",
      },
      letterSpacing: {
        tightest: "-0.03em",
        eyebrow: "0.2em",
      },
      borderRadius: {
        button: "8px",
        card: "16px",
        "card-lg": "20px",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.06)",
      },
      maxWidth: {
        container: "1360px",
      },
    },
  },
  plugins: [],
};

export default config;
