import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("Theme must be used withing ThemeProvider");
  }
  return theme;
};

export default useTheme;
