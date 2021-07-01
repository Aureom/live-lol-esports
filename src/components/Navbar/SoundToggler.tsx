import React, {useEffect, useState} from "react";
import './styles/navbarStyle.css'

// Anti ESA na live do Baiano
export function SoundToggler() {
    const [toggled, setToggled] = useState(true);

    useEffect(() => {
        const soundData = localStorage.getItem("sound");
        if(soundData) {
            if (soundData === "mute") {
                setToggled(false);
            } else if (soundData === "unmute") {
                setToggled(true)
            }
        }
    });

    const handleClick = () => {
        if(toggled) {
            localStorage.setItem("sound", "mute");
        }else{
            localStorage.setItem("sound", "unmute");
        }

        setToggled((s) => !s);
    }

    return (
        <div className="toggle-container">
            <div onClick={handleClick} className={`sound-toggle${toggled ? " muted" : ""}`}>
                <div className="notch">{`${toggled ? "🔊" : "🔈"}`}</div>
            </div>
        </div>
    );
}