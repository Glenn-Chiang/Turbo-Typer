import { useEffect, useContext } from 'react';
import saveScore from '../../crud/saveScore';
import { AuthContext } from '../../AuthContext';

type props = {
  charGrades: number[];
  mode: string;
  timeLimit: number;
};

export default function Result({ charGrades, mode, timeLimit }: props) {
  const totalChars = charGrades.length;
  const correctChars = charGrades.reduce((count, char) => char ? count + char : count, 0);
  const cpm = totalChars / (timeLimit / 60)
  const wpm = Math.round(cpm / 5);
  const accuracy = Math.round((correctChars / totalChars) * 100);

  const user = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (!user) {
        return;
      }
      const timestamp = new Date();
      try {
        await saveScore(user.uid, wpm, mode, timeLimit, timestamp);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

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
    </div>
  );
}
