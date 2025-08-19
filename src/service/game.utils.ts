// In src/service/game.utils.ts

import { GameHistory, GroupedGameSummary, PlayerGameDTO } from './api.service';

export const groupGamesByMatchup = (games: GameHistory[]): GroupedGameSummary[] => {
    const groupedGamesMap: Map<string, GroupedGameSummary> = new Map();

    // Your Firestore query already sorts games newest-first
    for (const game of games) {
        const team1Players: PlayerGameDTO[] = game.players.filter((p) => p.team === 1);
        const team2Players: PlayerGameDTO[] = game.players.filter((p) => p.team === 2);

        // Skip games that don't have two valid teams
        if (team1Players.length === 0 || team2Players.length === 0) {
            continue;
        }

        // Create a stable, unique ID for the matchup regardless of who was team 1 or 2
        const team1Ids = team1Players.map((p) => p.player.userId).sort();
        const team2Ids = team2Players.map((p) => p.player.userId).sort();

        // Sort the team ID strings to make the matchupId consistent
        const teamIdStrings = [team1Ids.join('|'), team2Ids.join('|')].sort();
        const matchupId = teamIdStrings.join('_VS_');

        // Determine which team won this specific game
        const winnerTeamNum = team1Players.some((p) => p.winner) ? 1 : 2;
        const winningTeamIds = (winnerTeamNum === 1 ? team1Ids : team2Ids).join('|');

        // If this is the first time we see this matchup, initialize its summary object
        if (!groupedGamesMap.has(matchupId)) {
            const isTeam1LexicographicallyFirst = teamIdStrings[0] === team1Ids.join('|');

            groupedGamesMap.set(matchupId, {
                id: matchupId,
                teamA: {
                    players: (isTeam1LexicographicallyFirst ? team1Players : team2Players).map(p => p.player),
                    wins: 0,
                },
                teamB: {
                    players: (isTeam1LexicographicallyFirst ? team2Players : team1Players).map(p => p.player),
                    wins: 0,
                },
                // --- FIX: Removed the line below as game.endTime is not available ---
                // lastPlayed: game.endTime.getTime(),
            });
        }

        // Get the summary for this matchup and update the win count
        const summary = groupedGamesMap.get(matchupId)!;
        const teamAIdsString = summary.teamA.players.map(p => p.userId).sort().join('|');

        if (winningTeamIds === teamAIdsString) {
            summary.teamA.wins += 1;
        } else {
            summary.teamB.wins += 1;
        }
    }

    // Convert the map values to an array. The order is preserved from the sorted games list.
    return Array.from(groupedGamesMap.values());
};