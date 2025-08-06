import DefaultLayout from '../layouts/default';
import { fetchPlayers, Player } from '../service/api.service';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Progress } from '@heroui/progress';

export interface PlayerStats {
    win: number;
    lose: number;
    winRate: number;
}

export default function PlayerPage() {
    const [player, setPlayer] = useState<Player[]>([]);

    useEffect(() => {
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
    }, []);

    return (
        <DefaultLayout title={'Player Stats'}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {player.map((player, index) => {
                    return (
                        <Card
                            className="mb-4 border-none shadow-lg dark:bg-zinc-900"
                            key={index}
                            radius={'sm'}
                            shadow={'none'}
                        >
                            <CardHeader className="flex gap-3">
                                <div className={'w-full'}>
                                    <div className="flex flex-row justify-between w-full items-center">
                                        <p className="text-xl font-bold">
                                            {player.username}
                                        </p>
                                        <p
                                            className={
                                                'text-success text-lg font-semibold'
                                            }
                                        >
                                            {(player.winRate * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between w-full items-center text-sm text-zinc-500">
                                        <p>
                                            {player.winsCount +
                                                player.lossesCount}{' '}
                                            Game(s)
                                        </p>
                                        <p>
                                            {player.winsCount}W -{' '}
                                            {player.lossesCount}L
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <Progress
                                    aria-label={'WinRate'}
                                    radius={'sm'}
                                    color={
                                        0.49 < player.winRate
                                            ? 'success'
                                            : 'danger'
                                    }
                                    value={player.winRate * 100}
                                />

                                <div
                                    className={
                                        'flex flex-row items-center mt-4'
                                    }
                                >
                                    <div className={'text-xs mr-2'}>
                                        Recent:
                                    </div>
                                    <div
                                        className={
                                            'flex flex-row items-center center h-full gap-1.5'
                                        }
                                    >
                                        {player.lastWins
                                            .slice(0, 10)
                                            .map((game, index) => {
                                                return (
                                                    <div
                                                        key={game + ' ' + index}
                                                        className={
                                                            game
                                                                ? 'rounded-full bg-success w-4 h-4'
                                                                : 'rounded-full bg-danger w-4 h-4'
                                                        }
                                                    ></div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </DefaultLayout>
    );
}
