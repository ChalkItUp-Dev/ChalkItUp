import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { GameHistory, updateGame } from '../service/api.service';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@heroui/modal';
import { Button, Tooltip } from '@heroui/react';
import { FaTrophy } from 'react-icons/fa6';
import { RiBilliardsFill } from 'react-icons/ri';
import { GiChewedSkull } from 'react-icons/gi';

function GameCard(props: { game: GameHistory }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const endGame = (team: number) => {
        props.game.players.forEach((p) => {
            if (p.team === team) p.winner = true;
        });
        props.game.endTime = new Date();

        updateGame(props.game).then(() => console.log('Update success'));
    };

    return (
        <>
            <Card
                className="w-full max-w-[400px] mb-4 border-none shadow-lg dark:bg-zinc-900"
                shadow={'none'}
            >
                <CardHeader className="flex gap-3 justify-between items-center">
                    <div className="flex items-center gap-2">
                        <RiBilliardsFill size={24} className="text-zinc-500" />
                        <p className="text-md font-semibold">Match</p>
                    </div>
                    {!props.game.endTime && (
                        <Tooltip content="Set winner" showArrow={true}>
                            <Button
                                isIconOnly
                                variant={'flat'}
                                color={'success'}
                                onPress={onOpen}
                                className="bg-transparent"
                            >
                                <FaTrophy size={20} />
                            </Button>
                        </Tooltip>
                    )}
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex w-full">
                        {/* Team 1 */}
                        <div className="w-2/5 flex flex-col items-center text-center">
                            {props.game.players.find((x) => x.winner)?.team ===
                                1 && (
                                <FaTrophy
                                    className="text-yellow-400 mb-2"
                                    size={24}
                                />
                            )}
                            {props.game.players.find((x) => x.winner)?.team !==
                                1 &&
                                props.game.endTime && (
                                    <GiChewedSkull
                                        className="text-danger mb-2"
                                        size={24}
                                    />
                                )}
                            {props.game.players
                                .filter((p) => p.team === 1)
                                .map((p) => (
                                    <p
                                        key={p.player.userId}
                                        className="font-semibold text-lg"
                                    >
                                        {p.player.username}
                                    </p>
                                ))}
                        </div>

                        <p className="w-1/5 justify-center font-bold text-zinc-500 text-2xl h-full flex  items-center">
                            vs
                        </p>

                        {/* Team 2 */}
                        <div className="w-2/5 flex flex-col items-center text-center">
                            {props.game.players.find((x) => x.winner)?.team ===
                                2 && (
                                <FaTrophy
                                    className="text-yellow-400 mb-2"
                                    size={24}
                                />
                            )}
                            {props.game.players.find((x) => x.winner)?.team !==
                                2 &&
                                props.game.endTime && (
                                    <GiChewedSkull
                                        className="text-danger mb-2"
                                        size={24}
                                    />
                                )}
                            {props.game.players
                                .filter((p) => p.team === 2)
                                .map((p) => (
                                    <p
                                        key={p.player.userId}
                                        className="font-semibold text-lg"
                                    >
                                        {p.player.username}
                                    </p>
                                ))}
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius={'sm'}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Who has won?
                            </ModalHeader>
                            <ModalBody className="h-auto py-8">
                                <div className="flex justify-around">
                                    <Button
                                        color={'success'}
                                        variant={'flat'}
                                        onPress={() => {
                                            endGame(1);
                                            onClose();
                                        }}
                                        className="w-2/5"
                                    >
                                        Team 1
                                    </Button>
                                    <Button
                                        color={'success'}
                                        variant={'flat'}
                                        onPress={() => {
                                            endGame(2);
                                            onClose();
                                        }}
                                        className="w-2/5"
                                    >
                                        Team 2
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default GameCard;
