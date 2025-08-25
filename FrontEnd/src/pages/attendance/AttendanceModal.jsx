import { useState } from "react";
import FormModal from "../../components/modal/FormModal";

function AttendanceModal({ text }) {
  const [isOpen, setIsOpen] = useState(false);

  const attendanceFields = [
    {
      name: "designation",
      label: "Designation",
      type: "text",
      placeholder: "Enter Designation",
      inpType: "modalForm",
    },
    {
      name: "document",
      label: "Documents",
      type: "file",
      inpType: "modalForm",
    },
    {
      name: "leaveDate",
      label: "Leave Date",
      type: "date",
      required: true,
      inpType: "modalForm",
    },
    {
      name: "reason",
      label: "Reason",
      type: "text",
      placeholder: "Enter Reason",
      inpType: "modalForm",
    },
  ];

  const handleSubmit = (data) => {
    console.log("Candidate Data:", data);
    // Call API here
  };

  return (
    <>
      <p onClick={() => setIsOpen(true)}>{text}</p>

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

export default AttendanceModal;
