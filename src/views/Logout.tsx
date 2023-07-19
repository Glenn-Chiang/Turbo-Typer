import { signOut } from "firebase/auth";
import AccountButton from "../components/AccountButton";
import { auth } from "../firebase";

export default function Logout() {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p>See you soon!</p>
      <AccountButton onClick={logout}>Logout</AccountButton>
    </div>
  );
}
