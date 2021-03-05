export interface Tournament {
    id: string;
}

export interface League {
    id: string;
    slug: string;
    image: string;
    name: string;
}

export interface Strategy {
    count: number;
}

export interface Result {
    gameWins: number;
}

export interface Team {
    id: string;
    name: string;
    code: string;
    image: string;
    result: Result;
}

export interface Team2 {
    id: string;
    side: string;
}

export interface Game {
    number: number;
    id: string;
    state: string;
    teams: Team2[];
    vods: any[];
}

export interface Match {
    strategy: Strategy;
    teams: Team[];
    games: Game[];
}

export interface Stream {
    parameter: string;
    locale: string;
    provider: string;
    countries: string[];
    offset: number;
}

export interface Event {
    id: string;
    type: string;
    tournament: Tournament;
    league: League;
    match: Match;
    streams: Stream[];
}

export interface Data {
    event: Event;
}

export interface GameDetails {
    data: Data;
}