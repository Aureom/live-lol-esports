import './styles/livegameStyle.css'

import {getLiveGames} from "../../LoLEsportsAPI";
import {GameCardList} from "./GameCardList";
import {useEffect, useState} from "react";

import {Event} from "./types/liveGameTypes";

export function LiveGames() {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        getLiveGames().then(response => {
            setEvents(response.data.data.schedule.events.filter(filterByTeams))
        }).catch(error =>
            console.log(error)
        )
    }, [])

    document.title = "LoL Live Esports";

    return (
        <div className="orders-container">
            <GameCardList
                games={events}
            />
        </div>
    );
}

function filterByTeams(event: Event) {
    return event.match !== undefined;
}