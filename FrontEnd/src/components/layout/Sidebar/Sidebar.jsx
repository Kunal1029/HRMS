// import { useState } from "react";
import BottomBar from "./BottomBar";
import TopSideBar from "./TopSideBar";
import "./sidebar.css";
import Logo from "../../logo/Logo";

function Sidebar() {
  // const [openBar, setOpenBar] = useState(false);

  return (
    <div className="">
      <div className="side-bar responsiveBar">
        <TopSideBar />
        <BottomBar />
      </div>

      {/* <div className="">
        {!openBar && (
          <div className="respMob">
            <div className="responsiveMobBar">
              <Logo classLogo={"sidelogo"} logo="LOGO" />
            </div>

            <div className="toggleBar" onClick={() => setOpenBar(!openBar)}>
              <div className="toggleLine"></div>
              <div className="toggleLine"></div>
              <div className="toggleLine"></div>
            </div>
          </div>
        )}

        {openBar && (
          <div className="ssks">
            <div className="responsiveMobBar side-bar">
              <TopSideBar />
              <BottomBar />
            </div>
            <span onClick={() => setOpenBar(false)}>X</span>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Sidebar;
