import Select from "../../components/forms/Select";
import AttendanceModal from "./AttendanceModal"

function AttendanceColumn(handleAttendanceStatus, handleEditEmployee, handleDeleteEmployee) {
  const statusOptions = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
  ];

  const columns = [
    { header: "Profile", accessor: "profile", render: (_, row) => (
        <img
          src={row.profile}
          alt={row.name}
          className="w-10 h-10 rounded-full"
        />
      )
    },
    { header: "Employee Name", accessor: "name" },
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
        />
      ),
    },
    {
      header: "Action",
      accessor: "actions",
      render: (_, row) => {
        // const actionItems = [
        //   { item: "Edit", fn: () => handleEditEmployee(row._id) },
        //   { item: "Delete", fn: () => handleDeleteEmployee(row._id) },
        // ];
          const actionItems = [
            { compo: <AttendanceModal text="Edit" /> },
            { compo: <AttendanceModal text="Delete" /> },
          ];

        return <Actions items={actionItems} />;
      },
    },
  ];

  return columns;
}

export default AttendanceColumn;
