import AccountForm from "../../components/AccountForm";
import LinkButton from "../../components/LinkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  return (
    <AccountForm action="register">
      <h1>
        <FontAwesomeIcon icon={faPenSquare}/>
        Register
      </h1> 
      <p>Already have an account? <LinkButton destination="login"/></p>
    </AccountForm>
  )
}