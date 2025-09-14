import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div className="bg-white rounded border-b border-dashed border-neutral-100">
    <div
      className="flex justify-between items-center font-medium p-4 cursor-pointer hover:bg-neutral-50/50"
      onClick={onToggle}
    >
      <h3 className="text-[14px] text-black">{title}</h3>
      <div className="flex items-center gap-2">
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
    </div>
    {isOpen && (
      <div className="px-4 pb-4 border-t border-neutral-50">{children}</div>
    )}
  </div>
);

export default Accordion;
