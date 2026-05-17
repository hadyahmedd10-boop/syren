import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-gold": "var(--accent-gold)",
        border: "var(--border)",
        "card-bg": "var(--card-bg)",

        // compatibility tokens
        foreground: "var(--foreground)",
        "surface-2": "var(--surface-2)",
        "royal-blue": "var(--royal-blue)",
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        blackbase: "var(--color-footer)",
        gold: "var(--accent-gold)",
        golddark: "#D8B74F",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
      },
    },
  },
  plugins: [],
};

export default config;
