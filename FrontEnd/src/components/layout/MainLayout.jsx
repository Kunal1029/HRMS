import { useState } from "react";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [show, setShow] = useState(false);
  return (
    <div className="layout">
      <div className="">
        {/* <div onClick={show ? () => setShow(false) : ""}>
          <Navbar />
        </div> */}

        <Navbar />

        <div onClick={show ? () => setShow(false) : ()=>("")}>
          <Outlet />
        </div>
      </div>
      {/* <div className="mobSideBar">
        {show ? <div onClick={() => setShow(false)}>Close</div> : ""}
        {show ? <Sidebar /> : <div onClick={() => setShow(true)}>OPEN</div>}
      </div> */}
      <div className="webView">
        <Sidebar />
      </div>
    </div>
  );
}

export default MainLayout;
