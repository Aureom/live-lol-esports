import {LiveGameCard} from "./LiveGameCard";
import {ScheduleGameCard} from "./ScheduleGameCard";

import {Event as LiveEvent} from "./types/liveGameTypes";
import {Event as TodayEvent} from "./types/scheduleType";

import Galaxy from "../../assets/images/galaxy.svg"

type Props = {
    liveGames: LiveEvent[];
    todayGames: TodayEvent[];
}

export function GameCardList({ liveGames, todayGames }: Props) {
    return (
        <div>
            <LiveGames liveGames={liveGames}/>

            <div className="games-separator"/>

            <TodayGames todayGames={todayGames}/>
        </div>
    );
}

type PropsLive = {
    liveGames: LiveEvent[];
}

function LiveGames({liveGames}: PropsLive) {
    if (liveGames !== undefined && liveGames.length !== 0) {
        return (
            <div className="games-list-container">
                <div className="games-list-items">
                    {liveGames.map(game => (
                        <LiveGameCard
                            key={game.id}
                            game={game}
                        />
                    ))}
                </div>
            </div>
        );
    }else {
        return (
            <div className="empty-games-list-container">
                <img className="empty-games-galaxy" alt="nenhum jogo ao vivo" src={Galaxy}/>
                <h2 className="game-list-items-empty">NENHUM JOGO AO VIVO</h2>
            </div>
        );
    }
}

type PropsToday = {
    todayGames: TodayEvent[];
}

function TodayGames({todayGames}: PropsToday) {
    if (todayGames !== undefined && todayGames.length !== 0) {

        let date = new Date();

        return (
            <div>
                <h2 className="games-of-day">JOGOS DO DIA</h2>
                <div className="games-list-container">
                    <div className="games-list-items">
                        {todayGames.map(game => (
                            <ScheduleGameCard
                                key={game.match.id}
                                game={game}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div/>
        );
    }
}