import React from "react";
import { useState, useEffect } from "react";
import "../../Styles/SongPage.scss";
import "../../Styles/Key.scss";
import SongTitle from "../../Components/SongTitle";
import Text from "../../Elements/Text";

import pageData from "./data.json";

function getElementByIndex(arr, index) {
  if (index >= 0 && index < arr.length) {
    return arr[index];
  } else {
    // Calculate the effective index by taking modulo with array length
    const effectiveIndex = ((index % arr.length) + arr.length) % arr.length;
    return arr[effectiveIndex];
  }
}

function SongPage() {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("https://localhost:4000/api/songs");
      const json = await response.json();

      if (response.ok) {
        setSongs(json);
      }
    };

    fetchSongs();
  }, []);

  const [shiftKey, setShiftKey] = useState(0);

  const getChordSymbol = (inputChordSymbol) => {
    if (!inputChordSymbol) return "";

    let resultSymbol = inputChordSymbol;

    const symbolArray = [
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

    const symbolIndex = (chord) => symbolArray.indexOf(chord);

    const parse = (n) => {
      const length = symbolArray.length;
      if (n >= 0) {
        return n % length;
      } else {
        // Calculate positive index equivalent to the negative index
        const positiveIndex = length + (n % length);
        return positiveIndex % length;
      }
    };

    resultSymbol = inputChordSymbol
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

    return resultSymbol;
  };

  const chordStyles = (offset = 0) => ({
    "--chord-offset": `${offset}px`,
  });

  return (
    <>
      <SongTitle
        className="song-title"
        title={pageData.songTitle.title}
        text={"-"}
        Key={pageData.songKey}
        bpm={pageData.songBPM}
        originalKey={pageData.songOriginalKey}
        author={pageData.songAuthor}
        translator={"Превод: " + pageData.songTranslator}
        onClick={(id) => {
          const symbolArray = [
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

          const symbolIndex = (chord) => symbolArray.indexOf(chord);

          const clickedItemIndex = symbolIndex(id);
          const songKeyIndex = symbolIndex(pageData.songKey);

          setShiftKey(clickedItemIndex - songKeyIndex + 2);
        }}
      />

      <div className="sheet-content">
        {pageData.songData.map((block, i) => (
          <div key={i}>
            {block.map((row) => (
              <Text>
                {row.map((chunk) => (
                  <span
                    data-chord={getChordSymbol(chunk.chord)}
                    style={chordStyles(chunk.offset)}
                  >
                    {chunk.text}{" "}
                  </span>
                ))}
              </Text>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default SongPage;
