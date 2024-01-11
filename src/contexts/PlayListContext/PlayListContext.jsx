import { createContext } from "react";

import usePlaylist from "../../hooks/usePlaylist";

import useSearchLyric from "../../hooks/useLyrics";

export const PlayListContext = createContext();

export const PlayListProvider = ({ children }) => {
    const {
        playList,
        addToPlayList,
        handleNextTrack,
        handlePreviousTrack,
        trackIndex,
        setTrackIndex,
        deleteTrack,
        loop,
        infinityLoop,
        autoPlay,
        setAutoPlay,
        handleAutoPlay
    } = usePlaylist();

    const { searchLyric } = useSearchLyric();

    return (
        <PlayListContext.Provider value={{
            playList,
            addToPlayList,
            handleNextTrack,
            handlePreviousTrack,
            trackIndex,
            setTrackIndex,
            deleteTrack,
            loop,
            infinityLoop,
            autoPlay,
            setAutoPlay,
            handleAutoPlay,
            searchLyric
        }}>
            {children}
        </PlayListContext.Provider>
    )
}