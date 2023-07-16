type props = {
  charGrades: number[];
  timeLimit: number;
};

export default function Result({ charGrades, timeLimit }: props) {
  const totalChars = charGrades.length;
  const correctChars = charGrades.reduce((count, char) => char ? count + char : count, 0);
  const cpm = totalChars / (timeLimit / 60)
  const wpm = Math.round(cpm / 5);
  const accuracy = Math.round((correctChars / totalChars) * 100);
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
