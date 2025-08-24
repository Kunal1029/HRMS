import Table from "../../components/Table/Table";
import LeaveColumn from "./LeaveColumn";
import LeaveFilter from "./LeaveFilter";
import "./leaves.css";

import { dummy } from "./dummy";

function Leave() {
  const dummycandidates = dummy;

  const handleStatusChange = (id,e) => {
    console.log(id,e);
  };

  const columns = LeaveColumn(handleStatusChange);
  return (
    <div className="mainLeave">
      <LeaveFilter />
      <Table columns={columns} data={dummycandidates} />
    </div>
  );
}

export default Leave;
