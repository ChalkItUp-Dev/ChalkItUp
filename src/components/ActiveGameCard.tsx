// In src/components/ActiveGameCard.tsx

import React from 'react';
import { GameHistory } from '../service/api.service';
import { Button } from '@heroui/react';

interface ActiveGameCardProps {
    game: GameHistory;
    onSetWinner: (gameId: string, winningTeam: number) => void;
}

const ActiveGameCard: React.FC<ActiveGameCardProps> = ({ game, onSetWinner }) => {
    const team1Players = game.players.filter(p => p.team === 1);
    const team2Players = game.players.filter(p => p.team === 2);

    const team1Names = team1Players.map(p => p.player.username);
    const team2Names = team2Players.map(p => p.player.username);

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 my-2">
            {/* Player Names */}
            <div className="flex justify-between items-center text-center mb-4">
                <div className="flex-1 font-semibold text-gray-800 dark:text-gray-200">
                    {team1Names.map(name => <div key={name}>{name}</div>)}
                </div>
                <div className="px-4 text-gray-500 dark:text-gray-400">vs</div>
                <div className="flex-1 font-semibold text-gray-800 dark:text-gray-200">
                    {team2Names.map(name => <div key={name}>{name}</div>)}
                </div>
            </div>

            {/* Winner Selection Buttons */}
            <div className="flex justify-between items-center gap-4 mt-4">
                <Button
                    color="success"
                    variant="flat"
                    onPress={() => onSetWinner(game.id, 1)}
                    fullWidth
                >
                    Team 1 Wins
                </Button>
                <Button
                    color="success"
                    variant="flat"
                    onPress={() => onSetWinner(game.id, 2)}
                    fullWidth
                >
                    Team 2 Wins
                </Button>
            </div>
        </div>
    );
};

export default ActiveGameCard;