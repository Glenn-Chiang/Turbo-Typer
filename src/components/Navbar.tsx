import {
  faGear,
  faLineChart,
  faPlayCircle,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed left-0 text-white flex flex-col justify-between p-10 h-full text-lg ">
      <div className="flex flex-col gap-4">
        <NavLink to={"/"} className={({ isActive }) => isActive ? 'bg-cyan-600 navlink' : "navlink"}>
          <FontAwesomeIcon icon={faPlayCircle} />
          Play
        </NavLink>
        <NavLink to={"/stats"} className={({ isActive }) => isActive ? 'bg-cyan-600 navlink' : "navlink"}>
          <FontAwesomeIcon icon={faLineChart} />
          Stats
        </NavLink>
        <NavLink to={"/settings"} className={({ isActive }) => isActive ? 'bg-cyan-600 navlink' : "navlink"}>
          <FontAwesomeIcon icon={faGear} />
          Settings
        </NavLink>
      </div>
      <NavLink to={"/login"} className={({ isActive }) => isActive ? 'bg-cyan-600 navlink' : "navlink"}>
        <FontAwesomeIcon icon={faSignIn} />
        Login
      </NavLink>
    </nav>
  );
}
