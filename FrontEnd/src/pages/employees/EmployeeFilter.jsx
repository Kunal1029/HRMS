import { useState } from "react";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import "./employees.css";
import Debounce from "../../components/common/Debounce";

function EmployeeFilter() {
  const [searchTerm, setSearchTerm] = useState("");

  const positionOptions = [
    { value: "Designer", label: "Designer" },
    { value: "Developer", label: "Developer" },
    { value: "Human Resource", label: "Human Resource" },
  ];

  function positionFilter(e) {
    alert(e);
  }

  const dummySearchData = ["ks", "ps", "js", "ss", "pks", "s"];

  return (
    <div className="employeeFilter">
      <Select
        wdt="md"
        options={positionOptions}
        onChange={positionFilter}
        placeholder="Position"
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

export default EmployeeFilter;
