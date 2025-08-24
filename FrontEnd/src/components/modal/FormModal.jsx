import React, { useState } from "react";
import Modal from "./Model";
import Input from "../forms/Input";
import "./FormModal.css";
import Button from "../common/Button";
import Select from "../forms/Select";

const FormModal = ({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  btnText,
  initialData = {},
  anylinks = [],
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

  const selectHandle = (name, val) => {
    console.log(name, val);
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    const isEditMode = Object.keys(initialData || {}).length > 0;

    if (!isEditMode) {
      // Add mode → clear but stay open
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
      );
    } else {
      // Edit mode → close modal after submit
      onClose();
    }
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
      <div className="commonformModal">
        <form className="form-modal-contact-form" onSubmit={handleSubmit}>
          <div className="form-modal-container">
            {fields.map((field, i) => (
              <div className="form-modal-group" key={i}>
                {field.type === "select" ? (
                  <div className="">
                    <Select
                      wdt="na"
                      selType="modal"
                      className="normalSelect"
                      options={field.options}
                      onChange={(e) => selectHandle(field.name, e)}
                      placeholder={`Select ${field.label}`}
                      labal={`${field.label}`}
                    />
                  </div>
                ) : (
                  <Input
                    label={field.label ? field.label : ""}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={field.disabled}
                    error={field.error}
                    formType="modalForm"
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
        <div>
          {anylinks.length >= 1 ? (
            <div>
              {anylinks.map((x, i) => (
                <div key={i}>
                  {x.title} <a href="">{x.link}</a>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
