import Actions from "../../components/common/Actions";
import EmployeeModal from "./EmployeeModal";
import "./employees.css";

function EmployeeColumn(handleEditEmployee, handleDeleteEmployee) {
  const columns = [
    {
      header: "Sr no.",
      accessor: "id",
      render: (_, row, index) => index + 1,
    },
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
      render: (_, row) => {
        // const actionItems = [
        //   { item: "Edit", fn: () => handleEditEmployee(row._id) },
        //   { item: "Delete", fn: () => handleDeleteEmployee(row._id, row.name)},
        // ];
        const actionItems = [
          { compo: <EmployeeModal text="Edit" /> },
          { compo: <EmployeeModal text="Delete" /> },
        ];

        return <Actions items={actionItems} />;
      },
    },
  ];

  return columns;
}

export default EmployeeColumn;
