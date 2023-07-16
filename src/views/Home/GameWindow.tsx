import React, { useState, useEffect } from "react";

type props = {
  gameActive: boolean;
  startGame: () => void;
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
  wordsPerPage,
  startIndex,
  charGrades,
  setCharGrades,
  loadWords
}: props) {
  
  const chars = words.join(' ').split(''); // Array of all characters including spaces
  const displayedWords = words.slice(startIndex, startIndex + wordsPerPage);
  const displayedChars = displayedWords.join(' ').split('')
  const charIndex = charGrades.length;
  const currentChar = chars[charIndex];

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
        if (charIndex === 0) {
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

      if (charIndex === chars.length - 1) {
        loadWords();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [gameActive, charIndex, currentChar, charGrades]);

  const charSpans = displayedChars.map((char, index) => {
    return (
      <span
        key={index}
        className={
          charGrades[index + chars.length - displayedChars.length] === 1
            ? "text-white underline"
            : charGrades[index + chars.length - displayedChars.length] === 0
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
