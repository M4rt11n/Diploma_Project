import React from "react";
import Pic from "../Elements/Pic";

function SongTitle(props) {
  const { Pic, title, id, text, Key, author, bpm, originalKey } = props;

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
              <a id="c">C / Am</a>
              <a id="c#">C# / A#m</a>
              <a id="d">D / Hm</a>
              <a id="d#">D# / Cm</a>
              <a id="e">E / C#m</a>
              <a id="f">F / Dm</a>
              <a id="f#">F# / D#m</a>
              <a id="g">G / Em</a>
              <a id="g#">G# / Fm</a>
              <a id="a">A / F#m</a>
              <a id="b">B / Gm</a>
              <a id="h">H / G#m</a>
            </div>
          </div>
        }
      </div>
      <div className="more-info">
        <div>{bpm}</div>
        <div>{originalKey}</div>
        <div>{author}</div>
      </div>
    </div>
  );
}

export default SongTitle;
