import { useState } from "react";
import FormModal from "../../components/modal/FormModal";

function AttendanceModal({text}) {
  const [isOpen, setIsOpen] = useState(false);

  const attendanceFields = [
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
      name: "dateOfJoining",
      label: "Date of Joining",
      type: "date",
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
        title={`${text} Attendance`}
        fields={attendanceFields}
        onSubmit={handleSubmit}
        btnText={`${text} Attendance Details`}
      />
    </>
  );
}

export default AttendanceModal
