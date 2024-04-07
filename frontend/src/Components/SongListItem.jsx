import React from "react";
import "../Styles/SongListItem.scss";

import { Link } from "react-router-dom";

function SongListItem({ song }) {
  return (
    <Link to={`/song/${song.id}`} className="listed-song">
      <div className="list-part1">
        <div className="main-song-title">
          <h4>{song.songTitle.title}</h4>
          <h4>{song.songKey}</h4>
        </div>
        <div>
          <h5>Превод: {song.songTranslator}</h5>
        </div>
      </div>
      <div className="list-part2">
        <h5>{song.songBPM}</h5>
        <h5>{song.songAuthor}</h5>
      </div>
    </Link>
  );
}

export default SongListItem;
