import React, { useEffect, useRef, useState } from "react";

const formatDisplay = (value) => {
  if (value === 0 || value === null || value === undefined) return "";
  return String(value);
};

const NumberInput = ({
  value = 0,
  onChange,
  min = 0,
  className = "",
  id,
  name,
  placeholder,
  disabled,
}) => {
  const [text, setText] = useState(() => formatDisplay(value));
  const focusedRef = useRef(false);

  useEffect(() => {
    if (!focusedRef.current) {
      setText(formatDisplay(value));
    }
  }, [value]);

  const commitValue = (raw) => {
    const parsed = parseFloat(raw);
    const next = Number.isNaN(parsed) || raw === "" ? min : Math.max(min, parsed);
    onChange(next);
    setText(formatDisplay(next));
  };

  const handleFocus = (event) => {
    focusedRef.current = true;
    if (value === 0) {
      setText("");
    }
    event.target.select();
  };

  const handleChange = (event) => {
    const raw = event.target.value;
    if (raw === "" || raw === "." || raw === "-") {
      setText(raw);
      onChange(min);
      return;
    }

    if (!/^-?\d*\.?\d*$/.test(raw)) return;

    setText(raw);
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    focusedRef.current = false;
    commitValue(text);
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      id={id}
      name={name}
      value={text}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  );
};

export default NumberInput;
