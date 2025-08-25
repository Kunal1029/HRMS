/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import { toast } from "sonner";
import {
  fetchCandidates,
  removeCandidate,
  clearError,
  clearSuccess,
} from "../../redux/slices/candidateSlice";
import { dummy } from "./dummy";
import CandidateColumn from "./CandidateColumn";
import CandidateFilter from "./CandidateFilter";
import "./candidates.css";

function Candidate() {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.candidates);
  const data = dummy;

  const handleStatusChange = (id, val)=>{
    console.log("CC ", id, val)
  }


  const handleDownloadResume = (name) =>
    toast.warning(`Download Resume of ${name}`);

  const handleDeleteCandidate = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await dispatch(removeCandidate(id)).unwrap();
        toast.success(`${name} deleted!`);
      } catch {
        toast.error("Failed to delete candidate");
      }
    }
  };

  const columns = CandidateColumn(
    handleStatusChange,
    handleDownloadResume,
    handleDeleteCandidate
  );

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  useEffect(() => {
    if (success) dispatch(clearSuccess());
    if (error) dispatch(clearError());
  }, [success, error, dispatch]);

  return (
    <div className="mainCandidate">
      <CandidateFilter  />
      <div className="tbl">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Candidate;
