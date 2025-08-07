import DefaultLayout from '../layouts/default';
import { fetchPlayers, Player } from '../service/api.service';
import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Progress } from '@heroui/progress';
import { FaCrown, FaArrowTrendDown, FaFire } from 'react-icons/fa6';

export default function PlayerPage() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        fetchPlayers().then((player) => {
            const sortedPlayers = player.sort((a, b) => b.winRate - a.winRate);
            setPlayers(sortedPlayers);
        });
    }, []);

    const calculateWinStreak = (lastWins: boolean[]): number => {
        let streak = 0;
        for (let i = 0; i < lastWins.length; i++) {
            if (lastWins[i]) {
                streak++;
            } else {
                break; // Streak is broken
            }
        }
        return streak;
    };

    const stats = useMemo(() => {
        if (players.length === 0) {
            return {
                bestWinRatePlayer: null,
                worstWinRatePlayer: null,
                highestWinStreakPlayer: null,
                highestWinStreak: 0,
            };
        }

        const bestWinRatePlayer = players.reduce((prev, current) =>
            prev.winRate > current.winRate ? prev : current
        );

        const worstWinRatePlayer = players.reduce((prev, current) =>
            prev.winRate < current.winRate ? prev : current
        );

        let highestWinStreak = 0;
        let highestWinStreakPlayer: Player | null = players[0];

        players.forEach((player) => {
            const currentStreak = calculateWinStreak(player.lastWins);
            if (currentStreak > highestWinStreak) {
                highestWinStreak = currentStreak;
                highestWinStreakPlayer = player;
            }
        });

        return {
            bestWinRatePlayer,
            worstWinRatePlayer,
            highestWinStreakPlayer,
            highestWinStreak,
        };
    }, [players]);

    return (
        <DefaultLayout title={'Player Stats'}>
            {/* Summary Cards Section */}
            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Best Win Rate Card */}
                {stats.bestWinRatePlayer && (
                    <Card className="border-none shadow-lg dark:bg-zinc-900">
                        <CardHeader className="flex items-center gap-3 p-4">
                            <FaCrown className="text-yellow-400" size={24} />
                            <h3 className="text-lg font-semibold">
                                Best Win Rate
                            </h3>
                        </CardHeader>
                        <Divider />
                        <CardBody className="pt-0 px-4 pb-4">
                            <p className="text-2xl font-bold">
                                {stats.bestWinRatePlayer.username}
                            </p>
                            <p className="text-success text-xl">
                                {(
                                    stats.bestWinRatePlayer.winRate * 100
                                ).toFixed(0)}
                                %
                            </p>
                        </CardBody>
                    </Card>
                )}
                {/* Highest Win Streak Card */}
                {stats.highestWinStreakPlayer && (
                    <Card className="border-none shadow-lg dark:bg-zinc-900">
                        <CardHeader className="flex items-center gap-3 p-4">
                            <FaFire className="text-orange-500" size={24} />
                            <h3 className="text-lg font-semibold">
                                Longest Win Streak
                            </h3>
                        </CardHeader>
                        <Divider />
                        <CardBody className="pt-0 px-4 pb-4">
                            <p className="text-2xl font-bold">
                                {stats.highestWinStreakPlayer.username}
                            </p>
                            <p className="text-orange-500 text-xl">
                                {stats.highestWinStreak} Win(s)
                            </p>
                        </CardBody>
                    </Card>
                )}
                {/* Worst Win Rate Card */}
                {stats.worstWinRatePlayer && (
                    <Card className="border-none shadow-lg dark:bg-zinc-900">
                        <CardHeader className="flex items-center gap-3 p-4">
                            <FaArrowTrendDown
                                className="text-danger"
                                size={24}
                            />
                            <h3 className="text-lg font-semibold">
                                Lowest Win Rate
                            </h3>
                        </CardHeader>
                        <Divider />
                        <CardBody className="pt-0 px-4 pb-4">
                            <p className="text-2xl font-bold">
                                {stats.worstWinRatePlayer.username}
                            </p>
                            <p className="text-danger text-xl">
                                {(
                                    stats.worstWinRatePlayer.winRate * 100
                                ).toFixed(0)}
                                %
                            </p>
                        </CardBody>
                    </Card>
                )}
            </div>

            <Divider className="my-8" />

            {/* All Players List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {players.map((player, index) => {
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
                                            Win Rate
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
