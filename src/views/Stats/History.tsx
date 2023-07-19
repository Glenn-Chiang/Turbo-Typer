import {
  faHistory,
  faCalendar,
  faBarsProgress,
  faClock,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { score } from "./Stats";
import React, { useState } from "react";
import { modes, timeLimits } from "../../constants/parameters";

export default function History({ scores }: { scores: score[] | [] }) {
  const [selectedModes, setSelectedModes] = useState(Object.keys(modes));
  const [selectedTimes, setSelectedTimes] = useState(timeLimits);

  const filteredScores = scores.filter(
    (score) =>
      selectedModes.includes(score.mode) &&
      selectedTimes.includes(score.timeLimit)
  );

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedMode = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setSelectedModes([...selectedModes, changedMode]);
    } else {
      setSelectedModes([
        ...selectedModes.filter((mode) => mode !== changedMode),
      ]);
    }
    setStartIndex(0);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedTime = Number(event.target.value);
    const checked = event.target.checked;
    if (checked) {
      setSelectedTimes([...selectedTimes, changedTime]);
    } else {
      setSelectedTimes([
        ...selectedTimes.filter((time) => time !== changedTime),
      ]);
    }
    setStartIndex(0);
  };

  const modeCheckboxes = Object.keys(modes).map((mode: string) => {
    return (
      <div className="flex gap-4">
        <input
          type="checkbox"
          id={mode}
          value={mode}
          checked={selectedModes.includes(mode)}
          onChange={handleModeChange}
        />
        <label htmlFor={mode}>{mode}</label>
      </div>
    );
  });

  const timeCheckBoxes = timeLimits.map((time: number) => {
    return (
      <div className="flex gap-4">
        <input
          type="checkbox"
          id={time.toString()}
          value={time}
          checked={selectedTimes.includes(time)}
          onChange={handleTimeChange}
        />
        <label htmlFor={time.toString()}>{time}</label>
      </div>
    );
  });

  const sortedScores = [...filteredScores].sort(
    (a, b) => b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
  ); // Sort most recent to least recent
  const [startIndex, setStartIndex] = useState(0);
  const scoresPerPage = 10;
  const numPages = sortedScores.length > 0 ? Math.ceil(sortedScores.length / scoresPerPage) : 1;
  const currentPage = startIndex / scoresPerPage + 1;
  const currentScores = sortedScores.slice(
    startIndex,
    startIndex + scoresPerPage
  );
  const scoreElems = currentScores.map((score: score, index: number) => {
    return (
      <tr
        key={index}
        className={
          "p-4 capitalize " +
          (score.mode === "standard"
            ? "text-cyan-400"
            : score.mode === "advanced"
            ? "text-sky-400"
            : "text-teal-400")
        }
      >
        <td>{score.wpm} WPM</td>
        <td className="p-4">
          <FontAwesomeIcon icon={faBarsProgress} /> {score.mode}
        </td>
        <td className="p-4">
          <FontAwesomeIcon icon={faClock} /> {score.timeLimit}
        </td>
        <td className="p-4">
          <FontAwesomeIcon icon={faCalendar} />{" "}
          {score.timestamp.toDate().toLocaleDateString()}
        </td>
      </tr>
    );
  });

  const handlePrev = () => {
    if (startIndex === 0) {
      return;
    }
    setStartIndex(startIndex - scoresPerPage);
  };

  const handleNext = () => {
    if (startIndex + scoresPerPage >= sortedScores.length) {
      return;
    }
    setStartIndex(startIndex + scoresPerPage);
  };

  return (
    <div className="p-8">
      <h2 className="p-4 text-2xl flex items-center gap-4 justify-center">
        <FontAwesomeIcon icon={faHistory} />
        History
      </h2>
      <div className="p-4 flex justify-between">
        <div>
          <p className="flex items-center gap-2 p-2">
            <FontAwesomeIcon icon={faBarsProgress} />
            Mode
          </p>
          {modeCheckboxes}
        </div>
        <div>
          <p className="flex items-center gap-2 p-2">
            <FontAwesomeIcon icon={faClock} />
            Time limit
          </p>
          {timeCheckBoxes}
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          className="w-10 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-500"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className="w-10 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-500"
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <p className="p-4">
        Page {currentPage} of {numPages}
      </p>
      <table className="w-96">
        <tbody>{scoreElems.length > 0 ? scoreElems : <td>-</td>}</tbody>
      </table>
    </div>
  );
}
