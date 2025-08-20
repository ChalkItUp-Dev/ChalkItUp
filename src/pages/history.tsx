// In your HistoryPage.tsx file

import DefaultLayout from '../layouts/default';
import { Player, PlayerGame, GroupedGameSummary, GameHistory } from '../service/api.service';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Tooltip } from '@heroui/react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { Select, SelectItem } from '@heroui/react';
import {
    fetchPlayersWithStats,
    fetchGamesWithPlayers,
    saveGame,
    setGameWinner, // --- IMPORT THE NEW FUNCTION ---
} from '../service/firebase.service';

import { groupGamesByMatchup } from '../service/game.utils';
import GameSummaryCard from '../components/GameCardSummary';
import ActiveGameCard from '../components/ActiveGameCard'; // --- IMPORT THE NEW COMPONENT ---

export default function HistoryPage() {
    const [players, setPlayers] = useState<Player[]>([]);

    // --- STATE CHANGE: Manage two separate lists ---
    const [activeGames, setActiveGames] = useState<GameHistory[]>([]);
    const [groupedGames, setGroupedGames] = useState<GroupedGameSummary[]>([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        fetchData();
    }, []);

    const [team1, setTeam1] = useState<string[]>([]);
    const [team2, setTeam2] = useState<string[]>([]);

    const handleSelectionChangeForTeam1 = (e: ChangeEvent<HTMLSelectElement>) => {
        setTeam1(e.target.value.split(',').filter(v => v));
    };

    const handleSelectionChangeForTeam2 = (e: ChangeEvent<HTMLSelectElement>) => {
        setTeam2(e.target.value.split(',').filter(v => v));
    };

    // --- LOGIC CHANGE: Split games into active and finished ---
    const fetchData = () => {
        fetchPlayersWithStats().then((playerData) => {
            setPlayers(playerData);
        });

        fetchGamesWithPlayers().then((gameData) => {
            // A game is active if its endTime is null
            const unfinished = gameData.filter(game => !game.endTime);
            const finished = gameData.filter(game => !!game.endTime);

            setActiveGames(unfinished);

            const grouped = groupGamesByMatchup(finished);
            setGroupedGames(grouped);
        });
    };

    /// --- UPDATE THIS HANDLER to accept the new endState parameter ---
    const handleSetWinner = (gameId: string, winningTeam: number, endState: string) => {
        setGameWinner(gameId, winningTeam, endState).then(() => {
            fetchData(); // Refresh the data to move the game to history
        });
    };

    const startNewGame = () => {
        if (team1.length === 0 || team2.length === 0) return;

        const playersForGame: PlayerGame[] = [
            ...team1.map((p) => ({ userId: p, team: 1, winner: false })),
            ...team2.map((p) => ({ userId: p, team: 2, winner: false })),
        ];

        saveGame(playersForGame).then(() => fetchData());
    };

    return (
        <DefaultLayout title={'Games'}>
            {/* --- RENDER ACTIVE GAMES --- */}
            {activeGames.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Active Games</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-8">
                        {activeGames.map((game) => (
                            <div className="flex w-full justify-center" key={game.id}>
                                <ActiveGameCard game={game} onSetWinner={handleSetWinner} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* --- RENDER GAME HISTORY --- */}
            {groupedGames.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">History</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-8">
                        {groupedGames.map((summary) => (
                            <div className="flex w-full justify-center" key={summary.id}>
                                <GameSummaryCard summary={summary} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* --- Floating Action Button and Modal remain the same --- */}
            <div className="fixed bottom-24 right-4">
                <Tooltip content="Create new Game">
                    <Button className="rounded-full shadow-xl bg-green-500 font-bold text-xl" isIconOnly onPress={onOpen}>
                        <i className="fa-solid fa-plus"></i>
                    </Button>
                </Tooltip>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius={'sm'}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Start new game</ModalHeader>
                            <ModalBody className="h-60">
                                <Form>
                                    <Select
                                        className="mb-6"
                                        label="Select Players for Team 1"
                                        selectionMode="multiple"
                                        isRequired
                                        onChange={handleSelectionChangeForTeam1}
                                    >
                                        {players.map((p) => (
                                            <SelectItem key={p.userId} value={p.userId}>
                                                {p.username}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        className="mb-6"
                                        label="Select Players for Team 2"
                                        selectionMode="multiple"
                                        isRequired
                                        onChange={handleSelectionChangeForTeam2}
                                    >
                                        {players.map((p) => (
                                            <SelectItem key={p.userId} value={p.userId}>
                                                {p.username}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </Form>
                                <div>
                                    <Button
                                        color={'success'}
                                        variant={'flat'}
                                        fullWidth
                                        disabled={team1.length === 0 || team2.length === 0}
                                        type={'submit'}
                                        onPress={() => {
                                            startNewGame();
                                            onClose();
                                        }}
                                    >
                                        Start Game
                                    </Button>
                                </div>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </DefaultLayout>
    );
}