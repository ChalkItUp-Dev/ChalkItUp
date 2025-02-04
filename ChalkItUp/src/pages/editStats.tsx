import DefaultLayout from '@/layouts/default';
import {
    fetchGamesBetweenPlayers,
    fetchPlayers,
    Game,
    Player,
} from '@/service/api.service';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from '@heroui/table';

import { Tooltip } from '@heroui/tooltip';

function EditStats() {
    const location = useLocation();
    const [gameStats, setGameStats] = useState<Game[]>([]);
    const [player, setPlayer] = useState<Player[]>([]);

    useEffect(() => {
        fetchGamesBetweenPlayers(location.state.p1, location.state.p2).then(
            (stats) => {
                setGameStats(stats);
            }
        );
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
    }, []);

    const findePlayer = (id: number): Player => {
        const p = player.find((x) => id === x.PlayerID);

        if (p) return p;
        return {
            FirstName: '',
            LastName: '',
            PlayerID: 0,
        };
    };

    const player1 = findePlayer(location.state.p1);
    const player2 = findePlayer(location.state.p2);

    const deleteGame = (id: number): void => {};

    return (
        <DefaultLayout>
            <Table
                isStriped
                aria-label="Spieler vs Spieler Statistik"
                className="max-w-[70vw]"
            >
                <TableHeader>
                    <TableColumn className="text-center">
                        {player1.FirstName} vs {player2.FirstName}
                    </TableColumn>
                    <TableColumn className="text-center">Win</TableColumn>
                    <TableColumn className="text-center">Loss</TableColumn>
                    <TableColumn className="text-center">Delete</TableColumn>
                </TableHeader>
                <TableBody>
                    {gameStats.map((game) => (
                        <TableRow key={game.GameID}>
                            <TableCell className="text-center">
                                Spiel {game.GameID}
                            </TableCell>
                            <TableCell className="text-center">
                                {game.Winner === player1.PlayerID
                                    ? player1.FirstName
                                    : player2.FirstName}
                            </TableCell>
                            <TableCell className="text-center">
                                {game.Loser === player1.PlayerID
                                    ? player1.FirstName
                                    : player2.FirstName}
                            </TableCell>
                            <TableCell className="text-center">
                                <Tooltip color="danger" content="Delete user">
                                    <span
                                        className="text-lg text-danger cursor-pointer active:opacity-50"
                                        onClick={() => {
                                            console.log('Delte game');
                                        }}
                                    >
                                        Delete
                                    </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DefaultLayout>
    );
}

export default EditStats;
