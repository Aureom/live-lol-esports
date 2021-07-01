import './styles/playerStatusStyle.css'

import {GameMetadata, Participant} from "./types/windowLiveTypes";

import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import {Frame as FrameWindow} from "./types/windowLiveTypes";

import useSound from "use-sound";
import {Team} from "./types/detailsPersistentTypes";

const firstblood = require("../../assets/audios/firstblood.ogg");
const kill = require("../../assets/audios/campeao_eliminado.ogg");
const tower_blue = require("../../assets/audios/azul_torre_destruida.ogg");
const tower_red = require("../../assets/audios/vermelha_torre_destruida.ogg");
const dragon_blue = require("../../assets/audios/azul_dragao.ogg");
const dragon_red = require("../../assets/audios/vermelha_dragao.ogg");
const baron_blue = require("../../assets/audios/azul_baron.ogg");
const baron_red = require("../../assets/audios/vermelha_baron.ogg");
const inib_blue = require("../../assets/audios/azul_inib_destruido.ogg");
const inib_red = require("../../assets/audios/vermelha_inib_destruido.ogg");

type Props = {
    lastFrameWindow: FrameWindow,
    gameMetadata: GameMetadata,
    blueTeam: Team,
    redTeam: Team,
}

type StatusWatcher = {
    inhibitors: {
        blue: number,
        red: number
    }
    dragons: {
        blue: number,
        red: number
    }
    towers: {
        blue: number,
        red: number
    }
    barons: {
        blue: number,
        red: number
    }
    participants: {
        blue: Participant[]
        red: Participant[]
    }
}

export function LiveAPIWatcher({ lastFrameWindow, gameMetadata, blueTeam, redTeam } : Props) {
    const [status, setStatus] = useState<StatusWatcher>({
        dragons: {blue: lastFrameWindow.blueTeam.dragons.length, red: lastFrameWindow.redTeam.dragons.length},
        inhibitors: {blue: lastFrameWindow.blueTeam.inhibitors, red: lastFrameWindow.redTeam.inhibitors},
        towers: {blue: lastFrameWindow.blueTeam.towers, red: lastFrameWindow.redTeam.towers},
        barons: {blue: lastFrameWindow.blueTeam.barons, red: lastFrameWindow.redTeam.barons},
        participants: {blue: lastFrameWindow.blueTeam.participants, red: lastFrameWindow.redTeam.participants}
    })

    const [firstBloodPlay] = useSound(firstblood);

    useEffect(() => {
        const soundData = localStorage.getItem("sound");
        let isMuted = false;
        if(soundData) {
            if (soundData === "mute") {
                isMuted = true;
            }else if(soundData === "unmute"){
                isMuted = false;
            }
        }

        // Topo = prioridade para o som
        let isPlaying = isMuted;

        if(status.inhibitors.blue !== lastFrameWindow.blueTeam.inhibitors){
            createToast(true, isPlaying, inib_red.default, "Destruiu um inibidor", blueTeam.image);
            isPlaying = true
        }

        if(status.inhibitors.red !== lastFrameWindow.redTeam.inhibitors){
            createToast(false, isPlaying, inib_blue.default, "Destruiu um Inibidor", redTeam.image);
            isPlaying = true
        }

        if(status.barons.blue !== lastFrameWindow.blueTeam.barons){
            createToast(true, isPlaying, baron_blue.default, "Derrotou o barão", blueTeam.image);
            isPlaying = true
        }

        if(status.barons.red !== lastFrameWindow.redTeam.barons){
            createToast(false, isPlaying, baron_red.default, "Derrotou o barão", redTeam.image);
            isPlaying = true
        }

        if(status.dragons.blue !== lastFrameWindow.blueTeam.dragons.length){
            createToast(true, isPlaying, dragon_blue.default, "Derrotou o dragão", blueTeam.image);
            isPlaying = true
        }

        if(status.dragons.red !== lastFrameWindow.redTeam.dragons.length){
            createToast(false, isPlaying, dragon_red.default, "Derrotou o dragão", redTeam.image);
            isPlaying = true
        }

        if(status.towers.blue !== lastFrameWindow.blueTeam.towers){
            createToast(true, isPlaying, tower_red.default, "Destruiu uma torre", blueTeam.image);
            isPlaying = true
        }

        if(status.towers.red !== lastFrameWindow.redTeam.towers){
            createToast(false, isPlaying, tower_blue.default, "Destruiu uma torre", redTeam.image);
            isPlaying = true
        }

        for (let i = 0; i < status.participants.blue.length; i++) {
            if(status.participants.blue[i].kills !== lastFrameWindow.blueTeam.participants[i].kills){
                createToast(true, isPlaying, kill.default, "Eliminou um inimigo", `http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${gameMetadata.blueTeamMetadata.participantMetadata[status.participants.blue[i].participantId - 1].championId}.png`)
                isPlaying = true
            }
        }

        for (let i = 0; i < status.participants.red.length; i++) {
            if(status.participants.red[i].kills !== lastFrameWindow.redTeam.participants[i].kills){
                createToast(false, isPlaying, kill.default, "Eliminou um inimigo", `http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${gameMetadata.redTeamMetadata.participantMetadata[status.participants.red[i].participantId - 6].championId}.png`)
                isPlaying = true
            }
        }

        setStatus({
            dragons: {blue: lastFrameWindow.blueTeam.dragons.length, red: lastFrameWindow.redTeam.dragons.length},
            inhibitors: {blue: lastFrameWindow.blueTeam.inhibitors, red: lastFrameWindow.redTeam.inhibitors},
            towers: {blue: lastFrameWindow.blueTeam.towers, red: lastFrameWindow.redTeam.towers},
            barons: {blue: lastFrameWindow.blueTeam.barons, red: lastFrameWindow.redTeam.barons},
            participants: {blue: lastFrameWindow.blueTeam.participants, red: lastFrameWindow.redTeam.participants},
        })
    }, [lastFrameWindow.blueTeam.totalKills, lastFrameWindow.blueTeam.dragons.length, lastFrameWindow.blueTeam.inhibitors, lastFrameWindow.redTeam.totalKills, lastFrameWindow.redTeam.dragons.length, lastFrameWindow.redTeam.inhibitors, firstBloodPlay, status.dragons.blue, status.dragons.red, status.barons.blue, status.barons.red, status.inhibitors.blue, status.inhibitors.red, status.towers.blue, status.towers.red, status.participants.blue, status.participants.red, lastFrameWindow.blueTeam.barons, lastFrameWindow.blueTeam.towers, lastFrameWindow.blueTeam.participants, lastFrameWindow.redTeam.barons, lastFrameWindow.redTeam.towers, lastFrameWindow.redTeam.participants, gameMetadata.blueTeamMetadata.participantMetadata, gameMetadata.redTeamMetadata.participantMetadata, blueTeam.image, redTeam.image]);

    return (
        <ToastContainer/>
    );
}

function createToast(blueTeam: boolean, soundIsPlaying: boolean, sound: string, message: string, image: string) {
    if(!soundIsPlaying) {
        let audio = new Audio(sound);
        audio.load();
        audio.volume = 0.20;
        audio.play();
    }

    if(blueTeam){
        toast.info(
            <div className="toast-watcher">
                <div className="toast-image">
                    <img src={image} alt="blue team"/>
                </div>
                <h4 style={{color: "#FFF"}}>{message}</h4>
            </div>
            , {
                pauseOnFocusLoss: false,
                position: toast.POSITION.TOP_LEFT
            }
        )
    }else{
        toast.error(
            <div className="toast-watcher">
                <img className="toast-image" src={image} alt="red team"/>
                <h4 style={{color: "#FFF"}}>{message}</h4>
            </div>
            , {
                pauseOnFocusLoss: false,
                position: toast.POSITION.TOP_RIGHT
            }
        )
    }
}