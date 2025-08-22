import "./Nav.css";
import { useSelector } from "react-redux";
import { selectActiveMenu } from "../../../redux/slices/helperSlice";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import EditProfileModal from "../../../pages/auth/EditProfileModal";

function Navbar() {
  const [toggleIcon, setToggleIcon] = useState(false);
  const dropdownRef = useRef(null);

  const activeMenu = useSelector(selectActiveMenu);
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();
  const activeTab =
    currentPath !== "dashboard" ? currentPath : activeMenu.toLowerCase();
  const displayName = capitalize(activeTab);

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleIcon(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navBar">
      <div className="activeNav">
        <h2>{displayName}</h2>
      </div>

      <div className="profileNav">
        <img src="/email-icon.png" alt="email" />
        <img src="/bell-icon.png" alt="bell" />

        <div
          className="userProfileNav"
          ref={dropdownRef}
          onClick={() => setToggleIcon(!toggleIcon)}
        >
          <div className="proImg">
            <img src="/profile-icon.png" alt="" />
          </div>

          <div className="arrowImg">
            <img
              src="/downIcon.png"
              alt=""
              className={`${toggleIcon ? "imgs" : ""}`}
            />
          </div>
        </div>

        {toggleIcon && (
          <ul className="profileDropdown">
            <li>
              <EditProfileModal text="Edit Profile" />
            </li>
            <li>Change Password</li>
            <li>Manage Notification</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
