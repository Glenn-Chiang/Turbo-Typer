import {
  faGear,
  faLineChart,
  faPlayCircle,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const user = useContext(AuthContext);

  const navItems: [string, string, ReactNode][] = [
    ["play", "/play", <FontAwesomeIcon icon={faPlayCircle} />],
    ["stats", user ? `/stats/${user.uid}` : '/stats', <FontAwesomeIcon icon={faLineChart} />],
    ["settings", "/settings", <FontAwesomeIcon icon={faGear} />],
  ];

  const navlinks = navItems.map(
    ([title, url, icon]: [string, string, ReactNode], index) => {
      return (
        <NavLink
          key={index}
          to={url}
          className={({ isActive }) =>
            `${
              isActive ? "border-r-2" : ""
            } hover:text-sky-400 flex items-center gap-3 p-2 capitalize`
          }
        >
          {icon}
          {title}
        </NavLink>
      );
    }
  );

  return (
    <nav className="fixed left-0 text-white flex flex-col justify-between p-10 h-full text-lg ">
      <div className="flex flex-col gap-4">{navlinks}</div>
      <NavLink
        to={user ? "/logout" : "/login"}
        className={({ isActive }) =>
          `${
            isActive ? "border-r-2" : ""
          } hover:text-sky-400 flex items-center gap-3 p-2 capitalize`
        }
      >
        <FontAwesomeIcon icon={user ? faSignOut : faSignIn} />
        {user ? "Logout" : "Login"}
      </NavLink>
    </nav>
  );
}
