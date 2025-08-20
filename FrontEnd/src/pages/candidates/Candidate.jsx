// Candidate.jsx
import Table from "../../components/Table/Table";

const columns = [
  { header: "Sr no.", accessor: "id" },
  { header: "Candidate Name", accessor: "name" },
  { header: "Email Address", accessor: "email" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Position", accessor: "position" },
  {
    header: "Status",
    accessor: "status",
    render: (_, row) => (
      <select value={row.status}>
        <option>New</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>
    )
  },
  { header: "Experience", accessor: "experience" },
  {
    header: "Action",
    accessor: "actions",
    render: (_, row) => (
      <div>
        <button onClick={() => alert("Download Resume of " + row.name)}>
          Download Resume
        </button>
        <button onClick={() => alert("Delete " + row.name)}>
          Delete Candidate
        </button>
      </div>
    )
  }
];

const data = [
  {
    id: "01",
    name: "Jacob William",
    email: "jacob.william@example.com",
    phone: "(252) 555-0111",
    position: "Senior Developer",
    status: "New",
    experience: "1+"
  },
  {
    id: "02",
    name: "Guy Hawkins",
    email: "kenzi.lawson@example.com",
    phone: "(907) 555-0101",
    position: "Human Resource Intern",
    status: "New",
    experience: "0"
  },
  {
    id: "03",
    name: "Arlene McCoy",
    email: "arlene.mccoy@example.com",
    phone: "(302) 555-0107",
    position: "Full Time Designer",
    status: "Selected",
    experience: "3"
  },
  {
    id: "04",
    name: "Leslie Alexander",
    email: "willie.jennings@example.com",
    phone: "(207) 555-0119",
    position: "Full Time Developer",
    status: "Rejected",
    experience: "0"
  }
];

function Candidate() {
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Candidate;
