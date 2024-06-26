/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
});
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sourceSans3: ["SourceSans3", "sans-serif"],
        akshar: ["Akshar", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        amethysta: ["Amethysta", "sans-serif"],
        nunitoSans: ["Nunito Sans", "sans-serif"],
        alatsi: ["Alatsi", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        sangbleu: ["SangBleu-Sunrise", "sans-serif"],
      },
      colors: {
        brownDark: "#302300",
        brownLight: "#B8AA70",
        brownMedium: "#635A3F",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#302300",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#9C7E00",
          foreground: "hsl(var(--secondary-foreground))",
        },
        footer: {
          DEFAULT: "#171717",
          foreground: "hsl(var(--secondary-foreground))",
        },
        footertxt: {
          DEFAULT: "#B8AA70",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
