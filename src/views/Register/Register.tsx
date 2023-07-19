import AccountForm from "../../components/AccountForm";
import LinkButton from "../../components/LinkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Navigate, redirect } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const fields = [
    [
      <label htmlFor="username">Username</label>,
      <input
        required
        id="username"
        type="text"
        name="username"
        className="rounded-lg text-black p-1"
      />,
    ],
    [
      <label htmlFor="email">Email</label>,
      <input
        required
        id="email"
        type="email"
        name="email"
        className="rounded-lg text-black p-1"
      />,
    ],

    [
      <label htmlFor="password">Password</label>,
      <input
        required
        id="password"
        type="password"
        name="password"
        className="rounded-lg text-black p-1"
      />,
    ],
  ];

  return (
    <AccountForm action="register" fields={fields} handleSubmit={register}>
      <h1>
        <FontAwesomeIcon icon={faPenSquare} />
        Register
      </h1>
      <p>
        Already have an account? <LinkButton destination="login" />
      </p>
    </AccountForm>
  );
}

async function register(username: string, email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setUpUser(username, userCredential.user.uid);
    console.log("Registration successful");
    return <Navigate to={"/login"} />;
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
