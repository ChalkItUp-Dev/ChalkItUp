import DefaultLayout from '@/layouts/default';
import { fetchGameStats, GameStats } from '@/service/api.service';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Progress } from '@heroui/react';

export default function IndexPage() {
    const [gameStats, setGameStats] = useState<GameStats[]>([]);

    useEffect(() => {
        fetchGameStats().then((stats) => {
            setGameStats(stats);
            console.log('gameStats', gameStats);
        });
    }, []);

    return (
        <DefaultLayout>
            {gameStats.map((stat, index) => {
                return (
                    <div className="flex w-full justify-center ">
                        <Card className="w-full max-w-[400px] mb-4" key={index}>
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-row justify-between w-full">
                                    <p className="text-md"> {stat.Player1}</p>
                                    <p className="text-md">vs</p>
                                    <p className="text-md">{stat.Player2}</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex flex-row justify-between w-full">
                                    <p className="text-md">{stat.Wins_P1}</p>
                                    <p className="text-md">{stat.Wins_P2}</p>
                                </div>
                                <Progress
                                    aria-label="Loading..."
                                    color="primary"
                                    value={
                                        (stat.Wins_P1 /
                                            (stat.Wins_P1 + stat.Wins_P2)) *
                                        100
                                    }
                                />
                            </CardBody>
                        </Card>
                    </div>
                );
            })}
        </DefaultLayout>
    );
}
