import { createContext } from "react";

type ThemeType = {
  darkMode: boolean;
  toggleTheme: () => void;
  resetToSystemTheme: () => void;
};

export const ThemeContext = createContext<ThemeType | null>(null);
