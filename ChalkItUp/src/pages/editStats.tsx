import DefaultLayout from '@/layouts/default';
import {
    fetchGameStats,
    fetchPlayers,
    GameStats,
    Player,
    saveGame,
} from '@/service/api.service';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function EditStats() {
    const location = useLocation();
    const [gameStats, setGameStats] = useState<GameStats[]>([]);
    const [player, setPlayer] = useState<Player[]>([]);
    const [selectedGame, setSelectedGame] = useState<GameStats>({
        Player1: 0,
        Player2: 0,
        Wins_P1: 0,
        Wins_P2: 0,
    });

    useEffect(() => {
        fetchGameStats().then((stats) => {
            setGameStats(stats);
        });
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
    }, [selectedGame]);

    const findePlayer = (id: number) => {
        const p = player.find((x) => id === x.PlayerID);

        if (p) return p;
    };

    const player1 = findePlayer(location.state.p1);
    const player2 = findePlayer(location.state.p2);

    return (
        <DefaultLayout>
            <div className="flex flex-row justify-between w-full">
                <p className="text-md">{player1?.FirstName}</p>
                <p className="text-md">vs</p>
                <p className="text-md">{player2?.FirstName}</p>
            </div>
        </DefaultLayout>
    );
}

export default EditStats;
