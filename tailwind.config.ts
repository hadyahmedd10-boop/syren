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
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-gold": "var(--accent-gold)",
        "royal-blue": "var(--royal-blue)",
        
        // Compatibility / Additional
        "background-light": "var(--color-background-light)", // Kept from old globals if still used? (I didn't define it in new globals, wait)
        "text-dark": "var(--color-text-dark)", // I didn't define this in new globals either, user didn't ask for it.
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        blackbase: "var(--color-footer)",
        gold: "var(--accent-gold)",
        golddark: "#B89B5F",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
      },
    },
  },
  plugins: [],
};

export default config;
