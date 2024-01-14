import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';

import useTimeFormatter from '../../hooks/useTimeFormatter';

import styles from './ProgressBar.module.css';

const ProgressBar = ({ audioRef, currentTime, duration, setCurrentTime }) => {

    const { darkTheme } = useContext(ThemeContext);

    const { timeFormatter } = useTimeFormatter();

    // function to change input range value on seeking the progress bar
    const handleSeek = (e) => {
        const value = e.target.value;

        audioRef.current.currentTime = value;
        setCurrentTime(value);
    }

    return (
        <div className={styles.progress_bar}>
            {/* input range to control current time */}
            <input
                type="range"
                name="progress_bar"
                id="progress_bar"
                step={0.01}
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => handleSeek(e)}
            />
            {/* display the song's current time and duration */}
            <div className={`
                ${styles.music_time}
                ${darkTheme ? styles.dark_theme : ''}
                `}>
                <span>{timeFormatter(currentTime)}</span>
                <span>{timeFormatter(duration)}</span>
            </div>
        </div>
    )
}

export default ProgressBar
