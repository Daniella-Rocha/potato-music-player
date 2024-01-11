import { useContext, useState } from 'react';

import { PlayerContext } from '../../contexts/PlayerContext/PlayerContex';

import { PlayListContext } from '../../contexts/PlayListContext/PlayListContext';

import { MdEvent, MdOutlineAudioFile } from "react-icons/md";

import styles from './InputFile.module.css';

const InputFile = ({ setFileObj }) => {
    // props
    // setSongSrc, 

    const { audioRef, setDuration, setIsPlaying, getMetadata, setSongSrc } = useContext(PlayerContext);

    const { searchLyric } = useContext(PlayListContext);

    const handleChange = async (e) => {

        const file = e.target.files[0];

        const data = await getMetadata(file);

        const lyric = searchLyric(data.artist, data.title);

        const audioFile = {
            id: Date.now(),
            name: data.title,
            album: data.album,
            artist: data.artist,
            picture: data.picture,
            lytic: ''
        }

        const fileUrl = URL.createObjectURL(file);

        setSongSrc(fileUrl);

        setFileObj(audioFile);

        audioRef.current.onloadedmetadata = () => {
            setDuration(audioRef.current.duration);
            audioRef.current.play();
            setIsPlaying(true);
        };
    }

    return (
        <div className={styles.input_file}>
            <form >
                <label htmlFor="audio">
                    Selecionar música
                    <MdOutlineAudioFile />
                    <input
                        accept=".mp3, .wav, .ogg"
                        type="file"
                        name="audio"
                        id="audio"
                        className={styles.audio}
                        onChange={handleChange}
                    />
                </label>
            </form>
        </div>
    )
}

export default InputFile;
