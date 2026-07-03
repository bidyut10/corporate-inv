import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({
  value,
  onChange,
  options,
  placeholder,
  renderOption,
  renderSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:border-cyan-500 flex items-center justify-between bg-white cursor-pointer"
      >
        <span className="truncate">
          {value
            ? renderSelected
              ? renderSelected(value)
              : value
            : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-300 rounded-sm shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-xs"
            >
              {renderOption ? renderOption(option) : option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
