import React from "react";
import { useState } from "react";
import "../Styles/SongPage.scss";
import "../Styles/Key.scss";
import Button from "../Elements/Button/Button";
import SongTitle from "../Components/SongTitle";
import Text from "../Elements/Text";

import pageData from "./data.json";
import chord from "./data.json";

function SongPage() {
  const [chord, setChord] = useState([
    { chord: "A" },
    { chord: "A/C#" },
    { chord: "D" },
    { chord: "E" },
    { chord: "E/G#" },
    { chord: "F#m" },
  ]);

  return (
    <>
      <SongTitle
        className="song-title"
        title={pageData.songTitle.title}
        text={"-"}
        Key={"A"}
        bpm={"126bpm   4/4"}
        originalKey={"Оригинална Тоналност: Ab"}
        author={"Goodness of God - Jenn Jonson, Bethel Music"}
      />

      <div className="sheet-content">
        {pageData.songData.map((block, i) => (
          <div key={i}>
            {block.map((row) => (
              <Text>
                {row.map((chunk) => (
                  <span data-chord={chunk.chord}>{chunk.text} </span>
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
