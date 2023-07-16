import { wordList } from "../constants/wordsList";

const modes: {
    [key: string]: number
  } = {
    standard: 100,
    advanced: 500,
    expert: 1000
  }

const getWord = (words: string[]) => {
    const index =  Math.floor(Math.random() * words.length);
    return words[index];
}

export const getWords = (mode: string, numWords: number): string[] => {
    const words = wordList[modes[mode]];
    const randomWords = [];
    
    for (let i=0; i < numWords; i++) {
        randomWords.push(getWord(words));
    }

    return randomWords;
}