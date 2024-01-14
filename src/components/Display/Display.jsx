import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';

import { PlayerContext } from '../../contexts/PlayerContext/PlayerContex';

import tone from '/tone.png';

import styles from './Display.module.css';

const Display = ({ isPlaying }) => {

  const { darkTheme } = useContext(ThemeContext);

  // context that provides the music data
  const { metadata, songData } = useContext(PlayerContext);

  return (
    metadata &&
    <div className={styles.container}>
      <div className={`
      ${styles.display}
      ${isPlaying ? styles.is_playing : ''}
      `}>

        {
          songData.image !== '' ?
            <img src={typeof songData.image === 'object' ? URL.createObjectURL(songData.image) : songData.image} alt="" srcSet="" />
            :
            <img src={tone} alt="" srcSet="" />
        }
      </div>
      <div className={`
      ${styles.display_data}
      ${darkTheme ? styles.dark_theme : ''}
        `}>
        {
          (songData.title && songData.artist) ?
            <>
              <span>{songData.title} - {songData.artist}</span>
              <span>{songData?.album}</span>
            </>
            :
            (<span>Artista desconhecido</span>)
        }
      </div>
    </div>
    ||
    <div className={styles.container}>
      <div className={`
      ${styles.display}
      ${isPlaying ? styles.is_playing : ''}
      `}>
        <img src={tone} alt="" srcSet="" />
      </div>
      <div>
        <span></span>
      </div>
    </div>
  )
}

export default Display;
