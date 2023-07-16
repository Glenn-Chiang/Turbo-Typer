import React, { useState, useEffect } from "react";

type props = {
  gameActive: boolean;
  startGame: () => void;
  chars: string[];
  charIndex: number;
  setCharIndex: React.Dispatch<React.SetStateAction<number>>
  evaluatedChars: number[];
  setEvaluatedChars: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function GameWindow({
  gameActive,
  startGame,
  chars,
  charIndex,
  setCharIndex,
  evaluatedChars,
  setEvaluatedChars,
}: props) {
  
  const currentChar = chars[charIndex];

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.length !== 1 && event.key !== "Backspace") {
        return;
      }

      if (!gameActive) {
        startGame();
      }

      // Backspace
      if (event.key === "Backspace") {
        setEvaluatedChars((prev) => {
          const next = [...prev];
          next[charIndex - 1] = 0;
          return next;
        });
        setCharIndex(charIndex - 1);

        // Correct
      } else if (event.key === currentChar) {
        setEvaluatedChars((prev) => {
          const next = [...prev];
          next[charIndex] = 1;
          return next;
        });
        setCharIndex(charIndex + 1);

        // Incorrect
      } else {
        setEvaluatedChars((prev) => {
          const next = [...prev];
          next[charIndex] = -1;
          return next;
        });
        setCharIndex(charIndex + 1);
      }

      console.log(charIndex);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [gameActive, charIndex, currentChar, evaluatedChars]);

  const charSpans = chars.map((char, index) => {
    return (
      <span
        key={index}
        className={
          evaluatedChars[index] === 1
            ? "text-white underline"
            : evaluatedChars[index] === -1
            ? "text-red-500 underline"
            : "text-sky-400"
        }
      >
        {char}
      </span>
    );
  });

  return (
    <div className="w-4/6 bg-sky-800 text-xl p-4 rounded-xl">{charSpans}</div>
  );
}
