import {Link} from "react-router-dom";
import {Event} from "./liveGameTypes";
import BigNumber from "bignumber.js";

type Props = {
    game: Event;
}

export function GameCard({ game }: Props) {
    const matchId = new BigNumber(game.id);
    const gameId = BigNumber.sum(matchId, 1).toString()

    return (
        <Link to={`live/${gameId}`}>
            <div className="live-game-card">
                <div className="live-game-card-team">
                    <img className="live-game-card-team-image" src={game.match.teams[0].image}
                         alt={game.match.teams[0].name}/>
                    <span className="live-game-card-title">
                        {game.match.teams[0].name}
                    </span>
                </div>

                <h1>VS</h1>

                <div className="live-game-card-team">
                    <img className="live-game-card-team-image" src={game.match.teams[1].image}
                         alt={game.match.teams[1].name}/>
                    <span className="live-game-card-title">
                        {game.match.teams[1].name}
                    </span>
                </div>
            </div>
        </Link>
    );
}