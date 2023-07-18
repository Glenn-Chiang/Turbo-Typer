import {
  faBoltLightning,
  faKeyboard,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "./Settings";
import { useState } from "react";
import { getWords } from "../../mechanics/getWords.js";
import Timer from "./Timer.js";
import GameWindow from "./GameWindow.js";
import Result from "./Result.js";
import { modes, timeLimits } from "../../constants/parameters.js";

export default function Home() {
  type GameState = "pre-game" | "in-game" | "post-game";
  const [gameState, setGameState] = useState<GameState>("pre-game");

  const [mode, setMode] = useState(Object.keys(modes)[0]);
  const [timeLimit, setTimeLimit] = useState(timeLimits[0]);

  const startGame = () => {
    setGameState("in-game");
  };

  const endGame = () => {
    setGameState("post-game");
  };

  const resetGame = () => {
    setWords(getWords(mode, chunkSize));
    setStartIndex(0);
    setCharGrades([]);
    setGameState("pre-game");
  };

  // When user selects different mode, load new set of words
  const updateMode = (mode: string) => {
    setMode(mode);
    setWords(getWords(mode, chunkSize));
  };

  const updateTimeLimit = (time: string) => {
    setTimeLimit(Number(time));
  };

  // Load new set of words when user finishes typing current set of words
  const loadWords = () => {
    setWords([...words, ...getWords(mode, chunkSize)]);
    setStartIndex(startIndex + chunkSize);
  };
  
  const chunkSize = 100;
  const [words, setWords] = useState(getWords(mode, chunkSize));
  const [startIndex, setStartIndex] = useState(0);
  const [charGrades, setCharGrades] = useState<number[]>([]);
  
  if (charGrades.length >= words.join(" ").length / 2) {
    loadWords();
  }
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white text-6xl p-12 flex gap-4 items-center">
        <FontAwesomeIcon icon={faBoltLightning} />
        TURBOTYPER
        <FontAwesomeIcon icon={faKeyboard} />
      </h1>
      <Settings
        enabled={gameState === "pre-game"}
        updateMode={updateMode}
        updateTimeLimit={updateTimeLimit}
      />
      <Timer
        gameActive={gameState === "in-game"}
        endGame={endGame}
        timeLimit={Number(timeLimit)}
      />

      <div className="h-20">
        {gameState === "pre-game" ? (
          <p className="p-4">Start typing to begin</p>
        ) : (
          <RestartButton onClick={resetGame} />
        )}
      </div>

      {gameState === "post-game" ? (
        <Result charGrades={charGrades} timeLimit={Number(timeLimit)} />
      ) : (
        <GameWindow
          gameActive={gameState === "in-game"}
          startGame={startGame}
          mode={mode}
          words={words}
          charGrades={charGrades}
          setCharGrades={setCharGrades}
        />
      )}
    </div>
  );
}

type RestartButtonProps = {
  onClick: () => void;
};

function RestartButton({ onClick }: RestartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 w-12 text-white p-2 text-2xl rounded-xl hover:bg-red-400 transition"
    >
      <FontAwesomeIcon icon={faRefresh} />
    </button>
  );
}
