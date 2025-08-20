import Input from "./Input";
import Button from "../common/Button";

import { useState } from "react";

function Form({ fields = [], onSubmit, buttonText = "Submit" }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: f.value || "" }), {})
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit(formData);
    
    if (result && result.errors) {
      setErrors(result.errors);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {fields.map((f, i) => (
        <Input
          key={i}
          label={f.label}
          type={f.type}
          name={f.name}
          value={formData[f.name]}
          onChange={handleChange}
          placeholder={f.placeholder}
          required={f.required}
          disabled={f.disabled}
          formType={f.formType}
          error={errors[f.name]}
        />
      ))}

      
      <Button classParent="formBTN" type="submit" behaviour="primary" size="sm">
        {buttonText}
      </Button>
    </form>
  );
}

export default Form;
