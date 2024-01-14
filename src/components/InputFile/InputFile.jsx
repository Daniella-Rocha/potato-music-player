import { useContext } from 'react';

import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

import { PlayerContext } from '../../contexts/PlayerContext/PlayerContex';

import { PlayListContext } from '../../contexts/PlayListContext/PlayListContext';

import { MdOutlineAudioFile } from "react-icons/md";

import styles from './InputFile.module.css';

const InputFile = ({ }) => {
    
    const {darkTheme} = useContext(ThemeContext);

    const { audioRef, setDuration, getSongData, setSongSrc, getMetadata, songData, setSongData } = useContext(PlayerContext);

    const { playList } = useContext(PlayListContext);

    const handleChange = async (e) => {

        const file = e.target.files[0];

        const data = await getMetadata(file);

        const trackData = await getSongData(data);

        if (trackData.type != 'notfound') {
            setSongData({
                id: trackData.mus[0].id,
                artist: trackData.art.name,
                album: null,
                image: trackData.art.pic_medium || '',
                title: trackData.mus[0].name || '',
                lyric: trackData.mus[0].text,
                translate: trackData.mus[0]?.translate?.text || '',
                objFile: file
            });
        } else {
            console.log(data);
            setSongData({
                id: playList.length + 1 || 1,
                artist: data.artist,
                album: data.album,
                image: data.picture,
                title: data.title,
                lyric: null,
                translate: null,
                objFile: file
            });
        }

        const fileUrl = URL.createObjectURL(file);

        setSongSrc(fileUrl);

        audioRef.current.onloadedmetadata = () => {
            setDuration(audioRef.current.duration);
            // audioRef.current.play();
            // setIsPlaying(true);
        };
    }

    return (
        <div className={styles.input_file}>
            <form >
                <label
                    className={`
                ${darkTheme ? styles.dark_theme: styles.default}
                `}
                    htmlFor="audio"
                >
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
