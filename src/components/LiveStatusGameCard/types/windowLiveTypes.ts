export interface ParticipantMetadata {
    participantId: number;
    esportsPlayerId: string;
    summonerName: string;
    championId: string;
    role: string;
}

export interface BlueTeamMetadata {
    esportsTeamId: string;
    participantMetadata: ParticipantMetadata[];
}

export interface RedTeamMetadata {
    esportsTeamId: string;
    participantMetadata: ParticipantMetadata[];
}

export interface GameMetadata {
    patchVersion: string;
    blueTeamMetadata: BlueTeamMetadata;
    redTeamMetadata: RedTeamMetadata;
}

export interface Participant {
    participantId: number;
    totalGold: number;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    creepScore: number;
    currentHealth: number;
    maxHealth: number;
}

export interface BlueTeam {
    totalGold: number;
    inhibitors: number;
    towers: number;
    barons: number;
    totalKills: number;
    dragons: string[];
    participants: Participant[];
}

export interface RedTeam {
    totalGold: number;
    inhibitors: number;
    towers: number;
    barons: number;
    totalKills: number;
    dragons: string[];
    participants: Participant[];
}

export interface Frame {
    rfc460Timestamp: Date;
    gameState: string;
    blueTeam: BlueTeam;
    redTeam: RedTeam;
}

export interface WindowLive {
    esportsGameId: string;
    esportsMatchId: string;
    gameMetadata: GameMetadata;
    frames: Frame[];
}