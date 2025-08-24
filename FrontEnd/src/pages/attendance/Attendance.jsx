import Table from "../../components/Table/Table";

import { dummy } from "./dummy";
import AttendanceColumn from "./AttendanceColumn";
import AttendanceFilter from "./AttendanceFilter";
import "./attendance.css"

function Attendance() {
  const data = dummy;

  const handleEditEmployee = () => {};
  const handleDeleteEmployee = () => {};

  const handleAttendanceStatus = (id,e)=>{
    console.log(id,e)
  }

  const columns = AttendanceColumn(
    handleAttendanceStatus,
    handleEditEmployee,
    handleDeleteEmployee,
  );

  return (
    <div className="mainAttendance">
      <AttendanceFilter />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Attendance;
