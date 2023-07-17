import { modes } from "../constants/parameters";
import { wordList } from "../constants/wordsList";

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