import { useState } from "react";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import NewCandidate from "./NewCandidate";
// import DebouncedSearch from "./DebouncedSearch"; // import
import "./candidates.css";
import Debounce from "../../components/common/Debounce";

function CandidateFilter() {
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = [
    { value: "New", label: "New" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
  ];

  const positionOptions = [
    { value: "Designer", label: "Designer" },
    { value: "Developer", label: "Developer" },
    { value: "Human Resource", label: "Human Resource" },
  ];

  const dummySearchData = ["ks", "ps", "js", "ss", "pks", "s"];
  function changeStatusOptions(e) {
    console.log(e);
  }
  return (
    <div className="candidateFilter">
      <div className="leftSide">
        <Select
          options={statusOptions}
          onChange={changeStatusOptions}
          placeholder="Status"
        />
        <Select
          options={positionOptions}
          onChange={changeStatusOptions}
          placeholder="Position"
          wdt="md"
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
              formType="search"
              value={searchTerm}
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

        <NewCandidate />
      </div>
    </div>
  );
}

export default CandidateFilter;
