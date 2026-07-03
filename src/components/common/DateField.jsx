import React, { useRef } from "react";
import { Calendar } from "lucide-react";
import { formatDateLabel } from "./dateUtils";

const DateField = ({
  value,
  onChange,
  min,
  max,
  error,
  placeholder = "Select date",
  className = "",
}) => {
  const inputRef = useRef(null);
  const hasError = Boolean(error);

  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;

    input.focus();

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
        return;
      }
    } catch {
      // showPicker can throw if called outside a user gesture
    }

    input.click();
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={openPicker}
        className={`relative flex w-full items-center gap-2 rounded-sm border bg-white px-3 py-2 text-left transition-colors ${
          hasError
            ? "border-red-300 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-200"
            : "border-neutral-300 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900/10"
        }`}
      >
        <Calendar className="h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.5} />
        <span
          className={`flex-1 truncate text-xs ${
            value ? "text-neutral-900" : "text-neutral-400"
          }`}
        >
          {value ? formatDateLabel(value) : placeholder}
        </span>
      </button>

      <input
        ref={inputRef}
        type="date"
        value={value || ""}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        aria-invalid={hasError}
      />

      {hasError && (
        <p className="mt-1 text-[10px] leading-relaxed text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DateField;
