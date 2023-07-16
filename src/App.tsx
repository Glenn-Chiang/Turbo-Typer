import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar/>
      <div className="text-center flex-col p-10 text-lg text-white">
        <Outlet/>      
      </div>
    </>
  )
}