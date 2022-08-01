import { createContext, useState, useEffect } from 'react';

export const NewContext = createContext();

export const TheContextProvider = ({ children }) => {

    const themes = {
        lightMood: {
            light: "light",
            secondary: "light-Secondary-color"
        },
        darkMood: {
            dark: "dark",
            secondary: "dark-Secondary-color"
        }
    }
    const [theme, setTheme] = useState(themes.lightMood)
    const [status, setstatus] = useState(true);

    const switchMood = (val) => {
        setstatus(!val)
    }
    
    // useEffect(() => {
    //     status ? setTheme(themes.lightMood) : setTheme(themes.darkMood);
    // }, [status])

    return (
        <NewContext.Provider value={{ theme, switchMood, status }}>
            {children}
        </NewContext.Provider>
    )
}
