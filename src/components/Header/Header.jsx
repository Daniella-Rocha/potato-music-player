import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';

import ChangeTheme from '../ChangeTheme/ChangeTheme';

import PlayListDisplay from '../PlayListDisplay/PlayListDisplay';

import styles from './Header.module.css';

const Header = () => {

    const { darkTheme } = useContext(ThemeContext);

    return (
        <div className={`${darkTheme ? styles.dark_theme : ''}
        ${styles.header}
        `}>
            <div >
                {
                    darkTheme ?
                        <img
                        className={styles.dark_theme_img}
                            src="Potato-v-dark-crop.png"
                            alt="logo do Potato music player, uma imagem escrito potato music player, com uma batatinha fofa sentada na última letra 'o' do nome potato ouvindo headphones"
                        />
                        :
                        <img
                            src="potato-no-bg-crop.png"
                            alt="logo do Potato music player, uma imagem escrito potato music player, com uma batatinha fofa sentada na última letra 'o' do nome potato ouvindo headphones"
                        />
                }
            </div>
            <PlayListDisplay />
            <div>
                <ChangeTheme />
            </div>
        </div>
    )
}

export default Header
