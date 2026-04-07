import { createContext } from "react";

type ThemeType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeType | null>(null);
