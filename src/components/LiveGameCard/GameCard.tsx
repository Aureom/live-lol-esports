import {Link} from "react-router-dom";
import {Event} from "./types/liveGameTypes";

type Props = {
    game: Event;
}

export function GameCard({ game }: Props) {
    return (
        <Link to={`live/${game.id}`}>
            <div className="live-game-card">
                <h3>{game.league.name}</h3>

                <div className="live-game-card-content">
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
            </div>
        </Link>
    );
}