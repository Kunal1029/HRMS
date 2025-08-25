import Table from "../../components/Table/Table";
import LeaveColumn from "./LeaveColumn";
import LeaveFilter from "./LeaveFilter";
import "./leaves.css";

import { dummy } from "./dummy";
import Calendar from "../../components/calendar/Calendar";

function Leave() {
  const dummycandidates = dummy;

  const handleStatusChange = (id, e) => {
    console.log(id, e);
  };

  const columns = LeaveColumn(handleStatusChange);
  return (
    <div className="mainLeave">
      <LeaveFilter />
      <div className="leaveCal">
        <Table columns={columns} data={dummycandidates} />
        <Calendar />
      </div>
    </div>
  );
}

export default Leave;
