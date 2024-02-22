import React from 'react';
import './Styles/App.scss'
import Button from './Elements/Button/Button';
import './Styles/Button.scss';
import NavBar from './Components/Navbar';
import './Styles/NavBar.scss';
import './Styles/Footer.scss';
import SongTitle from './Components/SongTitle';
import Text from './Elements/Text';
import Title from './Elements/Title';
import Link from './Elements/Link';
import Pic from './Elements/Pic';
import SongPage from './Pages/SongPage';
import './Styles/SongPage.scss';


function App() {

  return (
    <>
    <header><NavBar/></header>
    
    <main>
      <SongPage/>
    </main>

    </>
  );
}

export default App;
