type props = {
  evaluatedChars: number[];
};

export default function Result({ evaluatedChars }: props) {
  const totalChars = evaluatedChars.reduce((count, char) => char === 1 ? count + char : count, 0);
  const cpm = totalChars
  const wpm = 100;
  const accuracy = 98;
  return (
    <div className="bg-sky-800 rounded-xl p-4 flex flex-col">
      <p>
        WPM <span>{wpm}</span>
      </p>
      <p>
        CPM <span>{cpm}</span>
      </p>
      <p>
        Accuracy <span>{accuracy}%</span>
      </p>
    </div>
  );
}
