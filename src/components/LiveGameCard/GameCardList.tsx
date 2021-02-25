import {GameCard} from "./GameCard";
import {Event} from "./liveGameTypes";

import Galaxy from "../../assets/images/galaxy.svg"
import BigNumber from "bignumber.js";

type Props = {
    games: Event[];
}

export function GameCardList({ games }: Props) {
    if (games !== undefined && games.length !== 0) {
        const matchId = new BigNumber("105562692794240187");
        const gameId = BigNumber.sum(matchId, 1)

        return (
            <div className="games-list-container">
                <div className="games-list-items">
                    {games.map(game => (
                        <GameCard
                            key={gameId.toString()}
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