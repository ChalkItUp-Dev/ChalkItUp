import DefaultLayout from '../layouts/default';
import { Player } from '../service/api.service';
import { fetchPlayersWithStats } from '../service/firebase.service';
import { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Progress } from '@heroui/progress';

const StatCard = ({
    title,
    value,
    icon,
    playerName,
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    playerName: string;
}) => (
    <Card className="mb-4 border-none shadow-lg dark:bg-zinc-900 text-center">
        <CardHeader className="flex flex-col items-center justify-center">
            {icon}
            <p className="text-lg font-semibold">{title}</p>
        </CardHeader>
        <Divider />
        <CardBody>
            <p className="text-2xl font-bold">{playerName}</p>
            <p className="text-md text-zinc-500">{value}</p>
        </CardBody>
    </Card>
);

export default function PlayerPage() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        fetchPlayersWithStats().then((players) => {
            setPlayers(players);
        });
    }, []);

    const getHighestWinStreak = (players: Player[]) => {
        let highestStreak = 0;
        let playerWithHighestStreak: Player | null = null;

        players.forEach((player) => {
            let currentStreak = 0;
            console.log(player);
            for (const win of player.lastWins) {
                if (win) {
                    currentStreak++;
                } else {
                    if (currentStreak > highestStreak) {
                        highestStreak = currentStreak;
                        playerWithHighestStreak = player;
                    }
                    currentStreak = 0;
                    break;
                }
            }
            if (currentStreak > highestStreak) {
                highestStreak = currentStreak;
                playerWithHighestStreak = player;
            }
        });

        return { player: playerWithHighestStreak, streak: highestStreak };
    };

    const getHighestWinStreakAllTime = (players: Player[]) => {
        let highestStreak = 0;
        let playerWithHighestStreak: Player | null = null;

        players.forEach((player) => {
            let currentStreak = 0;
            console.log(player);
            for (const win of player.lastWins) {
                if (win) {
                    currentStreak++;
                } else {
                    if (currentStreak > highestStreak) {
                        highestStreak = currentStreak;
                        playerWithHighestStreak = player;
                    }
                    currentStreak = 0;
                }
            }
            if (currentStreak > highestStreak) {
                highestStreak = currentStreak;
                playerWithHighestStreak = player;
            }
        });

        return { player: playerWithHighestStreak, streak: highestStreak };
    };

    const stats = useMemo(() => {
        if (players.length === 0) {
            return {
                bestWinRatePlayer: null,
                worstWinRatePlayer: null,
                highestWinStreak: { player: null, streak: 0 },
                mostlostBy8Ball: null,
            };
        }

        const sortedByWinRate = [...players]
            .filter((x) => x.winsCount + x.lossesCount !== 0)
            .sort((a, b) => b.winRate - a.winRate || b.winsCount - a.winsCount);
        const bestWinRatePlayer = sortedByWinRate[0];
        const worstWinRatePlayer = sortedByWinRate[sortedByWinRate.length - 1];
        const highestWinStreak = getHighestWinStreak(players);
        const sortedBy8BallWins = sortedByWinRate.sort(
            (a, b) => (b.lostBy8Ball || 0) - (a.lostBy8Ball || 0)
        );
        const mostlostBy8Ball = sortedBy8BallWins[0];

        const sortedBy8BallPercent = sortedByWinRate.sort(
            (a, b) => (b.lostBy8BallPercent || 0) - (a.lostBy8BallPercent || 0)
        );

        const lostBy8BallPercent = sortedBy8BallPercent[0];
        console.log(lostBy8BallPercent);

        return {
            bestWinRatePlayer,
            worstWinRatePlayer,
            highestWinStreak,
            mostlostBy8Ball,
            lostBy8BallPercent,
        };
    }, [players]);

    return (
        <DefaultLayout title={'Player Stats'}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard
                    title="Best Win Rate"
                    value={`${stats.bestWinRatePlayer ? (stats.bestWinRatePlayer.winRate * 100).toFixed(0) : 0}%`}
                    icon={
                        <i className="fa-solid fa-arrow-trend-up text-success"></i>
                    }
                    playerName={stats.bestWinRatePlayer?.username || 'N/A'}
                />
                <StatCard
                    title="Highest Win Streak"
                    value={`${stats.highestWinStreak.streak} Wins`}
                    icon={<i className="fa-solid fa-trophy text-amber-500"></i>}
                    playerName={
                        stats.highestWinStreak.player?.username || 'N/A'
                    }
                />
                <StatCard
                    title="Pulled Porker Nr. 1"
                    value={`${stats.mostlostBy8Ball ? stats.mostlostBy8Ball.lostBy8Ball : 0} Losses by 8-Ball`}
                    icon={<i className="fa-solid fa-bacon text-pink-400"></i>}
                    playerName={stats.mostlostBy8Ball?.username || 'N/A'}
                />
                <StatCard
                    title="Pulled Porker Nr. 1 Relative"
                    value={`${stats.lostBy8BallPercent ? (stats.lostBy8BallPercent.lostBy8BallPercent * 100).toFixed(0) : 0}% Losses with 8-Ball`}
                    icon={<i className="fa-solid fa-bacon text-pink-400"></i>}
                    playerName={stats.lostBy8BallPercent?.username || 'N/A'}
                />
                <StatCard
                    title="Worst Win Rate"
                    value={`${stats.worstWinRatePlayer ? (stats.worstWinRatePlayer.winRate * 100).toFixed(0) : 0}%`}
                    icon={
                        <i className="fa-solid fa-arrow-trend-down text-danger"></i>
                    }
                    playerName={stats.worstWinRatePlayer?.username || 'N/A'}
                />
            </div>
            <Divider className="mb-8" />
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
                                    <div className="flex flex-row justify-between w-full items-center text-sm text-zinc-500 mt-1">
                                        <p>
                                            8-Ball Wins:{' '}
                                            {player.wonBy8Ball || 0}
                                        </p>
                                        <p>
                                            8-Ball Losses:{' '}
                                            {player.lostBy8Ball || 0}
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
