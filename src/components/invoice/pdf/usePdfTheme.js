import { useContext } from "react";
import { PdfThemeContext } from "./pdfThemeContext";
import { getPdfTheme } from "../data/pdfThemes";

export const usePdfTheme = () => {
  const context = useContext(PdfThemeContext);
  return context || getPdfTheme("light");
};
