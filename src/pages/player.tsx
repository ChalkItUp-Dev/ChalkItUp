import DefaultLayout from '../layouts/default';
import { fetchGames, fetchPlayers, Game, Player } from '../service/api.service';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Progress } from '@heroui/progress';

export  interface  PlayerStats{
    win: number
    lose: number
    winRate: string
}


export default function PlayerPage() {
    const [player, setPlayer] = useState<Player[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
        fetchGames().then((games) => {
            setGames(games);
        });
    }, []);

    const getPlayerStats = (playerId: string): PlayerStats => {

        let win = 0;
        let lose = 0;
        games.forEach(game => {
            win += game.players.filter(x =>x.userId === playerId && x.winner).length
            lose +=  game.players.filter(x =>x.userId === playerId && x.winner === false).length
        })
        return {
            win: win,
            lose: lose,
            winRate: (win / (win + lose)).toFixed(2),
        }
    }


    return (
        <DefaultLayout title={"Player Stats"}>
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
                                                'text-green-500 text-xl font-semibold'
                                            }
                                        >
                                            {
                                                getPlayerStats(player.userId)
                                                    .winRate
                                            }
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between w-full items-center">
                                        <p>
                                            {getPlayerStats(player.userId).win +
                                                getPlayerStats(player.userId)
                                                    .lose +
                                                ' '}
                                            Games
                                        </p>
                                        <p>
                                            {getPlayerStats(player.userId).win}W
                                            -{' '}
                                            {getPlayerStats(player.userId).lose}
                                            L
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
                                        0.49 <
                                        +getPlayerStats(player.userId).winRate
                                            ? 'success'
                                            : 'danger'
                                    }
                                    value={
                                        +getPlayerStats(player.userId).winRate *
                                        100
                                    }
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
