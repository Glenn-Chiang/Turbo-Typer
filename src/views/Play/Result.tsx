import { useContext } from "react";
import saveScore from "../../crud/saveScore";
import { AuthContext } from "../../AuthContext";
import SubmitButton from "../../components/AccountButton";

type props = {
  charGrades: number[];
  mode: string;
  timeLimit: number;
  playAgain: () => void;
};

export default function Result({
  charGrades,
  mode,
  timeLimit,
  playAgain,
}: props) {
  const totalChars = charGrades.length;
  const correctChars = charGrades.reduce(
    (count, char) => (char ? count + char : count),
    0
  );
  const cpm = totalChars / (timeLimit / 60);
  const wpm = Math.round(cpm / 5);
  const accuracy = Math.round((correctChars / totalChars) * 100);

  const user = useContext(AuthContext);

  const handleSave = async () => {
    if (!user) {
      return;
    }
    const timestamp = new Date();
    try {
      await saveScore(user.uid, wpm, mode, timeLimit, timestamp);
      console.log("Score saved");
    } catch (error) {
      console.log("Error saving score: ", error);
    }
    playAgain();
  };

  return (
    <div className="bg-sky-800 rounded-xl p-8 flex flex-col gap-3">
      <p className="text-4xl">
        <span className="">{wpm}</span> WPM
      </p>
      <p>
        <span>{cpm}</span> CPM
      </p>
      <p>
        <span>{accuracy}%</span> Accuracy
      </p>
      <div className="flex gap-4 justify-center">
        {user && <SubmitButton onClick={handleSave}>Save score</SubmitButton>}
        <button
          onClick={playAgain}
          className="bg-cyan-600 hover:bg-cyan-500 transition p-2 rounded-xl capitalize"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
