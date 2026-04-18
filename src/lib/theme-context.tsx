"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("kagujje-theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored || (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("kagujje-theme", theme);
    
    // Update CSS variables based on theme
    if (theme === "light") {
      root.style.setProperty("--bg-primary", "#ffffff");
      root.style.setProperty("--bg-secondary", "#f5f5f5");
      root.style.setProperty("--bg-tertiary", "#e5e5e5");
      root.style.setProperty("--text-primary", "#0a0a0a");
      root.style.setProperty("--text-secondary", "#666666");
      root.style.setProperty("--border", "#d4d4d4");
    } else {
      root.style.setProperty("--bg-primary", "#000000");
      root.style.setProperty("--bg-secondary", "#0a0a0a");
      root.style.setProperty("--bg-tertiary", "#1a1a1a");
      root.style.setProperty("--text-primary", "#f5f5f5");
      root.style.setProperty("--text-secondary", "#a0a0a0");
      root.style.setProperty("--border", "#2a2a2a");
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
