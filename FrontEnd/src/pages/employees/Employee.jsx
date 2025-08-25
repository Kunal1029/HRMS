/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import Table from "../../components/Table/Table";
import { toast } from "sonner";
import { dummy } from "./dummy";
import EmployeeColumn from "./EmployeeColumn";
import EmployeeFilter from "./EmployeeFilter";
import "./employees.css"

function Employee() {
  const data = dummy;

  const handleEditEmployee = async () => {};

  const handleDeleteEmployee = async () => {};

  const columns = EmployeeColumn({
    handleEditEmployee,
    handleDeleteEmployee,
  });


  return <div className="mainEmp">
    <EmployeeFilter />
    <div className="tbl">
      <Table columns={columns} data={data} />;
    </div>
    </div>
}

export default Employee;
