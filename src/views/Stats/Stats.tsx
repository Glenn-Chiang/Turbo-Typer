import { faLineChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useLoaderData } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import History from "./History";
import Overview from "./Overview";

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
