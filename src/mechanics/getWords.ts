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

const wordsPerPage = 100;

export const getWords = (mode: string): string[] => {
    const words = wordList[modes[mode]];
    const randomWords = [];
    
    for (let i=0; i < wordsPerPage; i++) {
        randomWords.push(getWord(words));
    }

    return randomWords;
}