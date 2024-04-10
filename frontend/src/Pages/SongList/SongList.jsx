import React, { useEffect, useState } from "react";
import SongListItem from "../../Components/SongListItem";
import "../../Styles/Loading.scss";
import NavBar from "../../Components/Navbar";

function SongList() {
  const [songs, setSongs] = useState([]);
  const [searchResult, setSearchResult] = useState([""]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/songs`
      );
      const songsJson = await response.json();

      const songsRemap = songsJson.map((song) => ({
        ...song,
        id: song._id,
        songTitle: song.songTitle[0],
      }));

      setSongs(songsRemap);
    };

    fetchSongs();
  }, []);

  return (
    <>
      {songs.length ? (
        songs
          /* .filter((song) => {
            return search.toLowerCase() === ""
              ? song
              : song.songTitle.toLowerCase().includes(search);
          }) */
          .map((song) => <SongListItem song={song} key={song.id} />)
      ) : (
        <div class="loader">
          <label>Redirecting...</label>
          <div class="loading"></div>
        </div>
      )}
    </>
  );
}

export default SongList;
