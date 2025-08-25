/* eslint-disable no-unused-vars */
import { useState } from "react";
import Actions from "../../components/common/Actions";
import EmployeeModal from "./EmployeeModal";
import "./employees.css";
import WarningModal from "../../components/modal/WarningModal";

function EmployeeColumn(handleEditEmployee, handleDeleteEmployee) {
  const [isOpen, setIsOpen] = useState(false);

  const [toggleActionImg, setToggleImg] = useState({ id: null, toggle: false });
  const handleSubmit = () => {
    setIsOpen(false);

    setTimeout(() => {
      alert("del success fully");
    }, 1000);
  };

  const columns = [
    
    {
      header: "Profile",
      accessor: "profile",
      render: (value) => (
        <img src={value} alt="Profile" className="employee-profile" />
      ),
    },
    { header: "Employee Name", accessor: "name" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Position", accessor: "position" },
    { header: "Department", accessor: "department" },
    { header: "Date of Joining", accessor: "doj" },
    {
      header: "Action",
      accessor: "actions",
      render: (_, row) => (
        // const actionItems = [
        //   { item: "Edit", fn: () => handleEditEmployee(row._id) },
        //   { item: "Delete", fn: () => handleDeleteEmployee(row._id, row.name)},
        // ];
        // const actionItems = [
        //   { compo: <EmployeeModal text="Edit" /> },
        //   { compo: <EmployeeModal text="Delete" /> },
        // ];

        // return <Actions items={actionItems} />;

        <div className="actionsEmployee">
          <div
            className="actionEmpDot"
            onClick={() =>
              setToggleImg({ id: row._id, toggle: !toggleActionImg.toggle })
            }
          >
            <div className="actionEDot"></div>
            <div className="actionEDot"></div>
            <div className="actionEDot"></div>
          </div>

          {toggleActionImg.id === row._id && toggleActionImg.toggle && (
            <ul className="actionEmpDropDown">
              <li>
                <EmployeeModal text="Edit" />
              </li>
              <li>
                <p onClick={() => setIsOpen(true)}>Delete</p>
              </li>
              <WarningModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Are you sure you want to delete?"
                text="Delete Employee"
                onSubmit={handleSubmit}
                extrabtn="Delete"
              />
            </ul>
          )}
        </div>
      ),
    },
  ];

  return columns;
}

export default EmployeeColumn;
