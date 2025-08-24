import React, { useState, useRef, useEffect } from "react";
import "./forms.css";

function Select({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
  wdt = "sm",
  selType,
  labal,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const wrapperRef = useRef(null);

  const handleSelect = (val) => {
    onChange(val);
    setSelectedValue(val);
    setOpen(false);
  };

  // close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`custom-select-wrapper ${
        selType === "modal" ? "selectModal" : ""
      } ${wdt} ${className}`}
      ref={wrapperRef}
    >
      {labal ? (
        <label htmlFor={selectedValue} className="form-label">
          {labal}<span style={{color: "red"}}>*</span>
        </label>
      ) : (
        ""
      )}
      <div className="custom-select-pill" onClick={() => setOpen(!open)}>
        <span> {selectedValue || value || placeholder}</span>
        <img
          src="/downIcon.png"
          alt=""
          className={`select-arrow ${open ? "open" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <ul className={`custom-select-dropdown ${wdt}`}>
          {options.map((opt, i) => (
            <li
              key={i}
              className="custom-select-option"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
