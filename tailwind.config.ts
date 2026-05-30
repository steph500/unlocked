import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./data/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050607",
        charcoal: "#0d1011",
        asphalt: "#15191b",
        lime: "#c8ff2f",
        smoke: "#a7ada5"
      },
      boxShadow: {
        glow: "0 0 40px rgba(200, 255, 47, 0.18)",
        card: "0 18px 60px rgba(0, 0, 0, 0.4)"
      },
    }
  },
  plugins: [forms]
};

export default config;
