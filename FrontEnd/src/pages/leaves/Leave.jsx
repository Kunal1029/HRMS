import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import {toast} from "sonner"
import { 
  fetchCandidates, 
  removeCandidate, 
  editCandidate,
  clearError,
  clearSuccess 
} from "../../redux/slices/candidateSlice";
import { dummy } from "./dummy";

function Leave() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.candidates);
  const dummycandidates = dummy;
  // Handlers
  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      await dispatch(editCandidate({ id: candidateId, candidateData: { status: newStatus } })).unwrap();
      toast.success("Status updated successfully!")
    } catch (err) {
      toast.error("Failed to update status", err.message)
    }
  };

  const handleDownloadResume = (candidateId, candidateName) => {
    // Implement resume download logic here
    toast.warning("Download Resume of " + candidateName);
  };

  const handleDeleteCandidate = async (candidateId, candidateName) => {
    if (window.confirm(`Are you sure you want to delete ${candidateName}?`)) {
      try {
        await dispatch(removeCandidate(candidateId)).unwrap();
        toast.success(`! ${candidateName} deleted successfully!`);
      } catch (err) {
        console.error("Failed to delete candidate:", err);
        toast.error("Failed to delete candidate.");
      }
    }
  };

  // Columns definition
  const columns = [
    { 
      header: "Sr no.", 
      accessor: "id",
      render: (_, row, index) => index + 1
    },
    { header: "Leave", accessor: "name" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Position", accessor: "position" },
    {
      header: "Status",
      accessor: "status",
      render: (_, row) => (
        <select
          value={row.status} 
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
        >
          <option value="New">New</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      )
    },
    { header: "Experience", accessor: "experience" },
    {
      header: "Action",
      accessor: "actions",
      render: (_, row) => (
        <div>
          <button onClick={() => handleDownloadResume(row._id, row.name)}>
            Download Resume
          </button>
          <button onClick={() => handleDeleteCandidate(row._id, row.name)}>
            Delete Candidate
          </button>
        </div>
      )
    }
  ];

  // Fetch candidates on mount
  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      console.log("Operation successful");
      dispatch(clearSuccess());
    }
    if (error) {
      console.error("Error:", error);
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  // if (loading) {
  //   return <div>Loading candidates...</div>;
  // }

  return (
    <div>
      {/* <Table columns={columns} data={candidates} /> */}
      <Table columns={columns} data={dummycandidates} />
    </div>
  );
}

export default Leave;
