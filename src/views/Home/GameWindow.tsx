import React, { useEffect, useState } from "react";
import { getFirstLines, getLine } from "../../mechanics/getLine";

type props = {
  gameActive: boolean;
  startGame: () => void;
  sampleLines: string[];
  words: string[];
  wordsPerPage: number;
  startIndex: number;
  charGrades: number[];
  setCharGrades: React.Dispatch<React.SetStateAction<number[]>>;
  loadWords: () => void;
};

export default function GameWindow({
  gameActive,
  startGame,
  words,
  charGrades,
  setCharGrades,
  loadWords,
}: props) {
  const maxCharsPerLine = 20;
  const linesPerPage = 3;

  const [linesHistory, setLinesHistory] = useState<string[]>(
    getFirstLines(linesPerPage, words, maxCharsPerLine)
  );
  const [startLineIndex, setStartLineIndex] = useState(0);
  const currentLines = linesHistory.slice(startLineIndex, startLineIndex + linesPerPage);
  const charsHistory = linesHistory.join(""); // All chars rendered so far
  const numWords = charsHistory.split(" ").length;
  const currentChars = currentLines.join(""); // Chars currently rendered
  const currentCharIndex = charGrades.length;
  const currentChar = charsHistory[currentCharIndex];
  const firstCharIndex = charsHistory.length - currentChars.length; // Index of first char currently displayed

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Ignore keys that are neither a character nor backspace
      if (event.key.length !== 1 && event.key !== "Backspace") {
        return;
      }

      // Start game once user starts typing
      if (!gameActive) {
        startGame();
      }

      // Backspace
      if (event.key === "Backspace") {
        // Ignore backspace if already at first character
        if (currentCharIndex === 0 || currentCharIndex === firstCharIndex) {
          return;
        }
        setCharGrades(charGrades.slice(0, charGrades.length - 1));

        // Correct
      } else if (event.key === currentChar) {
        setCharGrades([...charGrades, 1]);

        // Incorrect
      } else {
        setCharGrades([...charGrades, 0]);
      }

      // Load new line of words when user types last character of first line
      if (currentCharIndex === firstCharIndex + currentLines[0].length - 1) {
        const nextLine = getLine(words, numWords, maxCharsPerLine);
        setLinesHistory([...linesHistory, nextLine]);
        setStartLineIndex(startLineIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [gameActive, currentCharIndex, currentChar, charGrades]);

  return (
    <div className="w-4/6 bg-sky-800 text-xl p-4 rounded-xl">
      {currentLines.map((line, lineIndex) => {
        const numPrevChars = currentLines.reduce(
          (count, line, idx) => (idx < lineIndex ? count + line.length : count),
          0
        );
        const charsInLine = line.split("");
        return (
          <p key={lineIndex}>
            {charsInLine.map((char, index) => {
              const charIndex = firstCharIndex + index + numPrevChars;
              return (
                <span
                  key={index}
                  className={
                    charGrades[charIndex] === 1
                      ? "text-white underline"
                      : charGrades[charIndex] === 0
                      ? "text-red-500 underline"
                      : "text-sky-400"
                  }
                >
                  {char}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
