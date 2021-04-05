import './styles/livegameStyle.css'

import {getLiveGames, getSchedule} from "../../utils/LoLEsportsAPI";
import {GameCardList} from "./GameCardList";
import {useEffect, useState} from "react";

import {Event as LiveEvents} from "./types/liveGameTypes";
import {Event as TodayEvent} from "./types/scheduleType";

export function LiveGames() {
    const [liveEvents, setLiveEvents] = useState<LiveEvents[]>([])
    const [todayEvents, setTodayEvents] = useState<TodayEvent[]>([])


    useEffect(() => {
        getLiveGames().then(response => {
            setLiveEvents(response.data.data.schedule.events.filter(filterByTeams))
        }).catch(error =>
            console.error(error)
        )

        getSchedule().then(response => {
            setTodayEvents(response.data.data.schedule.events.filter(filterByTodayDate));

        }).catch(error =>
            console.error(error)
        )
    }, [])

    document.title = "LoL Live Esports";

    return (
        <div className="orders-container">
            <GameCardList
                liveGames={liveEvents} todayGames={todayEvents}
            />
        </div>
    );
}

function filterByTeams(event: LiveEvents) {
    return event.match !== undefined;
}

let date = new Date(Date.now());
function filterByTodayDate(event: TodayEvent) {
    let eventDate = event.startTime.toString().split("T")[0].split("-");

    if(parseInt(eventDate[0]) === date.getFullYear() &&
        parseInt(eventDate[1]) === (date.getUTCMonth() + 1) &&
        parseInt(eventDate[2]) === date.getDate()){

        if(event.match === undefined) return false
        if(event.match.id === undefined) return false

        return true;
    }else{
        return false;
    }
}