import {Card, CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {Progress} from "@heroui/progress";
import {useEffect, useState} from "react";
import {Player} from "../../service/api.service";
import {fetchPlayersWithStats} from "../../service/firebase.service";

export default function AllPlayersComponent() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        fetchPlayersWithStats().then((players) => {
            setPlayers(players);
        });
    }, []);

    return (
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
                                    <p className={`text-lg font-semibold ${
                                        player.winRate >= 0.65 ? 'text-success' : (player.winRate >= 0.35 ? 'text-warning' : (player.winRate == 0 ? 'text-zinc-500' : 'text-danger'))
                                    }`}
                                    >
                                        {(player.winRate * 100).toFixed(0)}% Win Rate
                                    </p>
                                </div>
                                <div
                                    className="flex flex-row justify-between w-full items-center text-sm text-zinc-500">
                                    <p>
                                        {player.winsCount +
                                            player.lossesCount}{' '}
                                        {player.winsCount +
                                        player.lossesCount == 1 ? "Game" : "Games"}
                                    </p>
                                    <p>
                                        {player.winsCount}W -{' '}
                                        {player.lossesCount}L
                                    </p>
                                </div>
                                <div
                                    className="flex flex-row justify-between w-full items-center text-sm text-zinc-500 mt-1">
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
                        <CardBody>
                            <Progress
                                aria-label={'WinRate'}
                                radius={'sm'}
                                color={
                                    player.winRate >= 0.65
                                        ? 'success'
                                        : (player.winRate >= 0.35 ? 'warning' : 'danger')
                                }
                                value={player.winRate * 100}
                            />
                        </CardBody>
                        <Divider/>
                        <CardBody>
                            <div className={'flex flex-row items-center'}>
                                <p className={'text-xs text-zinc-500 mr-2'}>Recent:</p>
                                <div className={'flex flex-row items-center center h-full gap-1.5'}>
                                    {player.lastWins.slice(0, 10).reverse().map((game, index) => {
                                        return (
                                            <div
                                                key={game + ' ' + index}
                                                className={`${game ? 'bg-success' : 'bg-danger'} rounded-full bg-danger w-4 h-4`}
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
    );
}