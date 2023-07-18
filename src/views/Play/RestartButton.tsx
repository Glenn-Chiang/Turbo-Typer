import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type props = {
  onClick: () => void;
};

export default function RestartButton({ onClick }: props) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 w-12 text-white p-2 text-2xl rounded-xl hover:bg-red-400 transition"
    >
      <FontAwesomeIcon icon={faRefresh} />
    </button>
  );
}