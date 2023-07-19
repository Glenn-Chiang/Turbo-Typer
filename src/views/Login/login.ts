import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default async function login({ request }: { request: Request}) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    await signInWithEmailAndPassword(auth, email, password);
  }
}