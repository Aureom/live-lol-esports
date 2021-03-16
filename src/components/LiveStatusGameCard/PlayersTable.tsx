import './styles/playerStatusStyle.css'

import { GameMetadata } from "./types/windowLiveTypes";
import {GameDetails} from "./types/detailsPersistentTypes";

import {MiniHealthBar} from "./MiniHealthBar";
import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import {Frame as FrameDetails} from "./types/detailsLiveTypes";
import {Frame as FrameWindow, Participant as ParticipantWindow} from "./types/windowLiveTypes";

import {ReactComponent as TowerSVG} from '../../assets/images/tower.svg';
import {ReactComponent as BaronSVG} from '../../assets/images/baron.svg';
import {ReactComponent as KillSVG} from '../../assets/images/kill.svg';
import {ReactComponent as GoldSVG} from '../../assets/images/gold.svg';
import {ReactComponent as InhibitorSVG} from '../../assets/images/inhibitor.svg';

import {ReactComponent as OceanDragonSVG} from '../../assets/images/dragon-ocean.svg';
import {ReactComponent as InfernalDragonSVG} from '../../assets/images/dragon-infernal.svg';
import {ReactComponent as CloudDragonSVG} from '../../assets/images/dragon-cloud.svg';
import {ReactComponent as MountainDragonSVG} from '../../assets/images/dragon-mountain.svg';
import {ReactComponent as ElderDragonSVG} from '../../assets/images/dragon-elder.svg';
import {ItemsDisplay} from "./ItemsDisplay";

type Props = {
    lastFrameWindow: FrameWindow,
    lastFrameDetails: FrameDetails,
    gameMetadata: GameMetadata,
    gameDetails: GameDetails,
}

type HeraldLogic = {
    partipantId: number;
    lastHerald: Date;
}

export function PlayersTable({ lastFrameWindow, lastFrameDetails, gameMetadata, gameDetails } : Props) {
    const [gameState, setGameState] = useState<GameState>(GameState[lastFrameWindow.gameState as keyof typeof GameState]);

    useEffect(() => {
        let currentGameState: GameState = GameState[lastFrameWindow.gameState as keyof typeof GameState]

        if(currentGameState !== gameState){
            setGameState(currentGameState);

            toast.info(`Status atual do jogo alterado: ${currentGameState.toUpperCase()}`, {
                position: "top-right",
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    });

    let blueTeam = gameDetails.data.event.match.teams[0];
    let redTeam = gameDetails.data.event.match.teams[1];

    const auxBlueTeam = blueTeam
    if(blueTeam.id != gameMetadata.blueTeamMetadata.esportsTeamId){
        blueTeam = redTeam;
        redTeam = auxBlueTeam;
    }else{
        /*
            As vezes os times continuam errados mesmo apos verificar o ultimo frame,
            em ligas como TCL, por isso fazemos essa verificação pelo nome
        */
        const summonerName = gameMetadata.blueTeamMetadata.participantMetadata[0].summonerName.split(" ");
        if(summonerName[0].startsWith(blueTeam.code)){ // Temos que verificar apenas os primeiros caracteres pois os times academy usam o A, a mais na tag mas não nos nomes
            blueTeam = redTeam;
            redTeam = auxBlueTeam;
        }
    }

    const goldPercentage = getGoldPercentage(lastFrameWindow.blueTeam.totalGold, lastFrameWindow.redTeam.totalGold);

    document.title = `${blueTeam.name} VS ${redTeam.name}`;

    return (
        <div className="status-live-game-card">
            <div className="status-live-game-card-content">
                <div className="live-game-stats-header">
                    <div className="live-game-stats-header-team-images">
                        <div className="blue-team">
                            <img src={blueTeam.image} alt={blueTeam.name}/>
                        </div>
                        <h3>{blueTeam.code}</h3>
                        <h1>
                            VS
                            <h3>{gameState.toUpperCase()}</h3>
                        </h1>
                        <h3>{redTeam.code}</h3>
                        <div className="red-team">
                            <img src={redTeam.image} alt={redTeam.name}/>
                        </div>
                    </div>
                    <div className="live-game-stats-header-status">
                        <div className="blue-team">
                            <div className="team-stats inhibitors">
                                <InhibitorSVG/>
                                {lastFrameWindow.blueTeam.inhibitors}
                            </div>
                            <div className="team-stats barons">
                                <BaronSVG/>
                                {lastFrameWindow.blueTeam.barons}
                            </div>
                            <div className="team-stats towers">
                                <TowerSVG/>
                                {lastFrameWindow.blueTeam.towers}
                            </div>
                            <div className="team-stats gold">
                                <GoldSVG/>
                                <span>
                                    {Number(lastFrameWindow.blueTeam.totalGold).toLocaleString('pt-br')}
                                </span>
                            </div>
                            <div className="team-stats kills">
                                <KillSVG/>
                                {lastFrameWindow.blueTeam.totalKills}
                            </div>
                        </div>
                        <div className="red-team">
                            <div className="team-stats">
                                <InhibitorSVG/>
                                {lastFrameWindow.redTeam.inhibitors}
                            </div>
                            <div className="team-stats">
                                <BaronSVG/>
                                {lastFrameWindow.redTeam.barons}
                            </div>
                            <div className="team-stats">
                                <TowerSVG/>
                                {lastFrameWindow.redTeam.towers}
                            </div>
                            <div className="team-stats gold">
                                <GoldSVG/>
                                <span>
                                    {Number(lastFrameWindow.redTeam.totalGold).toLocaleString('pt-br')}
                                </span>
                            </div>
                            <div className="team-stats">
                                <KillSVG/>
                                {lastFrameWindow.redTeam.totalKills}
                            </div>
                        </div>
                    </div>
                    <div className="live-game-stats-header-gold">
                        <div className="blue-team" style={{flex: goldPercentage.goldBluePercentage}}/>
                        <div className="red-team" style={{flex: goldPercentage.goldRedPercentage}}/>
                    </div>
                    <div className="live-game-stats-header-dragons">
                        <div className="blue-team">
                            {lastFrameWindow.blueTeam.dragons.map(dragon => (
                                getDragonSVG(dragon)
                            ))}
                        </div>
                        <div className="red-team">

                            {lastFrameWindow.redTeam.dragons.slice().reverse().map(dragon => (
                                getDragonSVG(dragon)
                            ))}
                        </div>
                    </div>
                </div>

                <table className="status-live-game-card-table">
                    <thead>
                    <tr>
                        <th className="table-top-row-champion" title="champion/team">
                            <span>{blueTeam.name.toUpperCase()}</span>
                        </th>
                        <th className="table-top-row-vida" title="life">
                            <span>VIDA</span>
                        </th>
                        <th className="table-top-row-items" title="items">
                            <span>ITEMS</span>
                        </th>
                        <th className="table-top-row" title="creep score">
                            <span>CS</span>
                        </th>
                        <th className="table-top-row player-stats-kda" title="kills">
                            <span>K</span>
                        </th>
                        <th className="table-top-row player-stats-kda" title="kills">
                            <span>D</span>
                        </th>
                        <th className="table-top-row player-stats-kda" title="kills">
                            <span>A</span>
                        </th>
                        <th className="table-top-row" title="gold">
                            <span>Ouro</span>
                        </th>
                        <th className="table-top-row" title="gold difference">
                            <span>+/-</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {lastFrameWindow.blueTeam.participants.map((player: ParticipantWindow) => {
                        let goldDifference = getGoldDifference(player, "blue", gameMetadata, lastFrameWindow);

                        return (
                            <tr>
                                <th>
                                    <div className="player-champion-info">
                                        <img
                                            src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${gameMetadata.blueTeamMetadata.participantMetadata[player.participantId - 1].championId}.png`}
                                            className="player-champion"
                                            alt="imagem do campeao"/>
                                        <span className=" player-champion-info-level">{player.level}</span>
                                        <div className=" player-champion-info-name">
                                            <span>{gameMetadata.blueTeamMetadata.participantMetadata[player.participantId - 1].championId}</span>
                                            <span
                                                className=" player-card-player-name">{gameMetadata.blueTeamMetadata.participantMetadata[player.participantId - 1].summonerName}</span>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    <MiniHealthBar currentHealth={player.currentHealth} maxHealth={player.maxHealth}/>
                                </td>
                                <td>
                                    <ItemsDisplay participantId={player.participantId - 1} lastFrame={lastFrameDetails}/>
                                </td>
                                <td>
                                    <div className=" player-stats">{player.creepScore}</div>
                                </td>
                                <td>
                                    <div className=" player-stats player-stats-kda">{player.kills}</div>
                                </td>
                                <td>
                                    <div className=" player-stats player-stats-kda">{player.deaths}</div>
                                </td>
                                <td>
                                    <div className=" player-stats player-stats-kda">{player.assists}</div>
                                </td>
                                <td>
                                    <div
                                        className=" player-stats">{Number(player.totalGold).toLocaleString('pt-br')}</div>
                                </td>
                                <td>
                                    <div className={`player-stats player-gold-${goldDifference?.style}`}>{goldDifference.goldDifference}</div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <table className="status-live-game-card-table">
                    <thead>
                    <tr>
                        <th className="table-top-row-champion" title="champion/team">
                            <span>{redTeam.name.toUpperCase()}</span>
                        </th>
                        <th className="table-top-row-vida" title="life">
                            <span>VIDA</span>
                        </th>
                        <th className="table-top-row-items" title="items">
                            <span>ITEMS</span>
                        </th>
                        <th className="table-top-row" title="creep score">
                            <span>CS</span>
                        </th>
                        <th className="table-top-row player-stats-kda" title="kills">
                            <span>K</span>
                        </th>
                        <th className="table-top-row player-stats-kda" title="kills">
                            <span>D</span>
                        </th>
                        <th className="table-top-row player-stats-kda" title="kills">
                            <span>A</span>
                        </th>
                        <th className="table-top-row" title="gold">
                            <span>Ouro</span>
                        </th>
                        <th className="table-top-row" title="gold difference">
                            <span>+/-</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {lastFrameWindow.redTeam.participants.map((player) => {
                        let goldDifference = getGoldDifference(player, "red", gameMetadata, lastFrameWindow);

                        return(
                            <tr>
                                <th>
                                    <div className="player-champion-info">
                                        <img
                                            src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${gameMetadata.redTeamMetadata.participantMetadata[player.participantId - 6].championId}.png`}
                                            className="player-champion"
                                            alt="imagem do campeao"/>
                                        <span className=" player-champion-info-level">{player.level}</span>
                                        <div className=" player-champion-info-name">
                                            <span>{gameMetadata.redTeamMetadata.participantMetadata[player.participantId - 6].championId}</span>
                                            <span className=" player-card-player-name">{gameMetadata.redTeamMetadata.participantMetadata[player.participantId - 6].summonerName}</span>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    <MiniHealthBar currentHealth={player.currentHealth} maxHealth={player.maxHealth}/>
                                </td>
                                <td>
                                    <ItemsDisplay participantId={player.participantId - 1} lastFrame={lastFrameDetails}/>
                                </td>
                                <td>
                                    <div className=" player-stats">{player.creepScore}</div>
                                </td>
                                <td>
                                    <div className=" player-stats player-stats-kda">{player.kills}</div>
                                </td>
                                <td>
                                    <div className=" player-stats player-stats-kda">{player.deaths}</div>
                                </td>
                                <td>
                                    <div className=" player-stats player-stats-kda">{player.assists}</div>
                                </td>
                                <td>
                                    <div className=" player-stats">{Number(player.totalGold).toLocaleString('pt-br')}</div>
                                </td>
                                <td>
                                    <div className={`player-stats player-gold-${goldDifference?.style}`}>{goldDifference.goldDifference}</div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <ToastContainer/>
        </div>
    );
}

function getGoldDifference(player: ParticipantWindow, side: string, gameMetadata: GameMetadata, frame: FrameWindow) {
    if(6 > player.participantId) { // blue side
        const redPlayer = frame.redTeam.participants[player.participantId - 1];
        const goldResult = player.totalGold - redPlayer.totalGold;

        return {
            style: goldResult > 0 ? "positive" : "negative",
            goldDifference: goldResult > 0 ? "+" + Number(goldResult).toLocaleString("pt-br") : Number(goldResult).toLocaleString("pt-br")
        };
    }else{
        const bluePlayer = frame.blueTeam.participants[player.participantId - 6];
        const goldResult = player.totalGold - bluePlayer.totalGold;

        return {
            style: goldResult > 0 ? "positive" : "negative",
            goldDifference: goldResult > 0 ? "+" + Number(goldResult).toLocaleString("pt-br") : Number(goldResult).toLocaleString("pt-br")
        };
    }
}

function getDragonSVG(dragonName: string){
    switch (dragonName) {
        case "ocean": return <OceanDragonSVG className="dragon"/>;
        case "infernal": return <InfernalDragonSVG className="dragon"/>
        case "cloud": return <CloudDragonSVG className="dragon"/>
        case "mountain": return <MountainDragonSVG className="dragon"/>
        case "elder": return <ElderDragonSVG className="dragon"/>
    }
}

function getGoldPercentage(goldBlue: number, goldRed: number){
    const total = goldBlue + goldRed;
    return {
        goldBluePercentage: ((goldBlue/ 100) * total),
        goldRedPercentage: ((goldRed/ 100) * total),
    }
}

enum GameState {
    in_game = "ao vivo",
    paused = "pausado",
    finished = "finalizado"
}