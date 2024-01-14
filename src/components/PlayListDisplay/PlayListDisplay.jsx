import { useContext, useEffect, useState } from "react";

import { PlayerContext } from "../../contexts/PlayerContext/PlayerContex";

import { PlayListContext } from '../../contexts/PlayListContext/PlayListContext';

import { PiPlaylistDuotone } from "react-icons/pi";

import { RiDeleteBin2Fill } from "react-icons/ri";

import styles from './PlayListDisplay.module.css';

const PlayListDisplay = () => {

  // values from context

  const { setSongSrc, setDuration, audioRef, setIsPlaying, setSongData } = useContext(PlayerContext);

  // context to get playlist data
  const { playList, setTrackIndex, deleteTrack } = useContext(PlayListContext);

  // State variable to display playlist
  const [isVisible, setIsVisible] = useState(false);

  const handlePlayListVisibility = () => {
    setIsVisible(!isVisible);
  }

  // playback from polaylist
  const listenFromPlayList = (item, index) => {
    setTrackIndex(index);
    const trackUrl = URL.createObjectURL(item.objFile);
    setSongSrc(trackUrl);
    setSongData(item);
    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
      // audioRef.current.play();
      // setIsPlaying(true);
    };
  }

  // useEffect(() => {
  //   setFileObj(playList[trackIndex]);
  // }, [fileObj]);

  return (
    <div className={styles.play_list_display}>
      <div >
        {/* open playlist */}
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
        {/* render the playlist */}
        {
          playList.length > 0 &&
          <ul>
            {playList.map((item, index) =>
              <li key={index}>
                <button
                  type="button"
                  onClick={() => listenFromPlayList(item, index)}
                >
                  {item.title}
                </button>
                <button
                  type="button"
                  aria-label="excluir"
                  onClick={() => deleteTrack(item.title)}
                >
                  <RiDeleteBin2Fill />
                </button>
              </li>
            )}
          </ul>
          ||
          (
            // if playlist is empty
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
