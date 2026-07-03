import React from "react";
import { getPdfTheme } from "../data/pdfThemes";
import { PdfThemeContext } from "./pdfThemeContext";

export const PdfThemeProvider = ({ theme = "light", children }) => {
  const themeStyles = getPdfTheme(theme);
  return (
    <PdfThemeContext.Provider value={themeStyles}>{children}</PdfThemeContext.Provider>
  );
};
