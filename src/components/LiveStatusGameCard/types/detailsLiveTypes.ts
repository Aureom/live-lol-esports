export interface PerkMetadata {
    styleId: number;
    subStyleId: number;
    perks: number[];
}

export interface Participant {
    participantId: number;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    totalGoldEarned: number;
    creepScore: number;
    killParticipation: number;
    championDamageShare: number;
    wardsPlaced: number;
    wardsDestroyed: number;
    attackDamage: number;
    abilityPower: number;
    criticalChance: number;
    attackSpeed: number;
    lifeSteal: number;
    armor: number;
    magicResistance: number;
    tenacity: number;
    items: number[];
    perkMetadata: PerkMetadata;
    abilities: string[];
}

export interface Frame {
    rfc460Timestamp: Date;
    participants: Participant[];
}

export interface Detais {
    frames: Frame[];
}