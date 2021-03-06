export interface League {
    id: string;
    slug: string;
    name: string;
    image: string;
    priority: number;
}

export interface Result {
    outcome: string;
    gameWins: number;
}

export interface Record {
    wins: number;
    losses: number;
}

export interface Team {
    id: string;
    name: string;
    slug: string;
    code: string;
    image: string;
    result: Result;
    record: Record;
}

export interface Strategy {
    type: string;
    count: number;
}

export interface Match {
    id: string;
    teams: Team[];
    strategy: Strategy;
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
    startTime: Date;
    state: string;
    type: string;
    blockName: string;
    league: League;
    match: Match;
    streams: Stream[];
}

export interface Schedule {
    events: Event[];
}

export interface Data {
    schedule: Schedule;
}

export interface LoLLiveGames {
    data: Data;
}