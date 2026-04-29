import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDFBF7",
        "cream-warm": "#F4EAD5",
        "sage-light": "#E9EDC9",
        sage: "#CCD5AE",
        "sage-dark": "#5A6658",
        forest: "#2D372B",
        terracotta: "#B2845A",
        peach: "#D4A373",
        sand: "#E9DCC4"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "ui-serif", "serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
} satisfies Config;

