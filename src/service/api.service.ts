export interface Player {
    id: string;
    userId: string;
    username: string;
    email: string;
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
}


const API_URL = 'https://chalkitup-backend.onrender.com/api'; //' http://localhost:8080/api';

export const fetchPlayers = async (): Promise<Player[]> => {
    const response = await fetch(`${API_URL}/player/all`);
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Spieler');
    }
    return response.json();
};

export const fetchGames = async (): Promise<Game[]> => {
    const response = await fetch(`${API_URL}/games/all`);
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Spiele');
    }
    return response.json();
};

export const savePlayer = async (
    userId: string,
    username: string,
    email: string
): Promise<void> => {
    const response = await fetch(`${API_URL}/player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, email }),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spielers');
    }
};

export const saveGame = async (
players: PlayerGame[],
): Promise<void> => {
    const response = await fetch(`${API_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ players }),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spiels');
    }
};

export const updateGame = async (
    game: Game,
): Promise<void> => {
    const response = await fetch(`${API_URL}/games`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spiels');
    }
};
//
// export const updatePlayer = async (
//     playerId: string,
//     firstName: string,
//     lastName: string
// ): Promise<void> => {
//     const response = await fetch(`${API_URL}/updateplayer`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ playerId, firstName, lastName }),
//     });
//     if (!response.ok) {
//         throw new Error('Fehler beim Speichern des Spielers');
//     }
// };
