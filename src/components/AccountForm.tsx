import { Form } from "react-router-dom";
import SubmitButton from "./AccountButton";

type props = {
  children: React.ReactNode[];
  action: string;
  fields: JSX.Element[][];
};

export default function AccountForm({
  children,
  action,
  fields,
}: props) {

  const fieldElems = fields.map((field, index) => {
    return (
      <div className="flex justify-between gap-4" key={index}>
        {field[0]}
        {field[1]}
      </div>
    );
  });

  return (
    <Form method="post"
      className="flex flex-col items-center gap-4"
    >
      {children[0]}
      <div className="flex flex-col gap-4 w-80">{fieldElems}</div>
      <SubmitButton>{action}</SubmitButton>
      {children[1]}
    </Form>
  );
}
