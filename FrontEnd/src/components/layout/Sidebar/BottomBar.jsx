import Menu from "./Menu";
import "./sidebar.css"

function BottomBar() {
  const recruitmentProcesses = [
    { name: "Candidates", icon: "./candidate-icon.png" },
  ];

  const organizationProcesses = [
    { name: "Employees", icon: "./emp-icon.png" },
    { name: "Attendance", icon: "./attendance-icon.png" },
    { name: "Leaves", icon: "./leave-icon.png" },
  ];

  const otherProcesses = [
    { name: "LogOut", icon: "./logout-icon.png" },
  ];

  return (
    <div className="side-menu">
      <Menu department="Recruitment" processes={recruitmentProcesses} />
      <Menu department="Organization" processes={organizationProcesses} />
      <Menu department="Others" processes={otherProcesses} />
    </div>
  );
}

export default BottomBar;
