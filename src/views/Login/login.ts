import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { redirect } from "react-router-dom";

export default async function login({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful");
    return redirect("/play");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Login error: ", error);
      return error.message;  
    }
  }
}
