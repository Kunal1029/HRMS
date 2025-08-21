import Menu from "./Menu";
import "./sidebar.css";

function BottomBar() {
  const recruitmentProcesses = [
    { name: "Candidates", path: "candidates", icon: "/candidate-icon.png" },
  ];
  const organizationProcesses = [
    { name: "Employees", path: "employees", icon: "/emp-icon.png" },
    { name: "Attendance", path: "attendance", icon: "/attendance-icon.png" },
    { name: "Leaves", path: "leaves", icon: "/leave-icon.png" },
  ];
  const otherProcesses = [
    { name: "Logout", path: "logout", icon: "/logout-icon.png" },
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
