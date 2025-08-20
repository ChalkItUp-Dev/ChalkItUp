// In src/components/ActiveGameCard.tsx

import React, { useState } from 'react'; // --- import useState ---
import { GameHistory } from '../service/api.service';
import { Button } from '@heroui/react';

interface ActiveGameCardProps {
    game: GameHistory;
    onSetWinner: (gameId: string, winningTeam: number, endState: string) => void;
}

const ActiveGameCard: React.FC<ActiveGameCardProps> = ({ game, onSetWinner }) => {
    // --- STATE to manage which team is being declared the winner ---
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

    const team1Players = game.players.filter(p => p.team === 1);
    const team2Players = game.players.filter(p => p.team === 2);

    const team1Names = team1Players.map(p => p.player.username);
    const team2Names = team2Players.map(p => p.player.username);

    // --- Render function for the win condition buttons ---
    const renderWinConditionButtons = () => {
        if (!selectedTeam) return null;

        return (
            <div className="flex flex-col w-full gap-2 mt-4">
                <h3 className="text-center font-semibold dark:text-white mb-2">
                    How did Team {selectedTeam} win?
                </h3>
                <div className="flex justify-between items-center gap-4">
                    <Button
                        color="success"
                        variant="solid"
                        fullWidth
                        onPress={() => onSetWinner(game.id, selectedTeam, 'normal')}
                    >
                        Standard Win
                    </Button>
                    <Button
                        color="success"
                        variant="flat"
                        fullWidth
                        onPress={() => onSetWinner(game.id, selectedTeam, 'loss_by_8_ball')}
                    >
                        Opponent 8-Ball Foul
                    </Button>
                </div>
                <Button size="sm" variant="light" onPress={() => setSelectedTeam(null)}>
                    Back
                </Button>
            </div>
        );
    };

    // --- Render function for the initial team selection ---
    const renderTeamSelectionButtons = () => {
        return (
            <div className="flex justify-between items-center gap-4 mt-4">
                <Button fullWidth onPress={() => setSelectedTeam(1)}>
                    Team 1 Wins
                </Button>
                <Button fullWidth onPress={() => setSelectedTeam(2)}>
                    Team 2 Wins
                </Button>
            </div>
        );
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 my-2">
            {/* Player Names */}
            <div className="flex justify-between items-center text-center">
                <div className="flex-1 font-semibold text-gray-800 dark:text-gray-200">
                    {team1Names.map(name => <div key={name}>{name}</div>)}
                </div>
                <div className="px-4 text-gray-500 dark:text-gray-400">vs</div>
                <div className="flex-1 font-semibold text-gray-800 dark:text-gray-200">
                    {team2Names.map(name => <div key={name}>{name}</div>)}
                </div>
            </div>

            {/* --- Winner Selection: Conditionally render the correct buttons --- */}
            {selectedTeam ? renderWinConditionButtons() : renderTeamSelectionButtons()}
        </div>
    );
};

export default ActiveGameCard;