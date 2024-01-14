import { useState } from "react";

import axios from 'axios';

import parseAudioMetadata from "parse-audio-metadata";

const useMetadata = () => {

    const [metadata, setMetadata] = useState(null);

    const getMetadata = async (file) => {
        const data = await parseAudioMetadata(file);
        setMetadata(data);
        return data;
    }

    const getSongData = async (track) => {
        // const newSongName = trackName.replace(/[^a-zA-Z]/gi, ' ');

        try {
            const response = await axios.get(`https://api.vagalume.com.br/search.php?art=${track.artist}&mus=${track.title}&extra=artpic,alb
            &apikey={436f3c40d89b8c663c9b4becf06cafdb}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = await response.data;
            
            console.log(data);
            
            return data;
            
        } catch (error) {
            console.log(error);
        }
    }

    const formatingData = (data) => {
        if (data) {
            const formatedData = data.replace(/[^a-zA-Z]/gi, ' - ');
            return formatedData;
        }
        return
    }

    return {
        metadata,
        getMetadata,
        formatingData,
        getSongData
    }
}

export default useMetadata
