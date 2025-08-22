import { useState } from "react";
import FormModal from "../../components/modal/FormModal";

function EditProfileModal({text}) {
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
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "Enter department",
    },
    
  ];

  const handleSubmit = (data) => {
    console.log("Candidate Data:", data);
    // Call API here
  };

  return (
    <>
      <p
        onClick={() => setIsOpen(true)}
      >
        {text}
      </p>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${text}`}
        fields={candidateFields}
        onSubmit={handleSubmit}
        btnText={`${text} details`}
      />
    </>
  );
}

export default EditProfileModal
