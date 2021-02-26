import './playerStatusStyle.css'

import {Redirect} from 'react-router-dom';
import {convertISODateToMultiplyOf10, getISODateMultiplyOf10, getLiveGame} from "../../LoLEsportsAPI";
import {useEffect, useState} from "react";
import {Frame, GameMetadata, Participant} from "./windowLiveTypes";
import {MiniHealthBar} from "./MiniHealthBar";
import { ToastContainer, toast } from 'react-toastify';

export function PlayerCard({ match }: any) {
    const [lastFrame, setLastFrame] = useState<Frame>();
    const [metadata, setMetadata] = useState<GameMetadata>();

    const gameId = match.params.gameid;

    useEffect(() => {
        getLiveGame(gameId, getISODateMultiplyOf10()).then(response => {
            let frames = response.data.frames;
            setLastFrame(frames[frames.length - 1])
            setMetadata(response.data.gameMetadata)
        }).catch(error => {

                if(error.reponse !== undefined) {
                    if (error.response.status === 400) {
                        let preDate = error.response.data.message.split("current time: ");
                        if (preDate.length > 1) {
                            let date = preDate[1].split('.');
                            date = date[0] + ".000Z"
                            getLiveGame(gameId, convertISODateToMultiplyOf10(date)).then(response => {
                                let frames = response.data.frames;
                                setLastFrame(frames[frames.length - 1])
                                setMetadata(response.data.gameMetadata)
                            }).catch(error => {
                                    console.log(error)
                                }
                            )
                        }
                    }
                }

            }
        )

        const intervalId = setInterval(() => {
            getLiveGame(gameId, getISODateMultiplyOf10()).then(response => {
                let frames = response.data.frames;
                setLastFrame(frames[frames.length - 1])
                setMetadata(response.data.gameMetadata)
            }).catch(error => {

                    if(error.reponse !== undefined) {
                        if (error.response.status === 400) {
                            let preDate = error.response.data.message.split("current time: ");
                            if (preDate.length > 1) {
                                let date = preDate[1].split('.');
                                date = date[0] + ".000Z"
                                getLiveGame(gameId, convertISODateToMultiplyOf10(date)).then(response => {
                                    let frames = response.data.frames;
                                    setLastFrame(frames[frames.length - 1])
                                    setMetadata(response.data.gameMetadata)
                                }).catch(error => {
                                        console.log(error)
                                    }
                                )
                            }
                        }
                    }

                }
            )
        }, 3000);

        return () => clearInterval(intervalId);
    }, [gameId]);

    if(gameId === "0") {
        return (
            <Redirect to="/"/>
        )
    }

    if(lastFrame !== undefined && metadata !== undefined) {
        return (
            <div className="status-live-game-card">
                <div className="status-live-game-card-content">
                    <div className="live-game-stats-header"></div>

                    <table className="status-live-game-card-table">
                        <thead>
                        <tr>
                            <th className="table-top-row-champion" title="champion/team"/>
                            <th className="table-top-row-vida" title="life">
                                <span>VIDA</span>
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
                        {lastFrame.blueTeam.participants.map(player => {
                            let goldDifference = getGoldDifference(player, "blue", metadata, lastFrame);
                            console.log(goldDifference);

                            return (
                                <tr>
                                    <th>
                                        <div className="player-champion-info">
                                            <img
                                                src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${metadata.blueTeamMetadata.participantMetadata[player.participantId - 1].championId}.png`}
                                                className="player-champion"
                                                alt="imagem do campeao"/>
                                            <span className=" player-champion-info-level">{player.level}</span>
                                            <div className=" player-champion-info-name">
                                                <span>{metadata.blueTeamMetadata.participantMetadata[player.participantId - 1].championId}</span>
                                                <span
                                                    className=" player-card-player-name">{metadata.blueTeamMetadata.participantMetadata[player.participantId - 1].summonerName}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <MiniHealthBar currentHealth={player.currentHealth}
                                                       maxHealth={player.maxHealth}/>
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
                            <th className="table-top-row-champion" title="champion/team"/>
                            <th className="table-top-row-vida" title="life">
                                <span>VIDA</span>
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
                        {lastFrame.redTeam.participants.map(player => {
                            let goldDifference = getGoldDifference(player, "red", metadata, lastFrame);
                            console.log(goldDifference);

                            return(
                                <tr>
                                    <th>
                                        <div className="player-champion-info">
                                            <img
                                                src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${metadata.redTeamMetadata.participantMetadata[player.participantId - 6].championId}.png`}
                                                className="player-champion"
                                                alt="imagem do campeao"/>
                                            <span className=" player-champion-info-level">{player.level}</span>
                                            <div className=" player-champion-info-name">
                                                <span>{metadata.redTeamMetadata.participantMetadata[player.participantId - 6].championId}</span>
                                                <span className=" player-card-player-name">{metadata.redTeamMetadata.participantMetadata[player.participantId - 6].summonerName}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <MiniHealthBar currentHealth={player.currentHealth} maxHealth={player.maxHealth}/>
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
    }else {
        return(
            <div></div>
        )
    }
}

function getGoldDifference(player: Participant, side: string, metadata: GameMetadata, frame: Frame) {
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