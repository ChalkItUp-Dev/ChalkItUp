import DefaultLayout from '../layouts/default';
import { fetchGames, fetchPlayers, Game, Player } from '../service/api.service';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Progress } from '@heroui/progress';

export default function PlayerPage() {
    const [player, setPlayer] = useState<Player[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetchPlayers().then((player) => {
            setPlayer(player);
            player.forEach(player => player.winRate = winRate(player.userId))
        });
        fetchGames().then((games) => {
            setGames(games);
        });
    }, []);

    const winRate = (playerId: string): number => {
        let wins= games.filter((game) => game.winner === playerId).length;
        let loses = games.filter((game) => game.loser === playerId).length;
        return (wins + loses) > 0 ?  wins / (wins + loses) : 0;
    }

    return (
        <DefaultLayout>
            {player.map((player, index) => {
                return (
                    <div className="flex w-full justify-center " key={index}>
                        <Card
                            className=" max-w-[800px] mb-4 border "
                            fullWidth
                            radius={'sm'}
                            shadow={"none"}
                        >
                            <CardHeader className="flex gap-3">
                                <div className={'w-full'}>
                                    <div className="flex flex-row justify-between w-full items-center">
                                        <p className="text-md font-semibold">
                                            {player.username}
                                        </p>
                                        <p
                                            className={
                                                'text-green-500 text-xl font-semibold'
                                            }
                                        >
                                            {player.winRate}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between w-full items-center">
                                        <p>{games.filter((game) => game.winner === player.userId).length + games.filter((game) => game.winner === player.userId).length} Games</p>
                                        <p> {games.filter((game) => game.winner === player.userId).length}W - {games.filter((game) => game.loser === player.userId).length}L</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <Progress
                                    radius={'sm'}
                                    color={player.winRate > 0.5 ? 'success' : "danger"}
                                    value={player.winRate * 100}
                                />
                                <div
                                    className={
                                        'text-xs flex flex-row items-center mt-2'
                                    }
                                >
                                    Recent:
                                    <div
                                        className={
                                            ' ml-2 rounded-full bg-green-500 w-3 h-3'
                                        }
                                    ></div>
                                    <div
                                        className={
                                            ' ml-1 rounded-full bg-green-500 w-3 h-3'
                                        }
                                    ></div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                );
            })}
        </DefaultLayout>
    );
}
