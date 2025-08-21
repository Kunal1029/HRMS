import Table from "../../components/Table/Table";

import { dummy } from "./dummy";
import AttendanceColumn from "./AttendanceColumn";

function Attendance() {
  const data = dummy;

  const handleEditEmployee = () => {};
  const handleDeleteEmployee = () => {};

  const columns = AttendanceColumn({
    handleEditEmployee,
    handleDeleteEmployee,
  });

  return (
    <div>
      {/* <Table columns={columns} data={candidates} /> */}
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Attendance;
