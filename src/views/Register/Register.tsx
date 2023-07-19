import AccountForm from "../../components/AccountForm";
import LinkButton from "../../components/LinkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

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
    <AccountForm action="register" fields={fields}>
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

