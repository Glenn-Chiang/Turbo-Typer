type props = {
  children: string;
  onClick?: () => void;
};

export default function SubmitButton({ children, onClick }: props) {
  return (
    <button
      className="bg-rose-500 hover:bg-rose-400 transition p-2 rounded-xl capitalize"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
