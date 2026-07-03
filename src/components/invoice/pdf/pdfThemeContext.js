import { createContext } from "react";
import { getPdfTheme } from "../data/pdfThemes";

export const PdfThemeContext = createContext(getPdfTheme("light"));
