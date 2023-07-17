import { Form } from "react-router-dom"

type props = {
  children: React.ReactNode[];
  action: string;
}

export default function AccountForm({children, action}: props) {
  return (
    <Form className="flex flex-col items-center gap-4">
      {children[0]}
      <div className="flex flex-col gap-4 w-80">
        <div className="flex justify-between gap-4">
          <label htmlFor="email">Email</label>
          <input required id="email" type="email" name="email" className="rounded-lg text-black p-1"/>
        </div>
        <div className="flex justify-between gap-4">
          <label htmlFor="password">Password</label>
          <input required id="password" type="password" name="password" className="rounded-lg text-black p-1"/>
        </div>
      </div>
      <button className="bg-rose-500 hover:bg-rose-400 transition p-2 rounded-xl capitalize">
        {action}
      </button>
      {children[1]}
    </Form>
  )
}