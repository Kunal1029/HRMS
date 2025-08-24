// import { useState } from "react";
import "./forms.css";
function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "", 
  required = false,
  disabled = false,
  formType = false,
}) {
  
 

  return (
    <div 
      className={`${
        formType === "search"
          ? ""
          : formType === "modalForm"
          ? "form-group modalTypeForm"
          : "form-group"
      } `}
    >
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`form-input ${error ? "input-error" : ""} ${
            formType === "search"
              ? "search-input"
              : formType === "modalForm"
              ? "modalTypeForm normal-input"
              : "normal-input"
          } `}
        />
  

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Input;
