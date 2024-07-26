import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item logo">
        <Link to={"/"} className="navbar-link">
          Coaster Chronicle
        </Link>
      </li>
      <li className="navbar-item">
        <Link to={"/myRides"} className="navbar-link">
          My Rides
        </Link>
      </li>
      <li className="navbar-item">
        <Link to={"/discover"} className="navbar-link">
          Discover
        </Link>
      </li>
      <li className="navbar-item">
        <Link to={"/newRide"} className="navbar-link">
          New Ride
        </Link>
      </li>
      {localStorage.getItem("coaster_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("coaster_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
