import { useState } from "react";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import MobBar from "./MobBar";

function MainLayout() {
  const [show, setShow] = useState(false);
  return (
    <div className="layout">
      <div className="">

        <div className="webView">
          <Navbar />
        </div>

        {/* <div className="mobViewShow">
          <MobBar />
        </div> */}

        <div onClick={show ? () => setShow(false) : () => ""}>
          <Outlet />
        </div>
      </div>

      

      <div className="webView">
        <Sidebar />
      </div>

    </div>
  );
}

export default MainLayout;
