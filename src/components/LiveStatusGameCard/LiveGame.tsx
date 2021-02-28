import './playerStatusStyle.css'

import {Redirect} from 'react-router-dom';
import {
    convertISODateToMultiplyOf10,
    getISODateMultiplyOf10,
    getLiveDetailsGame,
    getLiveWindowGame
} from "../../LoLEsportsAPI";
import {useEffect, useState} from "react";
import {GameMetadata, Frame as FrameWindow} from "./types/windowLiveTypes";
import Loading from '../../assets/images/loading.svg'
import {PlayersTable} from "./PlayersTable";
import BigNumber from "bignumber.js";
import {Frame as FrameDetails} from "./types/detailsLiveTypes";

export function LiveGame({ match }: any) {
    const [lastFrameWindow, setLastFrameWindow] = useState<FrameWindow>();
    const [lastFrameDetails, setLastFrameDetails] = useState<FrameDetails>();
    const [metadata, setMetadata] = useState<GameMetadata>();

    const matchId = match.params.gameid;
    const preGameId = new BigNumber(matchId);
    const gameId = BigNumber.sum(preGameId, 1).toString()

    useEffect(() => {
        getLiveWindow();
        getLiveGameStatus();

        const windowIntervalID = setInterval(() => {
            getLiveWindow();
            getLiveGameStatus();
        }, 2000);

        /*const liveIntervalID = setInterval(() => {
            getLiveGameStatus();
        }, 12000);*/

        return () => {
            clearInterval(windowIntervalID);
            //clearInterval(liveIntervalID);
        }

        function getLiveWindow(){

            getLiveWindowGame(gameId, getISODateMultiplyOf10()).then(response => {
                let frames = response.data.frames;
                if(frames === undefined) return;

                setLastFrameWindow(frames[frames.length - 1])
                setMetadata(response.data.gameMetadata)
            }).catch(error => {

                    if (error.response?.status === 400) {
                        let preDate = error.response.data.message.split("current time: ");
                        if (preDate.length > 1) {
                            let date = preDate[1].split('.');
                            date = date[0] + ".000Z"
                            getLiveWindowGame(gameId, convertISODateToMultiplyOf10(date)).then(response => {
                                let frames = response.data.frames;
                                if(frames === undefined) return;

                                setLastFrameWindow(frames[frames.length - 1])
                                setMetadata(response.data.gameMetadata)
                            })
                        }
                    }

                }
            )
        }

        function getLiveGameStatus() {

            getLiveDetailsGame(gameId, getISODateMultiplyOf10()).then(response => {
                let frames = response.data.frames;
                if(frames === undefined) return;

                setLastFrameDetails(frames[frames.length - 1])
            }).catch(error => {

                    if (error.response?.status === 400) {
                        if(error.response.data !== undefined) {
                            let preDate = error.response.data.message.split("current time: ");
                            if (preDate.length > 1) {
                                let date = preDate[1].split('.');
                                date = date[0] + ".000Z"
                                getLiveDetailsGame(gameId, convertISODateToMultiplyOf10(date)).then(response => {
                                    let frames = response.data.frames;
                                    if(frames === undefined) return;

                                    setLastFrameDetails(frames[frames.length - 1])
                                })
                            }
                        }
                    }

                }
            )

        }
    }, [gameId]);

    if(gameId === "0") {
        return (
            <Redirect to="/"/>
        )
    }

    if(lastFrameWindow !== undefined && lastFrameDetails !== undefined && metadata !== undefined) {
        return (
            <PlayersTable lastFrameWindow={lastFrameWindow} lastFrameDetails={lastFrameDetails} gameMetadata={metadata} />
        );
    }else {
        return(
            <div className="loading-game-container">
                <img className="loading-game-image" alt="game loading" src={Loading}/>
            </div>
        )
    }
}