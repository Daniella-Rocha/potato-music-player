import { useState } from "react";

const useTimeFormatter = () => {
    const [formatedTime, setFormatedTime] = useState(0);
    
    // function to format the time displayed on the progress bar during the song playback
    const timeFormatter = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formatedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formatedSeconds}`
    }

    return {
        timeFormatter
    }
}

export default useTimeFormatter
