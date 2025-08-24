import Button from "../../components/common/Button";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import NewCandidate from "./NewCandidate";
import "./candidates.css";
 
function CandidateFilter() {
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

  function myChn(val){
    console.log("candi filter ", val)
  } 

  return (  
    <div className="candidateFilter">
      <div className="leftSide">
        
        <Select options={statusOptions} onChange={(e)=>myChn(e)} placeholder="Status" />
        <Select wdt="md" onChange={(e)=>myChn(e)}  options={positionOptions} placeholder="Position" />

      </div>

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
            onChange={() => ("")}
          />
        </div>

        

        <NewCandidate />
      </div>
    </div>
  );
}

export default CandidateFilter;
