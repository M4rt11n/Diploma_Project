import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./Styles/App.scss";
import "./Styles/Button.scss";
import NavBar from "./Components/Navbar";
import "./Styles/NavBar.scss";
import "./Styles/Footer.scss";
import SongPage from "./Pages/SongPage/SongPage";
import "./Styles/SongPage.scss";
import SongList from "./Pages/SongList/SongList";
import songsAdapter from "./Utility/songs-adapter";

let songsCache = false;
const setSongsCache = (songs) => (songsCache = songs);

function App() {
  const [songs, setSongs] = useState();

  const loadSongsCache = () => setSongs(songsCache);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/songs`
      );
      const songsJson = await response.json();

      if (!songsJson?.length) return;

      const songsRemap = songsAdapter(songsJson);

      setSongsCache(songsRemap);

      setSongs(songsRemap);
    };

    if (!songsCache) fetchSongs();
  }, []);

  return (
    <>
      <Router>
        <header>
          <NavBar setSongs={setSongs} loadSongsCache={loadSongsCache} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SongList songs={songs} />} />
            <Route path="/song/:id" element={<SongPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
