import React from 'react'
import Table from './Table';
const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Role", accessor: "role" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Role", accessor: "role" },
  { header: "Role", accessor: "role" },
 
  {
    header: "Actions",
    accessor: "actions",
    render: (_, row) => <button onClick={() => alert(row.name)}>View</button>
  }
];

const data = [
  { name: "Kunal", email: "kunal@mail.com", role: "Developer" },
  { name: "Riya", email: "riya@mail.com", role: "Designer" }
];
function UseSample() {
  return (
    <div>
      <h2>Users</h2>
      <Table columns={columns} data={data} />
    </div>
  )
}

export default UseSample
