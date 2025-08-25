import { useState } from "react";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import "./attendance.css";
import Debounce from "../../components/common/Debounce";

function AttendanceFilter() {
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
    { value: "Medical Leave", label: "Medical Leave" },
    { value: "Work from home", label: "Work from home" },
  ];

  function attendanceFilter(e) {
    alert(e);
  }
  const dummySearchData = ["ks", "ps", "js", "ss", "pks", "s"];

  return (
    <div className="attendanceFilter">
      <Select
        wdt="md"
        options={statusOptions}
        onChange={attendanceFilter}
        placeholder="Status"
      />

      <div className="rightSide">
        <div>
          <div className="filterSearch">
            <img src="/search.png" alt="" />
            <Input
              type="search"
              name="search"
              placeholder="Search"
              classInput="search-input"
              // value=""
              value={searchTerm}
              formType="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {searchTerm.length > 0 && (
          <div className="filterData">
            <Debounce
              inputText={searchTerm}
              data={dummySearchData}
              delay={500}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceFilter;
