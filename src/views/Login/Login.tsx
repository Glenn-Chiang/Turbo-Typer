import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountForm from "../../components/AccountForm";
import LinkButton from "../../components/LinkButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

export default function Login() {
  const fields = [
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
    <AccountForm action="login" fields={fields}>
      <h1>
        <FontAwesomeIcon icon={faSignIn}/>
        Login
      </h1>
      <p>Don't have an account? <LinkButton destination="register"/></p>
    </AccountForm>
  )
}

