import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"

type props = {
  timeLimit: number;
  gameActive: boolean;
  endGame: () => void;
}

export default function Timer({timeLimit, gameActive, endGame}: props) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!gameActive) {
      setTimeLeft(timeLimit);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      endGame();
    }

    return () => clearInterval(timer);
  }, [gameActive, timeLimit, timeLeft, endGame]);

  return (
    <div className="flex items-center gap-3 p-4 text-2xl">
      <FontAwesomeIcon icon={faClock}/>
      {timeLeft}
    </div>
  )
}