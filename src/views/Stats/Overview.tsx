import { modes, timeLimits } from "../../constants/parameters";
import SettingButton from "./SettingButton";
import { useState } from "react";
import { score } from "./Stats";
import {
  faBarsProgress,
  faClock,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Overview({ scores }: { scores: score[] | [] }) {
  const [selectedMode, setSelectedMode] = useState(Object.keys(modes)[0]);
  const [selectedTime, setSelectedTime] = useState(timeLimits[0]);

  const modeButtons = Object.keys(modes).map((mode, index) => {
    return (
      <SettingButton
        key={index}
        onClick={() => setSelectedMode(mode)}
        selected={mode === selectedMode}
      >
        {mode}
      </SettingButton>
    );
  });

  const timeButtons = timeLimits.map((time, index) => {
    return (
      <SettingButton
        key={index}
        onClick={() => setSelectedTime(time)}
        selected={time === selectedTime}
      >
        {time}
      </SettingButton>
    );
  });

  const filteredScores = scores.filter(
    (score) => score.mode === selectedMode && score.timeLimit === selectedTime
  );
  const highScore = filteredScores.reduce(
    (currentHighest, score) =>
      score.wpm >= currentHighest ? score.wpm : currentHighest,
    0
  );
  const averageScore =
    filteredScores.length > 0
      ? Math.round(
          filteredScores.reduce(
            (currentSum, score) => currentSum + score.wpm,
            0
          ) / filteredScores.length
        )
      : 0;

  return (
    <div className="w-4/6 bg-sky-950 p-4 rounded-xl flex gap-4">
      <div>
        <FontAwesomeIcon icon={faBarsProgress} />
        Mode
        <div className="flex flex-col gap-3 items-center">{modeButtons}</div>
      </div>
      <div className="row-start-2">
        <FontAwesomeIcon icon={faClock} />
        Time limit
        <div className="flex flex-col gap-3 items-center">{timeButtons}</div>
      </div>
      <div className="row-span-2 flex flex-col justify-center w-1/2 flex-1">
        <span className="text-2xl flex justify-center items-center gap-4">
          <FontAwesomeIcon icon={faTrophy} />
          HIGH SCORE
        </span>
        <span className="text-4xl text-cyan-400">{highScore} WPM</span>
        <span>Average Score</span>
        <span className="text-2xl text-cyan-400">{averageScore} WPM</span>
      </div>
    </div>
  );
}
