import { useEffect, useState } from "react"

const usePlaylist = () => {

    const [playList, setPlayList] = useState([]);

    // Variables to maneger the track position
    const [trackIndex, setTrackIndex] = useState(0);

    const [currentTrack, setCurrentTrack] = useState(0);

    const [autoPlay, setAutoPlay] = useState(false);

    // function to add a song to the playlist
    const addToPlayList = (songFile) => {

        const list = playList.filter((item) => item.name !== songFile.name);

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

    const handlePreviousTrack = (setSrc) => {
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
            const trackUrl = URL.createObjectURL(currentTrack);
            setSrc(trackUrl);
        } else {
            return
        }
    }

    const handleNextTrack = (setSrc) => {
        if (playList.length > 0) {
            if (trackIndex >= playList.length - 1) {
                setTrackIndex(0)
                setCurrentTrack(playList[0]);
            } else {
                setTrackIndex(prevState => prevState + 1);
                setCurrentTrack(playList[trackIndex + 1]);
            }
            // fazer com que a função atualize o songSrc e não o audio diretamente
            const trackUrl = URL.createObjectURL(currentTrack);
            setSrc(trackUrl);
        } else {
            return
        }
    }

    // autoplay function
    // verifica se tem musica na playlist, se tem, soma um no trackIndex e da play ate terminar
    //depois zera track index e da pause


    const handleAutoPlay = (audioRef, setIsPlaying) => {
        if (playList.length > 0 && autoPlay) {
            URL.revokeObjectURL(currentTrack);
            if (trackIndex >= playList.length - 1) {
                setTrackIndex(0);
                setCurrentTrack(playList[0]);
                console.log(trackIndex, `${currentTrack.name}`);
            } else {
                setTrackIndex(prev => prev + 1);
                setCurrentTrack(playList[trackIndex + 1]);
                console.log(trackIndex, `${currentTrack.name}`);
            }
            audioRef.current.src = URL.createObjectURL(currentTrack);
            audioRef.current.play();
        } else {
            setAutoPlay(false);
            setIsPlaying(false);
            return
        }
    }

    const deleteTrack = (name) => {
        const updatedPlayList = playList.filter(item => item.name !== name);
        setPlayList(updatedPlayList);
    }

    useEffect(() => {
        setPlayList(playList);
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
