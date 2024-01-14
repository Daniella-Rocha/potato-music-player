import { createContext, useState, useRef } from 'react';

import useSearchLyric from '../../hooks/useLyrics';

import useMetadata from '../../hooks/useMetadata';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    // State variables to manege the player's status and current time
    const [isPlaying, setIsPlaying] = useState(false);

    const [songSrc, setSongSrc] = useState(null);

    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);

    const [loop, setLoop] = useState(false);

    const [infinityLoop, setInfinityLoop] = useState(false);

    const [showTranslate, setShowTranslate] = useState(false);

    const [fileObj, setFileObj] = useState(null);

    const audioRef = useRef(null);

    const [songData, setSongData] = useState({});

    const { searchLyrics, lyric } = useSearchLyric();

    const { getMetadata, metadata, getSongData } = useMetadata();

    const handleLoop = () => {
        if (infinityLoop === false) {
            setInfinityLoop(true);
        } else {
            audioRef.current.loop = false;
            setInfinityLoop(false);
        }
    }

    const values = {
        isPlaying,
        songSrc,
        currentTime,
        duration,
        audioRef,
        setIsPlaying,
        setSongSrc,
        setCurrentTime,
        setDuration,
        loop,
        infinityLoop,
        setLoop,
        setInfinityLoop,
        handleLoop,
        searchLyrics,
        lyric,
        getMetadata,
        metadata,
        getSongData,
        showTranslate,
        setShowTranslate,
        setSongData,
        songData,
        fileObj,
        setFileObj
    }
    return (
        <PlayerContext.Provider value={values}>
            {children}
        </PlayerContext.Provider>
    )
}


