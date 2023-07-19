import { signOut } from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth } from "../../firebase";

export default async function logout() {
  await signOut(auth);
  return redirect('/login');
}