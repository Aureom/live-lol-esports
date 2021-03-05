import {Frame} from "./types/detailsLiveTypes";

type Props = {
    participantId: number,
    lastFrame: Frame
}

export function ItemsDisplay({ participantId, lastFrame }: Props) {

    const itemsID = Array.from(new Set(lastFrame.participants[participantId].items));

    return (
        <div className="player-stats-items">
            {[...Array(7)].map((x, i) => {

                if(itemsID[i] !== undefined) {
                    return (
                        <div className="player-stats-item">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/11.5.1/img/item/${itemsID[i]}.png`}/>
                        </div>
                    )
                }else{
                    return (
                        <div className="player-stats-item"/>
                    )
                }

                })
            }
        </div>
    );
}