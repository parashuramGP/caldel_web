import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#F8F7F4",
        fg: "#0A0A0A",
        card: "#FFFFFF",
        surface: "#F2F1ED",
        border: "#E9E8E3",
        muted: "#9B9B8E",
        gold: "#C9A84C",
        goldLight: "#E8C878",
        dark1: "#0A0A0A",
        dark2: "#141414",
        dark3: "#1E1E1E",
        cream: "#FAF8F4",
        charcoal: "#2C2C2C",
        destructive: "#C0392B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      letterSpacing: {
        luxe: "0.5em",
      },
      borderRadius: {
        luxe: "16px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.6)" },
          "50%": { boxShadow: "0 0 0 14px rgba(201,168,76,0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee 28s linear infinite",
        floaty: "floaty 4s ease-in-out infinite",
        pulseGold: "pulseGold 2.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
