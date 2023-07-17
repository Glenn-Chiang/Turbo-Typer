import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import AccountForm from "../../components/AccountForm";
import LinkButton from "../../components/LinkButton";

export default function Login() {
  return (
    <AccountForm action="login">
      <h1>
        <FontAwesomeIcon icon={faSignIn}/>
        Login
      </h1>
      <p>Don't have an account? <LinkButton destination="register"/></p>
    </AccountForm>
  )
}