import axios from "axios";

//export const ITEMS_URL = "https://ddragon.leagueoflegends.com/cdn/11.5.1/img/item/";
export const ITEMS_URL = "https://ddragon.bangingheads.net/cdn/11.5.1/img/item/"

const API_URL_PERSISTED = "https://esports-api.lolesports.com/persisted/gw"
const API_URL_LIVE = "https://feed.lolesports.com/livestats/v1"
const API_KEY = "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"

export function getLiveGames() {
    return axios.get(`${API_URL_PERSISTED}/getLive?hl=pt-BR`, {
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getSchedule() {
    return axios.get(`${API_URL_PERSISTED}/getSchedule?hl=pt-BR`, {
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getLiveWindowGame(gameId: string, date: string) {
    return axios.get(`${API_URL_LIVE}/window/${gameId}`, {
        params: {
            "hl": "pt-BR",
            "startingTime": date,
        },
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getLiveDetailsGame(gameId: string, date: string) {
    return axios.get(`${API_URL_LIVE}/details/${gameId}`, {
        params: {
            "hl": "pt-BR",
            "startingTime": date,
        },
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getGameDetails(gameId: string) {
    return axios.get(`${API_URL_PERSISTED}/getEventDetails`, {
        params: {
            "hl": "pt-BR",
            "id": gameId,
        },
        headers: {
            "x-api-key": API_KEY,
        },
    })
}


export function getISODateMultiplyOf10() {
    let date = new Date(Date.now() - 50000);
    date.setMilliseconds(0);

    if(date.getSeconds() % 10 !== 0) {
        date.setSeconds(date.getSeconds() - date.getSeconds() % 10);
    }

    return date.toISOString();
}

/*
message: "disallowed window with end time less than 45 sec old (was 42.99 sec old). requested window:
 [2021-03-29T21:24:00Z, 2021-03-29T21:24:10Z]). current time: 2021-03-29T21:24:52.991277Z"
 */
export function dateFixWindowTime(errorMessage: string) {
    //let secondsToDelay = parseInt(errorMessage.split("disallowed window with end time less than ")[1].split(" sec old")[0]) + 10;
    //let currentTimeString = errorMessage.split("current time: ");

    let secondsToDelay = 55;
    //let date = new Date(currentTimeString[1]);
    let date = new Date(Date.now())
    date.setMilliseconds(0);
    if (date.getSeconds() % 10 !== 0) {
        date.setSeconds(date.getSeconds() - date.getSeconds() % 10);
    }

    if(secondsToDelay % 10 !== 0) {
        date.setSeconds(date.getSeconds() - ( secondsToDelay + (secondsToDelay % 10) ));
    }

    return date.toISOString();
}