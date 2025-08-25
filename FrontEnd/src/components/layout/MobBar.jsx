import React, { Children, useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.css";

function MobBar() {
  const [openBar, setOpenBar] = useState(false);

  return (
    <div>
      <Navbar />
      {openBar && (
        <div>
          <Sidebar />
        </div>
      )}

      <div className="">
        {!openBar && (
          <div className="toggleBar" onClick={() => setOpenBar(!openBar)}>
            <div className="toggleLine"></div>
            <div className="toggleLine"></div>
            <div className="toggleLine"></div>
          </div>
        )}

        {openBar && <span onClick={() => setOpenBar(false)}>X</span>}
      </div>
    </div>
  );
}

export default MobBar;
