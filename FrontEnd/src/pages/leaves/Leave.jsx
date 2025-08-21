import Table from "../../components/Table/Table";
import LeaveColumn from "./LeaveColumn";

import { dummy } from "./dummy";

function Leave() {
  const dummycandidates = dummy;

  const handleStatusChange = async () => {};

  const columns = LeaveColumn({
    handleStatusChange,
  });
  return (
    <div>
      <Table columns={columns} data={dummycandidates} />
    </div>
  );
}

export default Leave;
