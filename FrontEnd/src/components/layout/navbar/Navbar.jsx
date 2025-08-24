import "./Nav.css";
import { useSelector } from "react-redux";
import { selectActiveMenu } from "../../../redux/slices/helperSlice";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProfileDropDown from "./ProfileDropDown";
import EditProfileModal from "../../../pages/auth/EditProfileModal";

function Navbar() {
  const [toggleIcon, setToggleIcon] = useState(false);

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

  return (
    <>
    <div className="navBar" >
      <div className="activeNav">
        <h2>{displayName}</h2>
      </div>
      <div className="profileNav" >
        <img src="/email-icon.png" alt="email" />
        <img src="/bell-icon.png" alt="bell" />

        <div
          className="userProfileNav" 
          onClick={() => setToggleIcon(!toggleIcon)}
        >
          <div className="proImg">
            <img src="/profile-icon.png" alt="" />
          </div>

          <div className="arrowImg" >
            <img
              src="/downIcon.png"
              alt=""
              className={`${toggleIcon ? "imgs" : ""}`}
            />
          </div>
         
        </div>
         
      </div>
      
    </div>
    {toggleIcon && <ProfileDropDown cls="profileDropdown" />}
    </>
  );
}

export default Navbar;
