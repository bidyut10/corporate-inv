import React from "react";

const ThankyouSection = ({ title, text }) => {
  if (!title && !text) {
    return;
  }
  return (
    <div className="w-full border-y bg-neutral-50/50 border-dashed border-neutral-100 py-3">
      <h3 className="text-neutral-800 text-center font-medium text-xs mb-1">
        {title}
      </h3>
      <h3 className="text-neutral-600 text-center text-xs">{text}</h3>
    </div>
  );
};

export default ThankyouSection;
