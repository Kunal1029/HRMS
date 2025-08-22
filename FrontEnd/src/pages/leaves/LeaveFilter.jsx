import Button from "../../components/common/Button";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import LeaveModal from "./LeaveModal";
import "./leaves.css";

function LeaveFilter() {


  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Developer" },
    { value: "Rejected", label: "Rejected" },
  ];

  return (
    <div className="leaveFilter">
      <div className="leftSide">
        
        <Select options={statusOptions} placeholder="Status" />
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
            onChange={() => {}}
          />
        </div>
        <LeaveModal />
      </div>
    </div>
  );
}

export default LeaveFilter;
