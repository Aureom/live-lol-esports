import React, {useEffect, useState} from "react";
import './styles/navbarStyle.css'

import { useTheme } from "../../theme/ThemeContext";

export function ThemeToggler() {
    const { setCurrentTheme} = useTheme();
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        const themeData = localStorage.getItem("theme");
        if(themeData) {
            if (themeData === "light") {
                setCurrentTheme("light");
                setToggled(false);
            } else {
                setCurrentTheme("dark");
                setToggled(true)
            }
        }
    });

    const handleClick = () => {
        if(toggled) {
            setCurrentTheme("light");
            localStorage.setItem("theme", "light");
        }else{
            setCurrentTheme("dark");
            localStorage.setItem("theme", "dark");
        }

        setToggled((s) => !s);
    }

    return (
        <div className="toggle-container">
            <div onClick={handleClick} className={`theme-toggle${toggled ? " dark" : ""}`}>
                <div className="notch">🌙</div>
            </div>
        </div>
    );
}