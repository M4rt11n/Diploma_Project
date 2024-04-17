import React from "react";
import Pic from "../Elements/Pic";

const keys = [
  {
    text: "C / Am",
    id: "C",
  },
  {
    text: "C# / A#m",
    id: "C#",
  },
  {
    text: "D / Hm",
    id: "D",
  },
  {
    text: "D# / Cm",
    id: "D#",
  },
  {
    text: "E / C#m",
    id: "E",
  },
  {
    text: "F / Dm",
    id: "F",
  },
  {
    text: "F# / D#m",
    id: "F#",
  },
  {
    text: "G / Em",
    id: "G",
  },
  {
    text: "G# / Fm",
    id: "G#",
  },
  {
    text: "A / F#m",
    id: "A",
  },
  {
    text: "B / Gm",
    id: "B",
  },
  {
    text: "H / G#m",
    id: "H",
  },
];

function SongTitle(props) {
  const {
    Pic,
    title,
    id,
    text,
    Key,
    author,
    bpm,
    originalKey,
    translator,
    onClick,
  } = props;

  const onItemClick = (id) => {
    onClick(id);
  };

  return (
    <div className="song-title">
      {Pic}
      <div className="main-info">
        {<strong>{title}</strong>}
        {text}
        {
          <div className="key-menu">
            <button className="Key">
              <strong>{Key}</strong>
            </button>
            <div className="dropdown-menu">
              {keys.map((key, i) => (
                <a id={key.id} key={i} onClick={() => onItemClick(key.id)}>
                  {key.text}
                </a>
              ))}
            </div>
          </div>
        }
      </div>
      <div className="more-info">
        <div>{bpm}</div>
        <div>{originalKey}</div>
        <div>{author}</div>
        <div>{translator}</div>
      </div>
    </div>
  );
}

export default SongTitle;
