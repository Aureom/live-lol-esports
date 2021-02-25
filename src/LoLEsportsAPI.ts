import axios from "axios";

const API_URL_PERSISTED = "https://esports-api.lolesports.com/persisted/gw/"
const API_URL_LIVE = "https://feed.lolesports.com/livestats/v1"
const API_KEY = "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"

export function getLiveGames() {
    return axios.get(`${API_URL_PERSISTED}getLive?hl=pt-BR`, {
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getLiveGame(gameId: string) {
    return axios.get(`${API_URL_LIVE}/window/${gameId}`, {
        params: {
            "hl": "pt-BR",
            "startingTime": getISODateMultiplyOf10(),
        },
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

function getISODateMultiplyOf10() {
    let date = new Date(Date.now() - 16000);
    date.setMilliseconds(0);

    if(date.getSeconds() % 10 !== 0) {
        date.setSeconds(date.getSeconds() - date.getSeconds() % 10);
    }

    return date.toISOString();
}