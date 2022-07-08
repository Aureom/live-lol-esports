import axios from "axios";

//export const ITEMS_URL = "https://ddragon.leagueoflegends.com/cdn/11.5.1/img/item/"
export const ITEMS_URL = "https://ddragon.bangingheads.net/cdn/latest/img/item/"
export const CHAMPIONS_URL = "https://ddragon.bangingheads.net/cdn/latest/img/champion/"

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
    const date = new Date();
    date.setMilliseconds(0);
  
    if (date.getSeconds() % 10 !== 0) {
      date.setSeconds(date.getSeconds() - (date.getSeconds() % 10));
    }
  
    date.setSeconds(date.getSeconds() - 60);
  
    return date.toISOString();
}
