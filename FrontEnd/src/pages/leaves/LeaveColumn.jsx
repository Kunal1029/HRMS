import React from "react";
import Select from "../../components/forms/Select";
import Actions from "../../components/common/Actions";
import "./leaves.css"

function LeaveColumn(handleStatusChange) {
  const statusOptions = [
    { value: "Pending", label: "Pending", color: "yellow" },
    { value: "Approved", label: "Approved" , color: "success" },
    { value: "Rejected", label: "Rejected", color: "danger" },
  ];

  const columns = [
    // { 
    //   header: "Sr no.", 
    //   accessor: "id", 
    //   render: (_, row, index) => index + 1 
    // },
    { 
      header: "Profile", 
      accessor: "profile",
      render: (value) => (
        <img src={value} alt="Profile" className="employee-profile" />
      ),
    },
    { header: "Name", accessor: "name" },
    { header: "Date", accessor: "date" },
    { header: "Reason", accessor: "reason" },
    {
      header: "Status",
      accessor: "status",
      render: (_, row) => (
        <Select
          value={row.status}
          onChange={(value) => handleStatusChange(row._id, value)}
          options={statusOptions}
        />
      ),
    },
    {
      header: "Docs",
      accessor: "docs",
      render: () => {
        return <div className="docIcon"><img src="/docIcon.png" alt="" /></div>;
      },
    },
  ];

  return columns;
}

export default LeaveColumn;
