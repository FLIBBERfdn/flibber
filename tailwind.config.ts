import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-black": "#050505",
        black: "#0A0A0A",
        "soft-black": "#111111",
        "silver-dark": "#686D75",
        silver: "#B8BEC8",
        "silver-bright": "#D4D8DE",
        platinum: "#ECEEF1",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 3s linear infinite",
      },
      boxShadow: {
        phone: "0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,190,200,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
