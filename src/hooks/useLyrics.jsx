import { useState } from "react";

import axios from 'axios';

const useSearchLyric = () => {

    const [lyric, setLyrics] = useState('');


    const searchLyric = async (artist, title) => {
        const newArtistName = artist.replace(/[^a-zA-Z]/gi, '');
        const newSongName = title.replace(/[^a-zA-Z]/gi, '');
        try {
            const response = await axios.get(`https://api.deezer.com/search?q=${artist}`,
                {
                    headers: {
                        "Content-Type": "application/json"
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
    return {
        searchLyric
    }
}

export default useSearchLyric;
