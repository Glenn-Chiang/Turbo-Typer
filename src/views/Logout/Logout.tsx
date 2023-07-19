import AccountButton from "../../components/AccountButton";
import { Form } from "react-router-dom";

export default function Logout() {
    return (
    <div className="flex flex-col items-center gap-4">
      <p>See you soon!</p>
      <Form method="post">
        <AccountButton>Logout</AccountButton>
      </Form>
    </div>
  );
}
