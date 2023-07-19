import {
  faBoltLightning,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "./Settings.js";
import { useState } from "react";
import { getWords } from "../../mechanics/getWords.js";
import Timer from "./Timer.js";
import GameWindow from "./GameWindow.js";
import Result from "./Result.js";
import { modes, timeLimits } from "../../constants/parameters.js";
import { getFirstLines, getLine } from "../../mechanics/getLine.js";
import RestartButton from "./RestartButton.js";

export default function Play() {
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
    setStartLineIndex(0);
    setLinesHistory(initialLines);
    setCharGrades([]);
    setGameState("pre-game");
  };

  // When user selects different mode, load new set of words
  const updateMode = (mode: string) => {
    setMode(mode);
    setWords(getWords(mode, chunkSize));
    setLinesHistory(initialLines);
  };

  const updateTimeLimit = (time: string) => {
    setTimeLimit(Number(time));
  };

  const chunkSize = 100;
  const [words, setWords] = useState(getWords(mode, chunkSize));
  const [charGrades, setCharGrades] = useState<number[]>([]);

  const maxCharsPerLine = 50;
  const linesPerPage = 3;

  const initialLines = getFirstLines(linesPerPage, words, maxCharsPerLine);
  const [linesHistory, setLinesHistory] = useState<string[]>(initialLines); // All lines rendered so far
  const charsHistory = linesHistory.join("")
  const numWords = charsHistory.split(" ").length;
  
  const [startLineIndex, setStartLineIndex] = useState(0); // Index of first line currently rendered

  const currentLines = linesHistory.slice(
    startLineIndex,
    startLineIndex + linesPerPage
  ); // Lines currently rendered

  function loadNextLine() {
    const nextLine = getLine(words, numWords, maxCharsPerLine);
    setLinesHistory([...linesHistory, nextLine]);
    setStartLineIndex(startLineIndex + 1);
  }

  // Load next chunk of words
  if (charGrades.length >= words.join(" ").length / 2) {
    setWords([...words, ...getWords(mode, chunkSize)]);
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
          currentLines={currentLines}
          charsHistory={charsHistory}
          charGrades={charGrades}
          setCharGrades={setCharGrades}
          loadNextLine={loadNextLine}
        />
      )}
    </div>
  );
}