import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./Styles/App.scss";
import Button from "./Elements/Button/Button";
import "./Styles/Button.scss";
import NavBar from "./Components/Navbar";
import "./Styles/NavBar.scss";
import "./Styles/Footer.scss";
import SongTitle from "./Components/SongTitle";
import Text from "./Elements/Text";
import Title from "./Elements/Title";
import Link from "./Elements/Link";
import Pic from "./Elements/Pic";
import SongPage from "./Pages/SongPage/SongPage";
import "./Styles/SongPage.scss";
import SongList from "./Pages/SongList/SongList";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Router>
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
