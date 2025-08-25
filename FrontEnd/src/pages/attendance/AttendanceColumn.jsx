/* eslint-disable no-unused-vars */
import { useState } from "react";
import Select from "../../components/forms/Select";
import AttendanceModal from "./AttendanceModal";
import WarningModal from "../../components/modal/WarningModal";

function AttendanceColumn(
  handleAttendanceStatus,
  handleEditAttendance,
  handleDeleteAttendance
) {
  const statusOptions = [
    { value: "Present", label: "Present", color: "success" },
    { value: "Absent", label: "Absent", color: "danger" },
  ];

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
    { header: "Attendance Name", accessor: "name" },
    { header: "Position", accessor: "position" },
    { header: "Department", accessor: "department" },
    { header: "Task", accessor: "task", render: (_, row) => row.task || "--" },
    {
      header: "Status",
      accessor: "status",
      render: (_, row) => (
        <Select
          value={row.status}
          onChange={(value) => handleAttendanceStatus(row._id, value)}
          options={statusOptions}
          placeholder=""  //db
        />
      ),
    },
    {
      header: "Action",
      accessor: "actions",
      render: (_, row) => (
        <div className="actionsAttendance">
          <div
            className="actionAttenDot"
            onClick={() =>
              setToggleImg({ id: row._id, toggle: !toggleActionImg.toggle })
            }
          >
            <div className="actionADot"></div>
            <div className="actionADot"></div>
            <div className="actionADot"></div>
          </div>

          {toggleActionImg.id === row._id && toggleActionImg.toggle && (
            <ul className="actionAttenDropDown">
              <li>
                <AttendanceModal text="Edit" />
              </li>
              <li>
                <p onClick={() => setIsOpen(true)}>Delete</p>
              </li>
              <WarningModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Are you sure you want to delete?"
                text="Delete Attendance"
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

export default AttendanceColumn;
