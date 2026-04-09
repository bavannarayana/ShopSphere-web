import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      return storedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Listen to system theme changes (only if user hasn't chosen manually)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem("theme");

      if (!storedTheme) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Toggle theme (used in login/signup/navbar)
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  // Reset to system theme (optional)
  const resetToSystemTheme = () => {
    localStorage.removeItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDarkMode(prefersDark);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleTheme, resetToSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
