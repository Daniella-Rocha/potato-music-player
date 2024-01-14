import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';

import { PlayerContext } from '../../contexts/PlayerContext/PlayerContex';

import styles from './Lyrics.module.css';

const Lyrics = () => {

    const { darkTheme } = useContext(ThemeContext);

    const { songData, showTranslate, setShowTranslate } = useContext(PlayerContext);

    const { lyric, translate } = songData;

    return (
        <div className={styles.lyrics_container}>
            {/* button to toggle between translate  and lyric */}
            <button
                type="button"
                onClick={() => setShowTranslate(!showTranslate)}
            >
                {showTranslate ? 'Original' : 'Tradução'}
            </button>
            <div className={styles.lyrics}>
                {
                    // showTranslate true turns the translate visible
                    showTranslate ?
                        (
                            translate &&
                            <iframe src={translate} frameborder="0"></iframe>
                        )
                        ||
                        <p
                            className={`
                            ${darkTheme ? styles.dark_theme : styles.default}
                            `}>
                            Sem tradução</p>
                        :
                        // if lyrics true
                        lyric &&
                        // show a pharagraph with the lyric
                        <p
                            className={`
                            ${darkTheme ? styles.dark_theme : styles.default}
                            `}
                        >{lyric}</p>
                        ||
                        // else
                        // show a mesage
                        <p
                            className={`
                            ${darkTheme ? styles.dark_theme : styles.default}
                            `}
                        >Letra não encontrada</p>
                }
            </div>
        </div>
    )
}

export default Lyrics;
