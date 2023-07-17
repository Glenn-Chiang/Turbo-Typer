type props = {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
};

export default function SettingButton({ children, onClick, selected }: props) {
  return (
    <button
      className={`w-24 capitalize rounded-xl p-2 ${
        selected ? "bg-cyan-400" : " bg-cyan-600 hover:bg-cyan-500 "
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
