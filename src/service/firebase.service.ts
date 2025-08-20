// src/service/firestore.service.ts
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    query,
    where,
    serverTimestamp,
    orderBy,
    limit,
    QueryDocumentSnapshot,
    DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {
    Player,
    Game,
    PlayerGame,
    GameHistory,
    PlayerGameDTO,
} from './api.service';

const playersCollection = collection(db, 'Players');
const gamesCollection = collection(db, 'Games');

// Konvertiert ein Firestore-Dokument in ein Player-Objekt
const playerFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Player => {
    const data = doc.data();
    return {
        id: doc.id,
        userId: data.userId,
        username: data.username,
        email: data.email,
        winsCount: 0, // Wird später berechnet
        lossesCount: 0, // Wird später berechnet
        winRate: 0, // Wird später berechnet
        lastWins: [], // Wird später berechnet
        wonBy8Ball: 0, // Wird später berechnet
        lostBy8Ball: 0, // Wird später berechnet
        lostBy8BallPercent: 0, // Wird später berechnet
    };
};

// --- Player-Funktionen ---

export const savePlayer = async (
    userId: string,
    username: string,
    email: string
): Promise<void> => {
    await addDoc(playersCollection, {
        userId,
        username,
        email,
        createdAt: serverTimestamp(),
    });
};

export const fetchPlayerByUserId = async (
    userId: string
): Promise<Player | null> => {
    const q = query(playersCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return playerFromDoc(querySnapshot.docs[0]);
    }
    return null;
};

export const updatePlayer = async (player: Player): Promise<void> => {
    const playerRef = doc(db, 'Players', player.id);
    await updateDoc(playerRef, {
        username: player.username,
        email: player.email,
    });
};

export const checkUsername = async (username: string): Promise<boolean> => {
    const q = query(
        playersCollection,
        where('username', '==', username),
        limit(1)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

// --- Game-Funktionen ---

export const saveGame = async (players: PlayerGame[]): Promise<void> => {
    const playerIds = players.map((p) => p.userId);

    await addDoc(gamesCollection, {
        players: players,
        playerIds: playerIds, // Das neue Feld mit den Spieler-UIDs
        endTime: null,
        createdAt: serverTimestamp(),
    });
};

export const updateGame = async (game: GameHistory): Promise<void> => {
    const gameRef = doc(db, 'Games', game.id);
    const playersData = game.players.map((p) => ({
        userId: p.player.userId,
        team: p.team,
        winner: p.winner,
        endState: p.endState,
    }));

    await updateDoc(gameRef, {
        players: playersData,
        endTime: new Date(),
        endState: game.endState,
    });
};

// --- Kombinierte Abfragen (ersetzen die komplexe Backend-Logik) ---

export const fetchPlayersWithStats = async (): Promise<Player[]> => {
    const playerSnapshot = await getDocs(playersCollection);
    const players = playerSnapshot.docs.map(playerFromDoc);
    const gamesSnapshot = await getDocs(
        query(
            gamesCollection,
            where('endTime', '!=', null),
            orderBy('endTime', 'desc')
        )
    );
    const games = gamesSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Game
    );

    const playerStats: {
        [userId: string]: {
            wins: number;
            losses: number;
            lastWins: boolean[];
            wonBy8Ball: number;
            lostBy8Ball: number;
            lostBy8BallPercent: number;
        };
    } = {};

    players.forEach((p) => {
        playerStats[p.userId] = {
            wins: 0,
            losses: 0,
            lastWins: [],
            wonBy8Ball: 0,
            lostBy8Ball: 0,
            lostBy8BallPercent: 0,
        };
    });

    games.forEach((game) => {
        game.players.forEach((pg) => {
            if (playerStats[pg.userId]) {
                if (pg.winner) {
                    playerStats[pg.userId].wins++;
                } else {
                    playerStats[pg.userId].losses++;
                }
                playerStats[pg.userId].lastWins.push(pg.winner);

                if (pg.endState === 'loss_by_8_ball') {
                    if (pg.winner) {
                        playerStats[pg.userId].wonBy8Ball++;
                    } else {
                        playerStats[pg.userId].lostBy8Ball++;
                    }
                }
            }
        });
    });

    return players
        .map((p) => {
            const stats = playerStats[p.userId];
            const totalGames = stats.wins + stats.losses;
            return {
                ...p,
                winsCount: stats.wins,
                lossesCount: stats.losses,
                winRate:
                    totalGames > 0
                        ? Math.round((stats.wins / totalGames) * 100) / 100
                        : 0,
                lastWins: stats.lastWins,
                wonBy8Ball: stats.wonBy8Ball,
                lostBy8Ball: stats.lostBy8Ball,
                lostBy8BallPercent:
                    stats.lostBy8Ball !== 0
                        ? Math.round((stats.lostBy8Ball / stats.losses) * 100) /
                          100
                        : 0,
            };
        })
        .sort((a, b) => b.winRate - a.winRate);
};

export const fetchGamesWithPlayers = async (): Promise<GameHistory[]> => {
    const gamesSnapshot = await getDocs(
        query(gamesCollection, orderBy('createdAt', 'desc'))
    );
    const games = gamesSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Game
    );

    const allUserIds = [
        ...new Set(games.flatMap((g) => g.players.map((p) => p.userId))),
    ];
    const playersData: { [userId: string]: Player } = {};
    if (allUserIds.length > 0) {
        const playersSnapshot = await getDocs(
            query(playersCollection, where('userId', 'in', allUserIds))
        );
        playersSnapshot.forEach((doc) => {
            const p = playerFromDoc(doc);
            playersData[p.userId] = p;
        });
    }

    return games.map((game) => ({
        id: game.id,
        endTime: game.endTime,
        players: game.players.map((pg) => ({
            player: playersData[pg.userId],
            team: pg.team,
            winner: pg.winner,
            endState: pg.endState,
        })),
    }));
};

/// In src/service/firebase.service.ts

// ... (other imports)

// --- MODIFY THIS FUNCTION ---
/**
 * Finalizes a game by setting a winner, an end state, and an end time.
 * @param gameId The ID of the game to update.
 * @param winningTeam The team number (1 or 2) that won.
 * @param endState A string describing how the game ended (e.g., 'normal', 'loss_by_8_ball').
 */
export const setGameWinner = async (gameId: string, winningTeam: number, endState: string): Promise<void> => {
    const gameRef = doc(db, 'Games', gameId);
    const gameSnap = await getDoc(gameRef);

    if (!gameSnap.exists()) {
        throw new Error("Game not found!");
    }

    const currentPlayers = gameSnap.data().players as PlayerGame[];

    // Create the updated player array with winner and endState status
    const updatedPlayers = currentPlayers.map((player) => ({
        ...player,
        winner: player.team === winningTeam,
        // Set the specific end state for each player
        endState: player.team !== winningTeam && endState === 'loss_by_8_ball' ? 'loss_by_8_ball' : 'normal',
    }));

    // Update the document with the new data
    await updateDoc(gameRef, {
        players: updatedPlayers,
        endState: endState, // Save the overall game end state
        endTime: serverTimestamp(),
    });
};