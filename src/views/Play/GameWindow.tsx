import React, { useCallback, useEffect } from "react";

type props = {
  gameActive: boolean;
  startGame: () => void;
  currentLines: string[];
  charsHistory: string;
  charGrades: number[];
  setCharGrades: React.Dispatch<React.SetStateAction<number[]>>;
  loadNextLine: () => void;
};

export default function GameWindow({
  gameActive,
  startGame,
  currentLines,
  charsHistory,
  charGrades,
  setCharGrades,
  loadNextLine,
}: props) {
  const currentChars = currentLines.join(""); // Chars currently rendered
  const firstCharIndex = charsHistory.length - currentChars.length; // Index of first char currently displayed

  const currentCharIndex = charGrades.length; // Index of character that user is typing
  const currentChar = charsHistory[currentCharIndex]; // Character that user is typing

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
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
        setCharGrades((charGrades) =>
          charGrades.slice(0, charGrades.length - 1)
        );

        // Correct
      } else if (event.key === currentChar) {
        setCharGrades((charGrades) => [...charGrades, 1]);

        // Incorrect
      } else {
        setCharGrades((charGrades) => [...charGrades, 0]);
      }

      // Load new line of words when user types last character of first line
      if (currentCharIndex === firstCharIndex + currentLines[0].length - 1) {
        loadNextLine();
      }
    },
    [
      currentChar,
      currentCharIndex,
      currentLines,
      firstCharIndex,
      gameActive,
      loadNextLine,
      setCharGrades,
      startGame,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

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
