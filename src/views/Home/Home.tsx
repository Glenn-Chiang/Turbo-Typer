import {
  faBoltLightning,
  faKeyboard,
  faPlayCircle,
  faRefresh,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "./Settings";
import { useState } from "react";
import { getWords } from "../../mechanics/getWords.js";
import Timer from "./Timer.js";
import GameWindow from "./GameWindow.js";
import Result from "./Result.js";

export default function Home() {
  type GameState = "pre-game" | "in-game" | "post-game";
  const [gameState, setGameState] = useState<GameState>("pre-game");

  type Mode = "standard" | "advanced" | "expert";
  const [mode, setMode] = useState<Mode>("standard");

  type TimeLimit = "30" | "60" | "120";
  const [timeLimit, setTimeLimit] = useState<TimeLimit>("30");

  const startGame = () => {
    setGameState("in-game");
  };

  const endGame = () => {
    setGameState("post-game");
  };

  const resetGame = () => {
    setWords(getWords(mode));
    setCharIndex(0);
    setEvaluatedChars(chars.map(() => 0));
    setGameState("pre-game");
  };

  const [words, setWords] = useState(getWords(mode));
  const [charIndex, setCharIndex] = useState(0);
  const chars = words.join(" ").split("");
  const [evaluatedChars, setEvaluatedChars] = useState(chars.map(() => 0)); // 1: correct, -1: incorrect, 0: not evaluated

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white text-6xl p-12 flex gap-4 items-center">
        <FontAwesomeIcon icon={faBoltLightning} />
        TURBOTYPER
        <FontAwesomeIcon icon={faKeyboard} />
      </h1>
      <Settings
        enabled={gameState !== "in-game"}
        setMode={setMode}
        setTimeLimit={setTimeLimit}
      />
      <div className="flex justify-center p-4">
        {gameState !== "pre-game" ? <RestartButton onClick={resetGame}/> : null}
      </div>
      <Timer
        gameActive={gameState === "in-game"}
        endGame={endGame}
        timeLimit={Number(timeLimit)}
      />
      {gameState === "pre-game" && <p className="p-4">Start typing to begin</p>}
      {gameState === "post-game" ? (
        <Result evaluatedChars={evaluatedChars}/>
      ) : (
        <GameWindow
          gameActive={gameState === "in-game"}
          startGame={startGame}
          chars={chars}
          charIndex={charIndex}
          setCharIndex={setCharIndex}
          evaluatedChars={evaluatedChars}
          setEvaluatedChars={setEvaluatedChars}
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
