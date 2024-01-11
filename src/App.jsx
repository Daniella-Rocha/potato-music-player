import Header from './components/Header/Header';

import Player from './components/Player/Player';

import {PlayerProvider} from './contexts/PlayerContext/PlayerContex';

import { PlayListProvider } from './contexts/PlayListContext/PlayListContext';

import './App.css';

function App() {

  return (
    <div>
      <PlayerProvider>
        <PlayListProvider>
          <Header />
          <Player />
        </PlayListProvider>
      </PlayerProvider>
    </div>
  )
}

export default App
