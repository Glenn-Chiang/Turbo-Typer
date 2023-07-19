import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { redirect } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default async function register({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setUpUser(username, userCredential.user.uid);
    console.log("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log("Registration error: ", error);
    throw error;
  }
}

async function setUpUser(username: string, userId: string) {
  const userDocRef = doc(db, "users", userId);
  const userData = { username, userId };
  await setDoc(userDocRef, userData);
}
