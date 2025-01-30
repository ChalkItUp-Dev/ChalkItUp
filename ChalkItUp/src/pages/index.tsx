import DefaultLayout from '@/layouts/default';
import {
    fetchGameStats,
    fetchPlayers,
    GameStats,
    Player,
    saveGame,
} from '@/service/api.service';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Button } from '@heroui/button';
import { Progress } from '@heroui/progress';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@heroui/modal';

export default function IndexPage() {
    const [gameStats, setGameStats] = useState<GameStats[]>([]);
    const [player, setPlayer] = useState<Player[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedGame, setSelectedGame] = useState<GameStats>({
        Player1: 0,
        Player2: 0,
        Wins_P1: 0,
        Wins_P2: 0,
    });

    const submitStat = (winner: number, loser: number) => {
        saveGame(winner, loser).then(() => {
            console.log('Update success');
        });
    };

    useEffect(() => {
        fetchGameStats().then((stats) => {
            setGameStats(stats);
        });
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
    }, [isOpen]);

    const findePlayer = (id: number) => {
        const p = player.find((x) => id === x.PlayerID);

        if (p) return p;
    };

    return (
        <DefaultLayout>
            {gameStats.map((stat, index) => {
                return (
                    <div
                        className="flex w-full justify-center "
                        key={index + ' Card'}
                        onClick={() => {
                            setSelectedGame(stat);
                            onOpen();
                        }}
                    >
                        <Card className="w-full max-w-[400px] mb-4">
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-row justify-between w-full">
                                    <p className="text-md">
                                        {findePlayer(stat.Player1)?.FirstName}
                                    </p>
                                    <p className="text-md">vs</p>
                                    <p className="text-md">
                                        {findePlayer(stat.Player2)?.FirstName}
                                    </p>
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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Who had won the game?
                            </ModalHeader>
                            <ModalBody>
                                <Button
                                    color="primary"
                                    variant="bordered"
                                    onPress={() => {
                                        onClose();
                                        submitStat(
                                            selectedGame.Player1,
                                            selectedGame.Player2
                                        );
                                    }}
                                >
                                    {
                                        findePlayer(selectedGame.Player1)
                                            ?.FirstName
                                    }
                                </Button>
                                <Button
                                    color="primary"
                                    variant="bordered"
                                    onPress={() => {
                                        onClose();
                                        submitStat(
                                            selectedGame.Player2,
                                            selectedGame.Player1
                                        );
                                    }}
                                >
                                    {
                                        findePlayer(selectedGame.Player2)
                                            ?.FirstName
                                    }
                                </Button>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </DefaultLayout>
    );
}
