import { useEffect, useState } from "react"

const usePlaylist = () => {

    const [playList, setPlayList] = useState([]);

    // Variables to maneger the track position
    const [trackIndex, setTrackIndex] = useState(0);

    const [currentTrack, setCurrentTrack] = useState(0);

    const [autoPlay, setAutoPlay] = useState(false);

    // function to add a song to the playlist
    const addToPlayList = (songFile) => {

        const list = playList.filter((item) => item.title !== songFile.title);

        // check if the playlist is empty and check if the song already exists
        if (playList.length >= 1) {

            if (list.length > 0) {

                setPlayList(
                    [

                        ...list,
                        songFile
                    ]
                );
            } else {
            }
        } else {
            if (songFile) {
                setPlayList(
                    [
                        songFile
                    ]);
            } else {
                return
            }
        }
    }

    const handlePreviousTrack = (setSrc, setSongData) => {
        console.log(currentTrack);
        URL.revokeObjectURL(currentTrack);
        if (playList.length > 0) {
            if (trackIndex === 0) {
                const lastTrackIndex = playList.length - 1;
                setTrackIndex(lastTrackIndex);
                setCurrentTrack(playList[lastTrackIndex]);
            } else {
                setTrackIndex(prevState => prevState - 1);
                setCurrentTrack(playList[trackIndex - 1]);
            }
            // fazer com que a função atualize o songSrc e não o audio diretamente
            const trackUrl = URL.createObjectURL(currentTrack.objFile);
            setSrc(trackUrl);
            setSongData(currentTrack);
        } else {
            return
        }
    }

    const handleNextTrack = (setSrc, setSongData) => {
        URL.revokeObjectURL(currentTrack);
        // if there's more than one track on the playlist, can play next song
        if (playList.length > 0) {
            // verify if is the lasst song
            if (trackIndex >= playList.length - 1) {
                setTrackIndex(0)
                setCurrentTrack(playList[0]);
            } else {
                // updates for next track
                setTrackIndex(prevState => prevState + 1);
                setCurrentTrack(playList[trackIndex + 1]);
            }
            // updates the src attribute of the audio
            const trackUrl = URL.createObjectURL(currentTrack.objFile);
            setSrc(trackUrl);
            setSongData(currentTrack);
        } else {
            return
        }
    }

    const handleAutoPlay = (audioRef, setSongSrc, setSongData, setIsPlaying) => {
        setIsPlaying(false);
        audioRef.current.pause();
        if (playList.length > 0 && autoPlay) {
            URL.revokeObjectURL(currentTrack);
            if (trackIndex >= playList.length - 1) {
                setTrackIndex(0);
                setCurrentTrack(playList[0]);
            } else {
                setTrackIndex(prev => prev + 1);
                setCurrentTrack(playList[trackIndex + 1]);
            }
            const trackUrl = URL.createObjectURL(currentTrack.objFile);
            setSongData(currentTrack);
            setSongSrc(trackUrl);
            // audioRef.current.play();
        } else {
            setAutoPlay(false);
            setIsPlaying(false);
            return
        }
    }

    const deleteTrack = (name) => {
        const updatedPlayList = playList.filter(item => item.title !== name);
        setPlayList(updatedPlayList);
    }

    useEffect(() => {
        setPlayList(playList);
        console.log(playList);
    }, [playList]);

    return {
        playList,
        addToPlayList,
        handleNextTrack,
        trackIndex,
        setTrackIndex,
        deleteTrack,
        handlePreviousTrack,
        autoPlay,
        setAutoPlay,
        handleAutoPlay
    }
}

export default usePlaylist;
