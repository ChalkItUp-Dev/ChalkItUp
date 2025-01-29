export interface Player {
  PlayerID: number;
  FirstName: string;
  LastName: string;
}

export interface Game {
  GameID: number;
  Winner: number;
  Loser: number;
}

const API_URL = "https://chalkitupserver.onrender.com";

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await fetch(`${API_URL}/players`);
  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Spieler");
  }
  return response.json();
};

export const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch(`${API_URL}/games`);
  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Spiele");
  }
  return response.json();
};

export const savePlayer = async (
  firstName: string,
  lastName: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/save-player`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName }),
  });
  if (!response.ok) {
    throw new Error("Fehler beim Speichern des Spielers");
  }
};

export const saveGame = async (
  winner: number,
  loser: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/save-game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ winner, loser }),
  });
  if (!response.ok) {
    throw new Error("Fehler beim Speichern des Spiels");
  }
};
