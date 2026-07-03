import React from "react";
import { usePdfTheme } from "./usePdfTheme";

const ThankyouSection = ({ title, text }) => {
  const t = usePdfTheme();

  if (!title && !text) return null;

  return (
    <div className={`w-full border-y border-dashed ${t.border} ${t.notesBg} py-3`}>
      <h3 className={`text-center font-medium text-xs mb-1 ${t.heading}`}>{title}</h3>
      <h3 className={`text-center text-xs ${t.body}`}>{text}</h3>
    </div>
  );
};

export default ThankyouSection;
