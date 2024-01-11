import { useContext } from 'react';

import useMetadata from '../../hooks/useMetadata';

import { PlayerContext } from '../../contexts/PlayerContext/PlayerContex';

import tone from '/tone.png';

import styles from './Display.module.css';

const Display = ({ isPlaying }) => {

  const { metadata } = useContext(PlayerContext);

  const { formatingData } = useMetadata();

  return (
    metadata &&
    <div className={styles.container}>
      <div className={`
      ${styles.display}
      ${isPlaying ? styles.is_playing : ''}
      `}>
        <img src={tone} alt="" srcSet="" />
      </div>
      <div className={styles.display_data}>
        {
          (metadata?.title && metadata?.artist) ?
            <>
              <span>{metadata?.title} - {metadata?.album}</span>
              <span>{formatingData(metadata?.artist)}</span>
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
