import { useState, useContext } from 'react';

import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

import styles from './ChangeTheme.module.css';

const ChangeTheme = () => {

    const { switchTheme, darkTheme } = useContext(ThemeContext);

    return (
        <div className={styles.change_theme}>
            <button
                type="button"
                onClick={() => switchTheme()}
            >
               {darkTheme ? 'Tema claro' : 'Tema escuro'}
            </button>
        </div>
    )
}

export default ChangeTheme
