import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import "./employees.css";

function EmployeeFilter() {
  const positionOptions = [
    { value: "Designer", label: "Designer" },
    { value: "Developer", label: "Developer" },
    { value: "Human Resource", label: "Human Resource" },
  ];
  
  function positionFilter(e){
    alert(e)
  }

  return (
    <div className="employeeFilter">
      <Select wdt="md" options={positionOptions} onChange={positionFilter} placeholder="Position" />

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

export default EmployeeFilter;
