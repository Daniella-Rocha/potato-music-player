import { useContext } from "react";

import {PlayerContext} from '../contexts/PlayerContext/PlayerContex';

const usePlayPause = () => {
    
    const {audioRef, setIsPlaying, setDuration, isPlaying} = useContext(PlayerContext);

    // function to turn on the audio
    const handlePlay = () => {

        audioRef?.current.play();
        
        setIsPlaying(true);
        
        // setDuration(audioRef.current.duration);
    }

    // function to turn off the audio
    const handlePause = () => {
        audioRef?.current.pause();
        setIsPlaying(false);
    }

    //function to toggle between play or pause state
    const togglePlayPause = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    }


    return {
        togglePlayPause
    }
}

export default usePlayPause
