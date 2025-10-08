import React from "react";

const NotesOrTermsSection = ({ title, text }) => {
  if (!title && !text) {
    return;
  }
  return (
    <div className="w-full border-y bg-neutral-50/50 border-dashed border-neutral-100 px-4 py-3 mb-4">
      <h3 className="text-neutral-800 font-medium text-xs mb-1">{title}</h3>
      <h3 className="text-neutral-600 text-xs">{text}</h3>
    </div>
  );
};

export default NotesOrTermsSection;
