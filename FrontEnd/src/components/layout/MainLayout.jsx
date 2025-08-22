import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="layout">
      <div className="">
        <Navbar />

        <div >
          <Outlet />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default MainLayout;
