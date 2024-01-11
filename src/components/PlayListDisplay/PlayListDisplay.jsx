import { useContext, useState } from "react";

import { PlayerContext } from "../../contexts/PlayerContext/PlayerContex";

import { PlayListContext } from '../../contexts/PlayListContext/PlayListContext';

import { PiPlaylistDuotone } from "react-icons/pi";

import { RiDeleteBin2Fill } from "react-icons/ri";

import styles from './PlayListDisplay.module.css';

const PlayListDisplay = () => {

  const { setSongSrc, setDuration, audioRef, setIsPlaying } = useContext(PlayerContext);

  // context to get playlist data
  const { playList, setTrackIndex, deleteTrack } = useContext(PlayListContext);

  // State variable to display playlist
  const [isVisible, setIsVisible] = useState(false);

  const handlePlayListVisibility = () => {
    setIsVisible(!isVisible);
  }

  const listenFromPlayList = (item, index) => {
    setTrackIndex(index);
    const trackUrl = URL.createObjectURL(item);
    setSongSrc(trackUrl);
    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
      audioRef.current.play();
      setIsPlaying(true);
    };
  }

  return (
    <div className={styles.play_list_display}>
      <div >
        <button
          className={styles.open_playlist}
          type="button"
          onClick={handlePlayListVisibility}
        >
          PlayList
          <PiPlaylistDuotone />
        </button>
      </div>
      <div className={`
      ${styles.play_list}
      ${isVisible ? styles.isVisible : ''} 
      `}>
        {
          playList.length > 0 &&
          <ul>
            {playList.map((item, index) =>
              <li key={index}>
                <button
                  type="button"
                  onClick={() => listenFromPlayList(item, index)}
                >
                  {item.name}
                </button>
                <button
                  type="button"
                  aria-label="excluir"
                  onClick={() => deleteTrack(item.name)}
                >
                  <RiDeleteBin2Fill />
                </button>
              </li>
            )}
          </ul>
          ||
          (
            <p>
              Nenhuma música na playlist
            </p>
          )
        }
      </div>
    </div>
  )
}

export default PlayListDisplay;
