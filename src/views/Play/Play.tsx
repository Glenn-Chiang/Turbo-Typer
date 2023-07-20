import { faBoltLightning, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "./Settings.js";
import { useEffect, useState } from "react";
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

  const updateMode = (mode: string) => {
    setMode(mode);
  };

  const updateTimeLimit = (time: string) => {
    setTimeLimit(Number(time));
  };

  const startGame = () => {
    setGameState("in-game");
  };

  const endGame = () => {
    setGameState("post-game");
  };

  const restartGame = () => {
    setGameState("pre-game");
    resetGame(mode);
  };

  const resetGame = (mode: string) => {
    const newWords = getWords(mode, wordsPerChunk);
    setWords(newWords);
    const initialLines = getFirstLines(linesPerPage, newWords, maxCharsPerLine);
    setLinesHistory(initialLines);
    setStartLineIndex(0);
    setCharGrades([]);
  };

  useEffect(() => {
    resetGame(mode);
  }, [mode]);

  const wordsPerChunk = 100;
  const maxCharsPerLine = 50;
  const linesPerPage = 3;

  const [words, setWords] = useState<string[]>([]);
  const [linesHistory, setLinesHistory] = useState<string[]>([]); // All lines rendered so far
  const [startLineIndex, setStartLineIndex] = useState(0); // Index of first line currently rendered
  const [charGrades, setCharGrades] = useState<number[]>([]);

  const charsHistory = linesHistory.join("");
  const numWords = charsHistory.split(" ").length;

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
    setWords([...words, ...getWords(mode, wordsPerChunk)]);
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
      {gameState !== "post-game" && (
        <Timer
          gameActive={gameState === "in-game"}
          endGame={endGame}
          timeLimit={Number(timeLimit)}
        />
      )}

      <div className="h-20">
        {gameState === "pre-game" ? (
          <p className="p-4">Start typing to begin</p>
        ) : gameState === "in-game" ? (
          <RestartButton onClick={restartGame} />
        ) : null}
      </div>

      {gameState === "post-game" ? (
        <Result
          charGrades={charGrades}
          mode={mode}
          timeLimit={Number(timeLimit)}
          playAgain={restartGame}
        />
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
