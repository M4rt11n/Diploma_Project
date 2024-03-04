import React from "react";
import SongListItem from "../../Components/SongListItem";

import pageData from "./data.json";

function SongList() {
  return (
    <>
      {pageData.map((song) => (
        <SongListItem song={song} key={song.id} />
      ))}
    </>
  );
}

export default SongList;
