export interface Player {
    id: string;
    userId: string;
    username: string;
    email: string;
    winRate: number;
}

export interface Game {
    id: string;
    winner: string;
    loser: string;
}


const API_URL = 'https://chalkitup-backend.onrender.com/api'; //'http://localhost:3000';

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
    winner: number,
    loser: number
): Promise<void> => {
    const response = await fetch(`${API_URL}/save-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winner, loser }),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spiels');
    }
};

export const updatePlayer = async (
    playerId: string,
    firstName: string,
    lastName: string
): Promise<void> => {
    const response = await fetch(`${API_URL}/updateplayer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, firstName, lastName }),
    });
    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Spielers');
    }
};
