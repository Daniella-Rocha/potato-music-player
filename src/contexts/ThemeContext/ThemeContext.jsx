import { useState, createContext } from "react"


export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [darkTheme, setDarkTheme] = useState(false);

    // const lightStyle = {
    //     background: '#f4fcff'
    // }

    // const darkStyle = {
    //     background: '#343434'
    // }

    const switchTheme = () => {
        setDarkTheme(!darkTheme);
    }
    
    return (
        <ThemeContext.Provider
        value={{switchTheme, darkTheme}}
        >
            {children}
        </ThemeContext.Provider>
    )
}
