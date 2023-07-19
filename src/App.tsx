import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { AuthContext } from "./AuthContext";

export default function App() {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }) 
  

  return (
    <AuthContext.Provider value={user}>
      <Navbar />
      <div className="text-center flex-col p-10 text-lg text-white">
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}
