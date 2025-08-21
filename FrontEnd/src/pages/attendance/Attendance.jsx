import Table from "../../components/Table/Table";

import { dummy } from "./dummy";
import AttendanceColumn from "./AttendanceColumn";
import AttendanceFilter from "./AttendanceFilter";

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
      <AttendanceFilter />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Attendance;
