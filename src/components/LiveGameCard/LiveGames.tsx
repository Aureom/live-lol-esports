import './livegameStyle.css'

import {getLiveGames} from "../../LoLEsportsAPI";
import {GameCardList} from "./GameCardList";
import {useEffect, useState} from "react";

import {Event} from "./liveGameTypes";

export function LiveGames() {
    const [events, setEvents] = useState<Event[]>([])

    /*useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(error => toast("Ocorreu um erro ao carregar os produtos " + error.id))
    }, [])*/

    useEffect(() => {
        getLiveGames().then(response => {
            setEvents(response.data.data.schedule.events.filter(filterByTeams))
        }).catch(error =>
            console.log(error)
        )
    }, [])


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