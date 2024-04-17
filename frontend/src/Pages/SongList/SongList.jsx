import React from "react";
import SongListItem from "../../Components/SongListItem";
import "../../Styles/Loading.scss";

function SongList({ songs }) {
  const SongsListing = () => (
    <div className="songs">
      {songs.map((song) => (
        <SongListItem song={song} key={song.id} />
      ))}
    </div>
  );

  return (
    <>
      {songs && songs.length > 0 && <SongsListing />}
      {songs && songs.length === 0 && <NoResultsComponent />}
      {!songs && <LoadingComponent />}
    </>
  );
}

const LoadingComponent = () => (
  <div className="loader">
    <label>Loading...</label>
    <div className="loading"></div>
  </div>
);

const NoResultsComponent = () => (
  <div className="loader">
    <p>Няма резултат</p>
  </div>
);

export default SongList;
