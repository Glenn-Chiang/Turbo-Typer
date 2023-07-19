import {
  faBarsProgress,
  faClock,
  faLineChart,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { modes, timeLimits } from "../../constants/parameters";
import SettingButton from "./SettingButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { useLoaderData } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import History from "./History";

export type score = {
  mode: string;
  timeLimit: number;
  wpm: number;
  timestamp: Timestamp;
};

export default function Stats() {
  const user = useContext(AuthContext);

  const scores = useLoaderData() as score[] | [];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl flex gap-3 items-center p-4">
        <FontAwesomeIcon icon={faLineChart} />
        Stats
      </h1>
      {user ? (
        <>
          <Overview scores={scores} />
          <History scores={scores} />
        </>
      ) : (
        <p>Sign in to view your stats</p>
      )}
    </div>
  );
}

function Overview({ scores }: { scores: score[] | [] }) {
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

  const highScore = 102;
  const averageScore = 98;

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
        <span className="text-2xl">
          <FontAwesomeIcon icon={faTrophy} />
          HIGH SCORE
        </span>
        <span className="text-4xl text-cyan-400">{highScore}</span>
        <span>Average Score</span>
        <span className="text-2xl text-cyan-400">{averageScore}</span>
      </div>
    </div>
  );
}
