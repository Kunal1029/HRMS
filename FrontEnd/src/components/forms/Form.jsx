/* eslint-disable no-unused-vars */
import Input from "./Input";
import Button from "../common/Button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function Form({
  fields = [],
  onSubmit,
  buttonText = "Submit",
  resetOnSuccess = true,
  successMessage,
  errorMessage,
  success,
  error,
}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: f.value || "" }), {})
  );

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const resetForm = () => {
    setFormData(fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit(formData, resetForm);

    if (result?.errors) {
      setErrors(result.errors);
      toast.error("Please fix the highlighted errors.");
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(successMessage || "Submitted successfully ✅");
    }
    if (error) {
      toast.error(errorMessage || error);
    }
  }, [success, error, successMessage, errorMessage]);

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

      <Button
        classParent="formBTN"
        type="submit"
        behaviour="primary"
        size="sm"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : buttonText}
      </Button>
    </form>
  );
}

export default Form;
