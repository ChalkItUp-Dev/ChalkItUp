import React from 'react';
import { GroupedGameSummary } from '../service/api.service';

interface GameSummaryCardProps {
    summary: GroupedGameSummary;
}

const GameSummaryCard: React.FC<GameSummaryCardProps> = ({ summary }) => {
    const teamANames = summary.teamA.players.map(p => p.username);
    const teamBNames = summary.teamB.players.map(p => p.username);
    const totalGames = summary.teamA.wins + summary.teamB.wins;

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 my-2">
            <div className="flex justify-between items-center">
                {/* --- CHANGE: Map over the array to display each name on a new line --- */}
                {/* Team A */}
                <div className={`flex-1 font-semibold text-left pr-2 ${
                    summary.teamA.wins > summary.teamB.wins ? 'text-green-500' :
                        summary.teamA.wins < summary.teamB.wins ? 'text-red-500' :
                            'text-gray-800 dark:text-gray-200'
                }`}>
                    {teamANames.map(name => (
                        <div key={name} className="truncate">{name}</div>
                    ))}
                </div>

                {/* Score */}
                <div className="font-bold text-xl px-4 text-gray-900 dark:text-white whitespace-nowrap">
    <span className={summary.teamA.wins > summary.teamB.wins ? 'text-green-500' : summary.teamA.wins < summary.teamB.wins ? 'text-red-500' : ''}>
        {summary.teamA.wins}
    </span>
                    <span> - </span>
                    <span className={summary.teamB.wins > summary.teamA.wins ? 'text-green-500' : summary.teamB.wins < summary.teamA.wins ? 'text-red-500' : ''}>
        {summary.teamB.wins}
    </span>
                </div>

                {/* Team B */}
                <div className={`flex-1 font-semibold text-right pl-2 ${
                    summary.teamB.wins > summary.teamA.wins ? 'text-green-500' :
                        summary.teamB.wins < summary.teamA.wins ? 'text-red-500' :
                            'text-gray-800 dark:text-gray-200'
                }`}>
                    {teamBNames.map(name => (
                        <div key={name} className="truncate">{name}</div>
                    ))}
                </div>
            </div>
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                {totalGames} {totalGames > 1 ? 'games' : 'game'} played
            </div>
        </div>
    );
};

export default GameSummaryCard;