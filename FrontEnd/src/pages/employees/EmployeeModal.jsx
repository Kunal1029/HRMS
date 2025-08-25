import { useState } from "react";
import FormModal from "../../components/modal/FormModal";

function EmployeeModal({text}) {
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
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "Enter department",
    },
   
    {
      name: "dateOfJoining",
      label: "Date of Joining",
      type: "date",
      required: true,
    },
    {
      name: "Profile Photo",
      label: "Profile",
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
      <p
        onClick={() => setIsOpen(true)}
      >
        {text}
      </p>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${text} Employee`}
        fields={candidateFields}
        onSubmit={handleSubmit}
        btnText={`${text} Employee Details`}
      />
    </>
  );
}

export default EmployeeModal
