  import React from "react";
import Select from "../../components/forms/Select";
import Actions from "../../components/common/Actions";

function CandidateColumn(handleStatusChange, handleDownloadResume, handleDeleteCandidate) {
  const statusOptions = [
    { value: "Scheduled", label: "Scheduled" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
  ];

  const columns = [
    { header: "Sr no.", accessor: "id", render: (_, row, index) => index + 1 },
    { header: "Candidate Name", accessor: "name" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Position", accessor: "position" },
    {
      header: "Status",
      accessor: "status",
      render: (_, row) => (
        <Select
          value={row.status}
          onChange={(value) => handleStatusChange(row._id, value)}
          options={statusOptions}
          placeholder="New"
        />
      ),
    },
    { header: "Experience", accessor: "experience"},
    // {
    //   header: "Action",
    //   accessor: "actions",
    //   render: (_, row) => {
    //     const actionItems = [
    //       { item: "Download Resume", fn: () => handleDownloadResume(row._id, row.name) },
    //       { item: "Delete Candidate", fn: () => handleDeleteCandidate(row._id, row.name) },
    //     ];

    //     return <Actions items={actionItems} />;
    //   },
    // },
  ];

  return columns;
}

export default CandidateColumn;
