import React from "react";
import { useState, useEffect } from "react";
import "../../Styles/SongPage.scss";
import "../../Styles/Key.scss";
import SongTitle from "../../Components/SongTitle";
import Text from "../../Elements/Text";

function SongPage() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const id = window.location.href.split("/").pop();

      const response = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/songs/${id}`
      );
      const songJson = await response.json();

      const songRemap = {
        ...songJson,
        id: songJson._id,
        songTitle: songJson.songTitle[0],
      };

      setSong(songRemap);
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
      {song ? (
        <>
          <SongTitle
            className="song-title"
            title={song.songTitle.title}
            text={"-"}
            Key={song.songKey}
            bpm={song.songBPM}
            originalKey={song.songOriginalKey}
            author={song.songAuthor}
            translator={"Превод: " + song.songTranslator}
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
              const songKeyIndex = symbolIndex(song.songKey);

              setShiftKey(clickedItemIndex - songKeyIndex + 2);
            }}
          />

          <div className="sheet-content">
            {song.songData.map((block, i) => (
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
      ) : (
        <div className="loader">
          <h3>Loading</h3>
        </div>
      )}
    </>
  );
}

export default SongPage;
