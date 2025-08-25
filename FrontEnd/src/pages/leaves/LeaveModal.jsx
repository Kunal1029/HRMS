import React, { useState } from "react";
import FormModal from "../../components/modal/FormModal";
import Button from "../../components/common/Button";

function LeaveModal() {
  const [isOpen, setIsOpen] = useState(false);

  const leaveField =
   [
    {
      name: "Search Employeee",
      label: "Search Employeee",
      type: "text", 
      placeholder: "Search Employeee",
      inpType: "modalSearchBar"
    },
    {
      name: "designation",
      label: "Designation",
      type: "text",
      placeholder: "Enter Designation",
      inpType: "modalForm"
    },
    {
      name: "document",
      label: "Documents",
      type: "file",
      inpType: "modalForm"
    },
    {
      name: "leaveDate",
      label: "Leave Date", 
      type: "date",
      required: true,
      inpType: "modalForm"
    },
    {
      name: "reason",
      label: "Reason",
      type: "text",
      placeholder: "Enter Reason",
      inpType: "modalForm"
    },
  ];

  const handleSubmit = (data) => {
    console.log("leave Data:", data);
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
        Add Leave
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Leave"
        fields={leaveField}
        onSubmit={handleSubmit}
        btnText="Save"
      />
    </>
  );
}

export default LeaveModal;
