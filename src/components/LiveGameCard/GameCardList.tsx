import {GameCard} from "./GameCard";
import {Event} from "./types/liveGameTypes";

import Galaxy from "../../assets/images/galaxy.svg"

type Props = {
    games: Event[];
}

export function GameCardList({ games }: Props) {
    if (games !== undefined && games.length !== 0) {

        return (
            <div className="games-list-container">
                <div className="games-list-items">
                    {games.map(game => (
                        <GameCard
                            key={game.id}
                            game={game}
                        />
                    ))}
                </div>
            </div>
        );

    }else{
        return (
            <div className="empty-games-list-container">
                <img className="empty-games-galaxy" alt="nenhum jogo ao vivo" src={Galaxy}/>
                <h2 className="game-list-items-empty">NENHUM JOGO AO VIVO</h2>
            </div>
        );
    }
}