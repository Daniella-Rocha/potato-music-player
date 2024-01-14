import Header from './components/Header/Header';

import Player from './components/Player/Player';

import { PlayerProvider } from './contexts/PlayerContext/PlayerContex';

import { PlayListProvider } from './contexts/PlayListContext/PlayListContext';

import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';

import './App.css';

function App() {

  return (
    <div>
      <ThemeProvider>
        <PlayerProvider>
          <PlayListProvider>
            <Header />
            <Player />
          </PlayListProvider>
        </PlayerProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
