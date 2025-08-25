import React, { useState } from "react";
import Select from "../../components/forms/Select";
import CandidateAction from "./CandidateAction";
import "./candidates.css";

function CandidateColumn(
  handleStatusChange
  // handleDownloadResume,
  // handleDeleteCandidate
) {
  const [toggleActionImg, setToggleImg] = useState({ id: null, toggle: false });

  const statusOptions = [
    { value: "Scheduled", label: "Scheduled", color: "yellow"},
    { value: "Ongoing", label: "Ongoing", color: "success"  },
    { value: "Selected", label: "Selected", color: "primary"  },
    { value: "Rejected", label: "Rejected", color: "danger"  },
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

    { header: "Experience", accessor: "experience" },
    {
      header: "Action",
      accessor: "actions",

      render: (_, row) => (
        <div className="actions">
          <div
            className="actionCandidate"
            onClick={() => 
              setToggleImg({ id: row._id, toggle: !toggleActionImg.toggle })
            }
          >
            <div className="actionDot"></div>
            <div className="actionDot"></div>
            <div className="actionDot"></div>
          </div>

          {toggleActionImg.id === row._id && toggleActionImg.toggle && (
            <ul className="actionDropDown">
              <li>Download</li>
              <li>
                <CandidateAction
                  text="Delete"
                  title="Are you sure you want to delete?"
                />
              </li>
            </ul>
          )}
        </div>
      ),
    },
  ];

  return columns;
}

export default CandidateColumn;
