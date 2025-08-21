import Table from "../../components/Table/Table";
import LeaveColumn from "./LeaveColumn";
import LeaveFilter from "./LeaveFilter";

import { dummy } from "./dummy";

function Leave() {
  const dummycandidates = dummy;

  const handleStatusChange = async () => {};

  const columns = LeaveColumn({
    handleStatusChange,
  });
  return (
    <div>
      <LeaveFilter />
      <Table columns={columns} data={dummycandidates} />
    </div>
  );
}

export default Leave;
