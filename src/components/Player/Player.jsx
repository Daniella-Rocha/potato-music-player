import { useState, useRef, useContext, useEffect } from "react";

import InputFile from "../InputFile/InputFile";

import Display from '../Display/Display';

import Controls from "../Controls/Controls";

import ProgressBar from "../ProgressBar/ProgressBar";

import Lyrics from '../Lyrics/Lyrics';

import { PiPlaylistDuotone } from "react-icons/pi";

import { PlayerContext } from "../../contexts/PlayerContext/PlayerContex";

import { PlayListContext } from '../../contexts/PlayListContext/PlayListContext';

import styles from './Player.module.css';

const Player = () => {

    const {
        isPlaying,
        songSrc,
        currentTime,
        duration,
        audioRef,
        setIsPlaying,
        setSongSrc,
        setCurrentTime,
        setDuration,
        infinityLoop
    } = useContext(PlayerContext);

    const { addToPlayList, handleAutoPlay } = useContext(PlayListContext);

    const [fileObj, setFileObj] = useState(null);

    const [muted, setMuted] = useState(false);


    const handleTimeUpdate = () => {
        const currentTime = audioRef?.current.currentTime;
        setCurrentTime(currentTime);
    }

    return (
        <div className={styles.container}>
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
                            handleAutoPlay(audioRef, setIsPlaying);
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
                {/* component to set up the current time */}
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
                        setSongSrc={setSongSrc}
                        setFileObj={setFileObj}
                        fileObj={fileObj}
                    />
                    <button
                        type="button"
                        onClick={() => addToPlayList(fileObj)}
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
