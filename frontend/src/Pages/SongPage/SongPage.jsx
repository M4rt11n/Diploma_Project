import React from "react";
import { useState, useEffect } from "react";
import "../../Styles/SongPage.scss";
import "../../Styles/Key.scss";
import SongTitle from "../../Components/SongTitle";
import Text from "../../Elements/Text";
import "../../Styles/Loading.scss";
import {
  shiftChord,
  symbolIndex,
  transformChordToNumber,
} from "../../Utility/key-helpers";

function SongPage() {
  const [song, setSong] = useState(null);
  const [shiftKey, setShiftKey] = useState(0);
  const [useNumbers, setUseNumbers] = useState(false);

  let songKey = song?.songKey?.split(" /")[0];
  let songKeyIndex = song?.songKey && symbolIndex(songKey);

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

  const getChordSymbol = (inputChordSymbol) => {
    if (!inputChordSymbol) return;
    if (!useNumbers) return shiftChord(inputChordSymbol, shiftKey);

    return transformChordToNumber(inputChordSymbol, songKey);
  };

  const chordStyles = (offset = 0) => ({
    "--chord-offset": `${offset}px`,
  });

  const changeKey = (id) => {
    const NUMBERS_ID = "numbers";

    if (id === NUMBERS_ID) return setUseNumbers(true);

    setUseNumbers(false);

    const clickedItemIndex = symbolIndex(id);

    setShiftKey(clickedItemIndex - songKeyIndex);
  };

  const getSongKey = (songKey, shiftKey) =>
    songKey
      .split(" / ")
      .map((key) => shiftChord(key, shiftKey))
      .join(" / ");

  return (
    <>
      {song ? (
        <>
          <SongTitle
            className="song-title"
            title={song.songTitle.title}
            text={"-"}
            Key={getSongKey(song.songKey, shiftKey)}
            bpm={song.songBPM}
            originalKey={song.songOriginalKey}
            author={song.songAuthor}
            translator={"Превод: " + song.songTranslator}
            onClick={(id) => changeKey(id)}
          />

          <div className="sheet-content">
            {song.songData.map((block, i) => (
              <div key={i}>
                {block.map((row, k) => (
                  <Text key={k}>
                    {row.map((chunk, j) => (
                      <span
                        key={j}
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
          <label>Redirecting...</label>
          <div className="loading"></div>
        </div>
      )}
    </>
  );
}

export default SongPage;
