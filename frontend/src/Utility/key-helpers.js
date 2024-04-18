export const symbolIndex = (chord) => symbolArray.indexOf(chord);

export const symbolArray = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "B",
  "H",
];

export const parse = (n) => {
  const length = symbolArray.length;
  if (n >= 0) {
    return n % length;
  } else {
    // Calculate positive index equivalent to the negative index
    const positiveIndex = length + (n % length);
    return positiveIndex % length;
  }
};

export const shiftChord = (inputChordSymbol, shiftKey) => {
  if (!inputChordSymbol) return "";

  return inputChordSymbol
    .split("/")
    .map((chord) => {
      if (!chord.includes("m"))
        return symbolArray[parse(symbolIndex(chord) + shiftKey)];
      else
        return (
          symbolArray[parse(symbolIndex(chord.replace("m", "")) + shiftKey)] +
          "m"
        );
    })
    .join("/");
};
