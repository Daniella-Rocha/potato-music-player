import { useContext, useState } from "react";

import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';

import { PlayerContext } from "../../contexts/PlayerContext/PlayerContex";

import usePlayPause from "../../hooks/usePlayPause";

import { FaBackward, FaForward } from "react-icons/fa";

import { TbRepeatOff, TbRepeat } from "react-icons/tb";

import { PiPlayDuotone, PiPauseDuotone } from "react-icons/pi";

import { SlVolume2 } from "react-icons/sl";

import { PlayListContext } from "../../contexts/PlayListContext/PlayListContext";

import styles from './Controls.module.css';

const Controls = () => {

    const { darkTheme } = useContext(ThemeContext);

    const {
        isPlaying,
        songSrc,
        setSongSrc,
        audioRef,
        infinityLoop,
        handleLoop,
        setSongData
    } = useContext(PlayerContext);

    const {
        handleNextTrack,
        handlePreviousTrack
    } = useContext(PlayListContext);

    const { togglePlayPause } = usePlayPause();

    const [currentVolume, setCurrentVolume] = useState(0);

    const [visibleVolume, setVisibleVolume] = useState(false);

    // function to control play/pause and render button play/pause
    const handlePlayPause = () => {
        if (songSrc) {
            togglePlayPause();
        }
    }

    const handleNextSong = () => {
        handleNextTrack(setSongSrc, setSongData);
        audioRef.current.play();
    }

    const handlePreviousSong = () => {
        handlePreviousTrack(setSongSrc, setSongData);
        audioRef.current.play();
    }

    const handleVolume = (e) => {
        const value = e.target.value;
        audioRef.current.volume = value;
        setCurrentVolume(value);
    }

    const handleVisibleVolume = () => {
        setVisibleVolume(!visibleVolume);
    }

    return (
        <div className={styles.container}>
            <div>
                <button
                    className={`
                ${darkTheme ? styles.dark_theme : styles.default}
                `}
                    type="button"
                    onClick={handleLoop}
                >
                    {
                        (infinityLoop && <TbRepeat />)
                        ||
                        <TbRepeatOff />
                    }

                </button>
                <button
                    className={`
                    ${darkTheme ? styles.dark_theme : styles.default}
                    `}
                    type="button"
                    aria-label="música anterior"
                    onClick={handlePreviousSong}
                >
                    <FaBackward />
                </button>
                <button
                    className={`
                    ${darkTheme ? styles.dark_theme : styles.default}
                    `}
                    type="button"
                    aria-label="play ou pause"
                    onClick={handlePlayPause}
                >
                    {/* render play or pause button */}
                    {isPlaying ? <PiPauseDuotone /> : <PiPlayDuotone />}
                </button>
                <button
                    className={`
                    ${darkTheme ? styles.dark_theme : styles.default}
                    `}
                    type="button"
                    aria-label="próxima música"
                    onClick={handleNextSong}
                >
                    <FaForward />
                </button>
                {/* <button
                    className={`
                ${styles.auto_play}
                ${autoPlay ? styles.auto_play_on : ''}
                `}
                    type="button"
                    aria-label="auto reprodução"
                    onClick={() => setAutoPlay(!autoPlay)}
                >
                    <MdReplay />
                </button> */}
            </div>

            <div>
                <button
                    className={`
                   ${darkTheme ? styles.dark_theme : styles.default}
                   `}
                    type="button"
                    onClick={handleVisibleVolume}
                >
                    <SlVolume2 />
                </button>
                <input
                    className={`
                    ${darkTheme ? styles.dark_theme : styles.default}
                ${styles.volume}
                ${visibleVolume ? styles.volume_visible : ''}
                `}
                    type="range"
                    name="volume"
                    id="volume"
                    value={currentVolume}
                    step={0.1}
                    min={0}
                    max={1}
                    onChange={(e) => handleVolume(e)}
                />
            </div>
        </div>
    )
}

export default Controls
