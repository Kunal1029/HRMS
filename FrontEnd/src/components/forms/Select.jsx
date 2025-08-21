import React from 'react'

function Select({ 
  value, 
  onChange, 
  options,
  placeholder = false,
  disabled = false,
  className = ""
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <select
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
        className={className}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}

      </select>
    </div>
  )
}

export default Select