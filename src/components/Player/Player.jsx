import { useState, useContext } from "react";

import InputFile from "../InputFile/InputFile";

import Display from '../Display/Display';

import Controls from "../Controls/Controls";

import ProgressBar from "../ProgressBar/ProgressBar";

import Lyrics from '../Lyrics/Lyrics';

import { PiPlaylistDuotone } from "react-icons/pi";

import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

import { PlayerContext } from "../../contexts/PlayerContext/PlayerContex";

import { PlayListContext } from '../../contexts/PlayListContext/PlayListContext';

import styles from './Player.module.css';

const Player = () => {

    // darkTheme context
    const { darkTheme } = useContext(ThemeContext);

    // app context values
    const {
        isPlaying,
        songSrc,
        setSongSrc,
        currentTime,
        duration,
        audioRef,
        setIsPlaying,
        setCurrentTime,
        setDuration,
        infinityLoop,
        songData,
        setSongData
    } = useContext(PlayerContext);

    // playlist context values and functions
    const { addToPlayList, handleAutoPlay } = useContext(PlayListContext);

    // volume muted false by default
    const [muted, setMuted] = useState(false);


    // update playback current time 
    const handleTimeUpdate = () => {
        const currentTime = audioRef?.current.currentTime;
        setCurrentTime(currentTime);
    }

    return (
        <div className={`
        ${darkTheme ? styles.dark_theme : ''}
        ${styles.container}
        `}>
            <div className={styles.player}>
                {/* display an image with animation */}
                <Display
                    isPlaying={isPlaying}
                />
                <div>
                    {/* audio element to play the audio */}
                    <audio
                        ref={audioRef}
                        src={songSrc}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => {
                            handleAutoPlay(audioRef, setSongSrc, setSongData, setIsPlaying);
                        }}
                        muted={muted}
                        loop={infinityLoop}
                    >
                        <source src="audio.ogg" type="audio/ogg" />
                        <source src="audio.mp3" type="audio/mpeg" />
                        <source src="audio.wav" type="audio/wav" />
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                </div>
                <ProgressBar
                    audioRef={audioRef}
                    setCurrentTime={setCurrentTime}
                    duration={duration}
                    currentTime={currentTime}
                />
                {/* component to control playback */}
                <Controls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    audioRef={audioRef}
                    songSrc={songSrc}
                    setDuration={setDuration}
                />
                {/* component to insert an audio file to play a song */}
                <div className={styles.buttons}>
                    <InputFile
                    />
                    {/* add a song into playlist */}
                    <button
                        className={`
                    ${darkTheme ? styles.dark_theme_btn : ''}
                    `}
                        type="button"
                        onClick={() => addToPlayList(songData)}
                    >
                        Adicionar à playlist
                        <PiPlaylistDuotone />
                    </button>
                </div>
            </div>
            <Lyrics />
        </div>
    )
}

export default Player
