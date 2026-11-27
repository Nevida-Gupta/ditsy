import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Master brand: midnight + ivory + champagne gold
        pearl: "#FAF8F5",
        midnight: { DEFAULT: "#0E1F2E", deep: "#091521", soft: "#1E3A4F" },
        // Ditsy Jewellery world
        peacock: { DEFAULT: "#12403F", deep: "#0B2D2C", light: "#2E6B68" },
        gold: "#C29B57",
        champagne: "#E9DDC4",
        // Ditsy Gifting world
        blush: "#F5DFD9",
        rose: "#C7787E",
        // Neutrals
        sand: "#ECEFEE",
        ink: "#15212C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1360px" },
      transitionTimingFunction: { silk: "cubic-bezier(.22,.8,.2,1)" },
    },
  },
  plugins: [],
};
export default config;
