import {
  IconDefinition,
  faGear,
  faLineChart,
  faPlayCircle,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems: [string, ReactNode][] = [
    ["play", <FontAwesomeIcon icon={faPlayCircle} />],
    ["stats", <FontAwesomeIcon icon={faLineChart} />],
    ["settings", <FontAwesomeIcon icon={faGear} />],
    ["login", <FontAwesomeIcon icon={faSignIn} />],
  ];
  const navlinks = navItems.map(([title, icon]: [string, ReactNode], index) => {
    return (
      <NavLink
        key={index}
        to={`/${title}`}
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
  });
  return (
    <nav className="fixed left-0 text-white flex flex-col justify-between p-10 h-full text-lg ">
      <div className="flex flex-col gap-4">{navlinks}</div>
    </nav>
  );
}
