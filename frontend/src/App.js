import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./Styles/App.scss";
import "./Styles/Button.scss";
import NavBar from "./Components/Navbar";
import "./Styles/NavBar.scss";
import "./Styles/Footer.scss";
import SongPage from "./Pages/SongPage/SongPage";
import "./Styles/SongPage.scss";
import SongList from "./Pages/SongList/SongList";

function App() {
  return (
    <>
      <Router>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SongList />} />
            <Route path="/song/:id" element={<SongPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
