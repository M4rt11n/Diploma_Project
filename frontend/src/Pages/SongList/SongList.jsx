import React, { useEffect, useState } from "react";
import SongListItem from "../../Components/SongListItem";

function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("http://localhost:4000/api/songs");
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
        songs.map((song) => <SongListItem song={song} key={song.id} />)
      ) : (
        <div>
          <h3>Loading</h3>
        </div>
      )}
    </>
  );
}

export default SongList;
