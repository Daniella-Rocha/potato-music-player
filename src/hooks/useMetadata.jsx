import { useState, useEffect } from "react";

import parseAudioMetadata from "parse-audio-metadata";

const useMetadata = () => {

    const [metadata, setMetadata] = useState(null);

    const [picture, setPicture] = useState('');

    const getMetadata = async (file) => {
        const data = await parseAudioMetadata(file);
        setMetadata(data);
        const urlPicture = URL.createObjectURL(data.picture);
        setPicture(urlPicture);
        return data;
    }

    const formatingData = (data) => {
        if(data){
           const formatedData = data.replace(/[^a-zA-Z]/gi, ' - ');
        return formatedData; 
        }
        return
    }

    return {
        metadata,
        getMetadata,
        formatingData,
        picture
    }
}

export default useMetadata
