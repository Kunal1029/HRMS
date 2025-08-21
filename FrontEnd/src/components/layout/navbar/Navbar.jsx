import "./Nav.css";
import { useSelector } from "react-redux";
import { selectActiveMenu } from "../../../redux/slices/helperSlice";
import { useLocation } from "react-router-dom";

function Navbar() {
  const activeMenu = useSelector(selectActiveMenu);
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();
  const activeTab = currentPath !== "dashboard" ? currentPath : activeMenu.toLowerCase();
  const displayName = capitalize(activeTab);

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="navBar">
      <div className="activeNav">
        <h2>{displayName}</h2>
      </div>
      <div className="profile">
        <img src="/email-icon.png" alt="" />
        <img src="/bell-icon.png" alt="" />
      </div>
    </div>
  );
}

export default Navbar;
