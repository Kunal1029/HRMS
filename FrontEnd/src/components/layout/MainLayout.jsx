import Candidate from "../../pages/candidates/Candidate";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

function MainLayout() {
  return (
    <div className="layout">
      <div className="">
        <Navbar />

        {/* <Candidate /> */}
      </div>
      <Sidebar />
    </div>
  );
}

export default MainLayout;
