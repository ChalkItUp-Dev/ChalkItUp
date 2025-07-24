import DefaultLayout from '../layouts/default';
import {
    fetchGames,
    fetchPlayers, Game,
    Player,
    saveGame,
} from '../service/api.service';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Button } from '@heroui/button';
import { Progress } from '@heroui/progress';
import {
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@heroui/modal';
import { BiPlus } from 'react-icons/bi';
import { Select, SelectItem } from '@heroui/react';

export default function IndexPage() {

    const [player, setPlayer] = useState<Player[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitStat = (winner: number, loser: number) => {
        saveGame(winner, loser).then(() => {

            console.log('Update success');
        });
    };

    useEffect(() => {
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
        fetchGames().then(game => {
            setGames(game);
        })
    }, []);
    const findePlayer = (id: string) => {
        return player.find((player) => player.userId === id);
    }

    return (
        <DefaultLayout>
            {games.map((stat, index) => {
                return (
                    <div
                        className="flex w-full justify-center "
                        key={index + ' Card'}
                    >
                        <Card className="w-full max-w-[400px] mb-4">
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-row justify-between w-full">
                                    <p className="text-md">
                                        {findePlayer(stat.winner)?.username}
                                    </p>
                                    <p className="text-md">vs</p>
                                    <p className="text-md">
                                        {findePlayer(stat.loser)?.username}
                                    </p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex flex-row justify-between w-full">
                                    <p className="text-md">{stat.winner}</p>
                                    <p className="text-md">{stat.loser}</p>
                                </div>
                                <Progress
                                    color="success"
                                    value={
                                        100
                                    }
                                />
                            </CardBody>
                        </Card>

                    </div>
                );
            })}
            <div className="fixed bottom-24 right-4">
                <Button className="rounded-full shadow-xl bg-green-500 font-bold text-xl " isIconOnly  onPress={() => {
                    onOpen();
                }} >
                    <BiPlus/>
                </Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius={"sm"} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Start new game
                            </ModalHeader>
                            <ModalBody className="h-60">
                                    <div >
                                        <Select className="mb-6" label="Select Player1">
                                            {player.map((p) => (
                                                <SelectItem key={p.userId}>{p.username}</SelectItem>
                                            ))}
                                        </Select>
                                        <Select className="mb-6" label="Select Player2">
                                            {player.map((p) => (
                                                <SelectItem key={p.userId}>{p.username}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <Button color={"success"} variant={"flat"} fullWidth>
                                            Start Game
                                        </Button>
                                    </div>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </DefaultLayout>
    );
}
