"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-full border border-border px-3 py-2 text-xs uppercase tracking-[0.25em] 
      hover:border-accent-gold/40 focus:outline-none focus:ring-2 focus:ring-[var(--royal-blue)] ${className}`}
      style={{ backgroundColor: isLight ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.18)" }}
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
