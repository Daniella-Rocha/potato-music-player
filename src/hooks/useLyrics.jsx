import { useState } from "react";

import axios from 'axios';

const useSearchLyric = () => {

    const [lyric, setLyrics] = useState('');


    const searchLyric = async (artist, title) => {
        const newArtistName = artist.replace(/[^a-zA-Z]/gi, ' ');
        const newSongName = title.replace(/[^a-zA-Z]/gi, ' ');

        try {
            const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${newSongName}&extra=artpic,alb&api_key=5f1dd729d90c24bfa8352526a18b6922&format=json`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = await response.data;

            console.log(response);

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
