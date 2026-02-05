"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check local storage
    const storedTheme = localStorage.getItem("syren_theme") as Theme | null;
    
    // 2. If stored is light, set light. Default is dark (no class needed for dark in new CSS).
    if (storedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark"); // Clean up old class if present
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark"); // Clean up old class if present
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("syren_theme", newTheme);
    
    // Add transition class temporarily for smooth switch
    document.documentElement.classList.add("theme-transition");
    
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);
  };

  // Prevent hydration mismatch by rendering nothing until mounted?
  // Or just render children. Since we manipulate class on html, children are mostly fine.
  // But toggle button icon depends on theme state.
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
