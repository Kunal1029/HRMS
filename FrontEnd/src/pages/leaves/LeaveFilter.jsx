import { useState } from "react";
import Button from "../../components/common/Button";
import Debounce from "../../components/common/Debounce";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import LeaveModal from "./LeaveModal";
import "./leaves.css";

function LeaveFilter() {
  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const dummySearchData = ["ks", "ps", "js", "ss", "pks", "s"];

  const leaveFilters = (e) => {
    alert(e);
  };

  return (
    <div className="leaveFilter">
      <div className="leftSide">
        <Select
          options={statusOptions}
          placeholder="Status"
          onChange={leaveFilters}
        />
      </div>

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
        <LeaveModal />
      </div>
    </div>
  );
}

export default LeaveFilter;
