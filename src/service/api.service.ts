export interface Player {
    id: string;
    userId: string;
    username: string;
    email: string;
    winsCount: number;
    lossesCount: number;
    winRate: number;
    lastWins: boolean[];
    wonBy8Ball: number;
    lostBy8Ball: number;
    lostBy8BallPercent: number;
}

export interface Game {
    id: string;
    players: PlayerGame[];
    endTime: Date;
    createdAt: Date;
}

export interface PlayerGame {
    userId: string;
    team: number;
    winner: boolean;
    endState?: 'win' | 'loss_by_8_ball';
}

export interface GameHistory {
    id: string;
    players: PlayerGameDTO[];
    endTime: Date;
    endState?: 'win' | 'loss_by_8_ball';
}

export interface PlayerGameDTO {
    player: Player;
    team: number;
    winner: boolean;
    endState?: 'win' | 'loss_by_8_ball';
}
