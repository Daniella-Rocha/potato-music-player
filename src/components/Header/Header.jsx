import ChangeTheme from '../ChangeTheme/ChangeTheme';

import PlayListDisplay from '../PlayListDisplay/PlayListDisplay';

import styles from './Header.module.css';

const Header = () => {

    return (
        <div className={styles.header}>
            <div>
                <img src="potato-no-bg-crop.png" alt="logo do Potato music player, uma imagem escrito potato music player, com uma batatinha fofa sentada na última letra 'o' do nome potato ouvindo headphones" />
            </div>
            <PlayListDisplay  />
            <div>
                <ChangeTheme />
            </div>
        </div>
    )
}

export default Header
