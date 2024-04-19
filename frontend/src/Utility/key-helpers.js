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

export const transformChordToNumber = (inputChordSymbol, songKey) => {
  if (!inputChordSymbol) return "";

  return inputChordSymbol
    .split("/")
    .map((chord) => {
      const transformedKey =
        tabsMapping[songKey].indexOf(chord) + 1 ||
        tabsMapping[songKey].indexOf(chord + "m") + 1;

      const SPECIAL_SYMBOLS = ["m", "°"];

      const getSpecialSymbols = () => {
        let symbols = "";
        SPECIAL_SYMBOLS.forEach((sym) => {
          if (chord.includes(sym)) symbols += sym;
        });

        return symbols;
      };

      return `${transformedKey}${getSpecialSymbols()}`;
    })
    .join("/");
};

export const tabsMapping = {
  C: ["C", "Dm", "Em", "F", "G", "Am", "Hm"],
  "C#": ["C#", "D#m", "Fm", "F#", "G#", "Bm", "Cm"],
  D: ["D", "Em", "F#m", "G", "A", "Hm", "C#m"],
  "D#": ["D#", "Fm", "Gm", "G#", "A#", "Cm", "Dm"],
  E: ["E", "F#m", "G#m", "A", "H", "C#m", "D#m"],
  F: ["F", "Gm", "Am", "B", "C", "Dm", "Em"],
  "F#": ["F#", "G#m", "Bm", "H", "C#", "D#m", "Fm"],
  G: ["G", "Am", "Hm", "C", "D", "Em", "F#m"],
  "G#": ["G#", "A#m", "Cm", "C#", "D#", "Fm", "Gm"],
  A: ["A", "Hm", "C#m", "D", "E", "F#m", "G#m"],
  B: ["B", "Cm", "Dm", "E", "F", "Gm", "Am"],
  H: ["H", "C#m", "D#m", "F", "F#", "G#m", "Bm"],
};
