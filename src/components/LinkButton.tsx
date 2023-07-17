import { NavLink } from "react-router-dom";

type props = {
  destination: string;
}

export default function LinkButton({destination}: props) {
  return (
    <NavLink to={`/${destination}`} className="bg-cyan-600 hover:bg-cyan-500 transition p-2 rounded-xl capitalize">
      {destination}
    </NavLink>
  )
}