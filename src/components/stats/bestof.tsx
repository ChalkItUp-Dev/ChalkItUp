import {useEffect, useMemo, useState} from "react";
import {Player} from "../../service/api.service";
import {fetchPlayersWithStats} from "../../service/firebase.service";
import {StatCard} from "./card";

export default function BestStatsComponent() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        fetchPlayersWithStats().then((players) => {
            setPlayers(players);
        });
    }, []);

    const getTop3HighestWinStreaks = (players: Player[]) => {
        // Calculate the highest streak for each player
        const playersWithStreaks = players.map(player => {
            let highestStreak = 0;
            let currentStreak = 0;
            for (const win of player.lastWins) {
                if (win) {
                    currentStreak++;
                } else {
                    if (currentStreak > highestStreak) {
                        highestStreak = currentStreak;
                    }
                    currentStreak = 0;
                }
            }
            // Check one last time after the loop
            if (currentStreak > highestStreak) {
                highestStreak = currentStreak;
            }
            return {player, streak: highestStreak};
        });

        // Sort players by streak in descending order and take the top 3
        const sortedByStreak = playersWithStreaks.sort((a, b) => b.streak - a.streak);
        return sortedByStreak.slice(0, 3);
    };

    const stats = useMemo(() => {
        if (players.length === 0) {
            return {
                bestWinRatePlayer: null,
                worstWinRatePlayer: null,
                top3WinStreaks: [],
                mostlostBy8Ball: null,
                secMostLostBy8Ball: null,
                tMostLostBy8Ball: null,
                lostBy8BallPercent: null,
                sLostBy8BallPercent: null,
                tLostBy8BallPercent: null,
            };
        }

        const sortedByWinRate = [...players]
            .filter((x) => x.winsCount + x.lossesCount !== 0)
            .sort((a, b) => b.winRate - a.winRate || b.winsCount - a.winsCount);

        const bestWinRatePlayer = sortedByWinRate[0];
        const sWinRatePlayer = sortedByWinRate[1];
        const tWinRatePlayer = sortedByWinRate[2];
        const worstWinRatePlayer = sortedByWinRate[sortedByWinRate.length - 1];

        const highestWinStreak = getTop3HighestWinStreaks(players)[0];
        const sWinStreak = getTop3HighestWinStreaks(players)[1];
        const tWinStreak = getTop3HighestWinStreaks(players)[2];

        const sortedBy8BallWins = [...players].sort(
            (a, b) => (b.lostBy8Ball || 0) - (a.lostBy8Ball || 0)
        );
        const mostlostBy8Ball = sortedBy8BallWins[0];
        const secMostLostBy8Ball = sortedBy8BallWins[1];
        const tMostLostBy8Ball = sortedBy8BallWins[2];

        const sortedBy8BallPercent = [...players].sort(
            (a, b) => (b.lostBy8BallPercent || 0) - (a.lostBy8BallPercent || 0)
        );
        const lostBy8BallPercent = sortedBy8BallPercent[0];
        const sLostBy8BallPercent = sortedBy8BallPercent[1];
        const tLostBy8BallPercent = sortedBy8BallPercent[2];

        return {
            bestWinRatePlayer,
            sWinRatePlayer,
            tWinRatePlayer,
            worstWinRatePlayer,
            highestWinStreak,
            sWinStreak,
            tWinStreak,
            mostlostBy8Ball,
            secMostLostBy8Ball,
            tMostLostBy8Ball,
            lostBy8BallPercent,
            sLostBy8BallPercent,
            tLostBy8BallPercent,
        };
    }, [players]);

    return (<>
            <div className={'text-2xl font-bold z-50 h-16 w-full md'}>Best of</div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-8">
                <div>
                    <StatCard
                        title="Highest Streak"
                        value={`${stats.highestWinStreak?.streak} Wins`}
                        icon={<i className="fa-solid fa-trophy text-amber-500"></i>}
                        playerName={
                            stats.highestWinStreak?.player?.username || 'N/A'
                        }
                        sPlayerName={stats.sWinStreak?.player?.username}
                        sPlayerValue={`${stats.sWinStreak?.streak} Wins`}
                        tPlayerName={stats.tWinStreak?.player?.username}
                        tPlayerValue={`${stats.tWinStreak?.streak} Wins`}
                    />
                    <StatCard
                        title="Best Rate"
                        value={`${stats.bestWinRatePlayer ? (stats.bestWinRatePlayer.winRate * 100).toFixed(0) : 0}%`}
                        icon={
                            <i className="fa-solid fa-arrow-trend-up text-success"></i>
                        }
                        playerName={stats.bestWinRatePlayer?.username || 'N/A'}
                        sPlayerName={stats.sWinRatePlayer?.username}
                        sPlayerValue={`${stats.sWinRatePlayer ? (stats.sWinRatePlayer.winRate * 100).toFixed(0) : 0}%`}
                        tPlayerName={stats.tWinRatePlayer?.username}
                        tPlayerValue={`${stats.tWinRatePlayer ? (stats.tWinRatePlayer.winRate * 100).toFixed(0) : 0}%`}
                    />
                </div>
                <div>
                    <StatCard
                        title="Pulled Porker"
                        value={`${stats.mostlostBy8Ball ? stats.mostlostBy8Ball.lostBy8Ball : 0}`}
                        icon={<i className="fa-solid fa-bacon text-pink-400"></i>}
                        playerName={stats.mostlostBy8Ball?.username || 'N/A'}
                        sPlayerName={stats.secMostLostBy8Ball?.username}
                        sPlayerValue={`${stats.secMostLostBy8Ball ? stats.secMostLostBy8Ball.lostBy8Ball : 0}`}
                        tPlayerName={stats.tMostLostBy8Ball?.username}
                        tPlayerValue={`${stats.tMostLostBy8Ball ? stats.tMostLostBy8Ball.lostBy8Ball : 0}`}
                    />
                    <StatCard
                        title="Pulled Porker Quota"
                        value={`${stats.lostBy8BallPercent ? (stats.lostBy8BallPercent.lostBy8BallPercent * 100).toFixed(0) : 0}%`}
                        icon={<i className="fa-solid fa-bacon text-pink-400"></i>}
                        playerName={stats.lostBy8BallPercent?.username || 'N/A'}
                        sPlayerName={stats.sLostBy8BallPercent?.username}
                        sPlayerValue={`${stats.sLostBy8BallPercent ? (stats.sLostBy8BallPercent.lostBy8BallPercent * 100).toFixed(0) : 0}%`}
                        tPlayerName={stats.tLostBy8BallPercent?.username}
                        tPlayerValue={`${stats.tLostBy8BallPercent ? (stats.tLostBy8BallPercent.lostBy8BallPercent * 100).toFixed(0) : 0}%`}
                    /></div>
            </div>
        </>
    );
}