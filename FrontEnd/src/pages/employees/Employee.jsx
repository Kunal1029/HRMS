/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import Table from "../../components/Table/Table";
import { toast } from "sonner";
import { dummy } from "./dummy";
import EmployeeColumn from "./EmployeeColumn";
import EmployeeFilter from "./EmployeeFilter";

function Employee() {
  const data = dummy;

  const handleEditEmployee = async () => {};

  const handleDeleteEmployee = async () => {};

  const columns = EmployeeColumn({
    handleEditEmployee,
    handleDeleteEmployee,
  });


  return <div>
    <EmployeeFilter />
    <Table columns={columns} data={data} />;
    </div>
}

export default Employee;
