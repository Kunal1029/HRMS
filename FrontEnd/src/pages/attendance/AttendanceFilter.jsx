import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import "./attendance.css";

function AttendanceFilter() {
  const statusOptions = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
    { value: "Medical Leave", label: "Medical Leave" },
    { value: "Work from home", label: "Work from home" },
  ];

  return (
    <div className="attendanceFilter">
        <Select wdt="md" options={statusOptions} placeholder="Status" />

      <div className="rightSide">
        <div className="filterSearch">
          <img src="/search.png" alt="" />
          <Input
            type="search"
            name="search"
            placeholder="Search"
            classInput="search-input"
            value=""
            formType="search"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default AttendanceFilter;
