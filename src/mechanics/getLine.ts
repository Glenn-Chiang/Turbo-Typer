export const getLine = (
  wordSet: string[],
  firstWordIndex: number,
  maxCharsPerLine: number
) => {
  const currentWordSet = wordSet.slice(firstWordIndex);
  let charCount = 0;
  let charsInLine = "";
  for (const word of currentWordSet) {
    charCount += word.length + 1;
    if (charCount > maxCharsPerLine) {
      return charsInLine;
    }
    charsInLine += word + " ";
  }
  return charsInLine;
};

export const getFirstLines = (
  linesPerPage: number,
  allWords: string[],
  maxCharsPerLine: number
) => {
  const lines = [];
  for (let i = 0; i < linesPerPage; i++) {
    const nextLine = getLine(
      allWords,
      lines.join("").split(" ").length,
      maxCharsPerLine
    );
    lines.push(nextLine);
  }
  return lines;
};
