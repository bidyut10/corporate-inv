export const themes = [
  { name: "Light", value: "light", swatch: "bg-white border-neutral-300" },
  { name: "Paper", value: "paper", swatch: "bg-[#FAF7F2] border-stone-300" },
  { name: "Dark", value: "dark", swatch: "bg-neutral-950 border-neutral-700" },
];

const PDF_THEMES = {
  light: {
    page: "bg-white",
    title: "text-neutral-800",
    heading: "text-neutral-800",
    body: "text-neutral-600",
    label: "text-black",
    border: "border-neutral-100",
    borderSoft: "border-neutral-50",
    tableHeader: "bg-neutral-50/50 text-neutral-800",
    signatureBar: "bg-neutral-50/50 text-neutral-600",
    notesBg: "bg-neutral-50/50",
    pdf: {
      bg: "#ffffff",
      title: "#262626",
      text: "#404040",
      muted: "#525252",
      label: "#000000",
      border: "#f5f5f5",
      borderSoft: "#fafafa",
      headerBg: "#fafafa",
      notesBg: "#fafafa",
    },
  },
  paper: {
    page: "bg-[#FAF7F2]",
    title: "text-stone-800",
    heading: "text-stone-800",
    body: "text-stone-600",
    label: "text-stone-900",
    border: "border-stone-200",
    borderSoft: "border-stone-100",
    tableHeader: "bg-[#F0EBE3] text-stone-800",
    signatureBar: "bg-[#F0EBE3] text-stone-600",
    notesBg: "bg-[#F0EBE3]",
    pdf: {
      bg: "#FAF7F2",
      title: "#292524",
      text: "#44403c",
      muted: "#57534e",
      label: "#1c1917",
      border: "#e7e0d5",
      borderSoft: "#ece6db",
      headerBg: "#F0EBE3",
      notesBg: "#F0EBE3",
    },
  },
  dark: {
    page: "bg-neutral-950",
    title: "text-white",
    heading: "text-neutral-100",
    body: "text-neutral-400",
    label: "text-neutral-200",
    border: "border-neutral-800",
    borderSoft: "border-neutral-800",
    tableHeader: "bg-neutral-900 text-neutral-100",
    signatureBar: "bg-neutral-900 text-neutral-400",
    notesBg: "bg-neutral-900",
    pdf: {
      bg: "#0a0a0a",
      title: "#ffffff",
      text: "#d4d4d4",
      muted: "#a3a3a3",
      label: "#e5e5e5",
      border: "#262626",
      borderSoft: "#262626",
      headerBg: "#171717",
      notesBg: "#171717",
    },
  },
};

export const getPdfTheme = (themeValue) => {
  return PDF_THEMES[themeValue] || PDF_THEMES.light;
};

export const normalizeTheme = (themeValue) => {
  return PDF_THEMES[themeValue] ? themeValue : "light";
};
