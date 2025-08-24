/* eslint-disable no-unused-vars */
// import { useState } from "react";
import { useState } from "react";
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
  formType,
}) {
  const [searchBtnOpen, setSBO] = useState(false)

  return (
    <div 
      className={`${
        formType === "search"
          ? ""
          : formType === "modalForm" ? "form-group modalTypeForm" : formType === "modalSearchBar" ? "modalFormSearchBar form-group"
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
        onClick={formType === "modalSearchBar" ? ()=>setSBO(true): ()=>("")}
        className={`form-input ${error ? "input-error" : ""} ${
          formType === "search"
            ? "search-input"
            : formType === "modalForm"
            ? "modalTypeForm normal-input"
            : formType === "modalSearchBar"? " normal-input" : "normal-input"
        } `}
      />

     {/* {formType === "modalSearchBar" && value.length > 0 &&  <button className="btnSearch">Search</button>} */}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Input;
