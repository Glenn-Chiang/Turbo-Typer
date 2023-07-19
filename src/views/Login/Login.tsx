import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountForm from "../../components/AccountForm";
import LinkButton from "../../components/LinkButton";
import { useActionData } from "react-router-dom";

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

  const error = useActionData() as string;

  return (
    <>
      <AccountForm action="login" fields={fields}>
        <h1>
          <FontAwesomeIcon icon={faSignIn} />
          Login
        </h1>
        <p>
          Don't have an account? <LinkButton destination="register" />
        </p>
      </AccountForm>
      {error && <p className="p-4 text-red-500">{error}</p>}
    </>
  );
}
