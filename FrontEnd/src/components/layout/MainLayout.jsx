import UseSample from "../Table/UseSample";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

function MainLayout() {
  return (
    <div className="layout">
      <div className="">
        <Navbar />

        <UseSample />
      </div>
      <Sidebar />
    </div>
  );
}

export default MainLayout;
