// NewCandidate.js
import React, { useState } from "react";
import FormModal from "../../components/modal/FormModal";
import Button from "../../components/common/Button";

function NewCandidate() {
  const [isOpen, setIsOpen] = useState(false);

  const candidateFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      required: true,
    },
    {
      name: "position",
      label: "Position",
      type: "select",
      required: true,
      options: [
        { label: "Intern", value: "Intern" },
        { label: "Designer", value: "Designer" },
        { label: "Developer", value: "Developer" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter email",
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter phone",
      required: true,
    },
    {
      name: "experience",
      label: "Experience",
      type: "number",
      placeholder: "Enter Experience",
    },
    
    {
      name: "resume",
      label: "Resume",
      type: "file",
      required: true,
    },
  ];

  const handleSubmit = (data) => {
    console.log("Candidate Data:", data);
    // Call API here
  };

  return (
    <>
      <Button
        classParent=""
        type="submit" 
        behaviour="primary"
        size="sm"
        className
        onClick={() => setIsOpen(true)}
      >
        Add Candidate
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Candidate"
        fields={candidateFields}
        onSubmit={handleSubmit}
        btnText="Save"
      />
    </>
  );
}

export default NewCandidate;
