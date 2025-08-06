export interface Player {
    id: string;
    userId: string;
    username: string;
    email: string;
    winsCount: number;
    lossesCount: number;
    winRate: number;
    lastWins: boolean[];
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

export interface GameHistory {
    id: string;
    players: PlayerGameDTO[];
    endTime: Date;
}

export interface PlayerGameDTO {
    player: Player;
    team: number;
    winner: boolean;
}

const API_URL = 'https://chalkitup-backend.onrender.com/api'; //' http://localhost:8080/api  ';

const fetchWithSpinner = async (url: string, options?: RequestInit) => {
    window.dispatchEvent(new CustomEvent('request-start'));
    try {
        const response = await fetch(url, options);
        return response;
    } finally {
        window.dispatchEvent(new CustomEvent('request-end'));
    }
};

export const fetchPlayers = async (): Promise<Player[]> => {
    const response = await fetchWithSpinner(`${API_URL}/player/all`);
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Spieler');
    }
    return response.json();
};

export const fetchPlayer = async (userId: string): Promise<Player> => {
    const response = await fetchWithSpinner(`${API_URL}/player/` + userId);
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Spieler');
    }
    return response.json();
};

export const checkUsername = async (username: string): Promise<string> => {
    if (!username) return '';
    const response = await fetchWithSpinner(
        `${API_URL}/player/check-username/` + username
    );
    if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Spieler');
    }
    return response.text();
};

export const fetchGames = async (): Promise<GameHistory[]> => {
    const response = await fetchWithSpinner(`${API_URL}/games/all`);
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
    const response = await fetchWithSpinner(`${API_URL}/player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, email }),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spielers');
    }
};

export const saveGame = async (players: PlayerGame[]): Promise<void> => {
    const response = await fetchWithSpinner(`${API_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ players }),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spiels');
    }
};

export const updateGame = async (game: GameHistory): Promise<void> => {
    console.log(game);
    const response = await fetchWithSpinner(`${API_URL}/games`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spiels');
    }
};

export const updatePlayer = async (player: Player): Promise<void> => {
    const response = await fetchWithSpinner(`${API_URL}/player`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player),
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
