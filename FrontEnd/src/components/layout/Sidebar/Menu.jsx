import { useDispatch } from "react-redux";
import { setActiveMenu, resetActiveMenu } from "../../../redux/slices/helperSlice";
import { clearAuthState, logout } from "../../../redux/slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Menu({ department, processes }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/").pop();
  const activeTab = currentPath !== "dashboard" ? currentPath : null;

  const handleClick = (x) => {
    dispatch(setActiveMenu(x.name));

    if (x.path === "logout") {
      dispatch(logout());
      dispatch(clearAuthState());
      dispatch(resetActiveMenu());
      navigate("/auth/login", { replace: true });
    }
  };

  return (
    <div className="middleBar">
      <p className="department">{department}</p>

      {processes.map((x, i) =>
        x.path === "logout" ? (
          <div
            key={i}
            className="workOn"
            onClick={() => handleClick(x)}
            style={{ cursor: "pointer" }}
          >
            <img src={x.icon} alt={x.name} />
            <p>{x.name}</p>
          </div>
        ) : (
          <Link key={i} to={`/dashboard/${x.path.toLowerCase()}`}>
            <div
              className={`workOn ${
                (activeTab === x.path.toLowerCase() || (!activeTab && x.name === "Candidates"))
                  ? "activeTabStyle"
                  : ""
              }`}
              onClick={() => handleClick(x)}
            >
              {(activeTab === x.path.toLowerCase() || (!activeTab && x.name === "Candidates")) && (
                <div className="activeBar"></div>
              )}
              <img src={x.icon} alt={x.name} />
              <p>{x.name}</p>
            </div>
          </Link>
        )
      )}
    </div>
  );
}

export default Menu;
