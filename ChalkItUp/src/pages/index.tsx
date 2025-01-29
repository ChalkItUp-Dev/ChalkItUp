import DefaultLayout from '@/layouts/default';
import {
    fetchGameStats,
    fetchPlayers,
    GameStats,
    Player,
} from '@/service/api.service';
import { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
} from '@heroui/react';

export default function IndexPage() {
    const [player, setPlayer] = useState<Player[]>([]);
    const [gameStats, setGameStats] = useState<GameStats[]>([]);

    useEffect(() => {
        fetchPlayers().then((players) => {
            setPlayer(players);
        });
        fetchGameStats().then((stats) => {
            setGameStats(stats);
        });
    }, []);

    return (
        <DefaultLayout>
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">HeroUI</p>
                        <p className="text-small text-default-500">
                            heroui.com
                        </p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>
                        Make beautiful websites regardless of your design
                        experience.
                    </p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Link
                        isExternal
                        showAnchorIcon
                        href="https://github.com/heroui-inc/heroui"
                    >
                        Visit source code on GitHub.
                    </Link>
                </CardFooter>
            </Card>
        </DefaultLayout>
    );
}
