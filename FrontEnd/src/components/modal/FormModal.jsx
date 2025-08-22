import React, { useState } from "react";
import Modal from "./Model";
import Input from "../forms/Input";
import "./FormModal.css";
import Button from "../common/Button";

const FormModal = ({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  btnText,
  initialData = {},
}) => {
  const [formData, setFormData] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: initialData[field.name] || "" }),
      {}
    )
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={title}
      showCloseButton={true}
    >
      <form className="form-modal-contact-form" onSubmit={handleSubmit}>
        <div className="form-modal-container">
          {fields.map((field, i) => (
            <div className="form-modal-group" key={i}>
              {field.type === "select" ? (
                <>
                  <label className="form-label" htmlFor={field.name}>
                    {field.label} {field.required && "*"}
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    className="form-input normal-input"
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt, idx) => (
                      <option key={idx} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <Input
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  disabled={field.disabled}
                  error={field.error}
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-modal-button-group">

          <Button
            classParent=""
            type="submit"
            behaviour="primary"
            size="sm"
            className="form-modal-btn form-modal-btn-primary"
          >
            {btnText}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
