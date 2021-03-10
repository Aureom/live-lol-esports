import React, { Dispatch, SetStateAction } from "react";
import { Theme } from './Theme'
import { THEMES } from './Themes'

export type ThemeType = "dark" | "light";

interface ThemeContextProps {
    themeType: ThemeType;
    theme: Theme;
    setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    themeType: "dark",
    theme: THEMES["dark"],
} as ThemeContextProps);

export const ThemeProvider: React.FC = ({children}) => {
    const [currentTheme, setCurrentTheme] = React.useState<ThemeType>("light");

    return (
        <ThemeContext.Provider value={{
            themeType: currentTheme,
            theme: THEMES[currentTheme],
            setCurrentTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext);