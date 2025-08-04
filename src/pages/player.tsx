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
            {player.map((player, index) => {
                return (
                    <div className="flex w-full justify-center " key={index}>
                        <Card
                            className=" max-w-[800px] mb-4 border "
                            fullWidth
                            radius={'sm'}
                            shadow={'none'}
                        >
                            <CardHeader className="flex gap-3">
                                <div className={'w-full'}>
                                    <div className="flex flex-row justify-between w-full items-center">
                                        <p className="text-md font-semibold">
                                            {player.username}
                                        </p>
                                        <p
                                            className={
                                                'text-success text-xl font-semibold'
                                            }
                                        >
                                            {player.winRate}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between w-full items-center">
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
                                        'flex flex-row items-center mt-2'
                                    }
                                >
                                    <div className={'text-xs'}>Recent:</div>
                                    <div
                                        className={
                                            'flex flex-row items-center center h-full'
                                        }
                                    >
                                        {player.lastWins.slice(0, 15).map((game, index) => {
                                            return (
                                                <div
                                                    key={game + ' ' + index}
                                                    className={
                                                        game
                                                            ? ' ml-1 rounded-full bg-success w-3 h-3'
                                                            : ' ml-1 rounded-full bg-danger w-3 h-3'
                                                    }
                                                ></div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                );
            })}
        </DefaultLayout>
    );
}
