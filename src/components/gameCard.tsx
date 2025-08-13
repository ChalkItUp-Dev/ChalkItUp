import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { GameHistory } from '../service/api.service';
import { updateGame } from '../service/firebase.service';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@heroui/modal';
import { Button, Tooltip, ButtonGroup } from '@heroui/react';
import { useState } from 'react';

function GameCard(props: { game: GameHistory }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [winningTeam, setWinningTeam] = useState<number | null>(null);
    const [endReason, setEndReason] = useState<'win' | 'loss_by_8_ball'>('win');

    const handleEndGame = () => {
        if (winningTeam === null) return;

        const updatedGame = { ...props.game };
        updatedGame.endTime = new Date();
        updatedGame.endState = endReason;

        updatedGame.players.forEach((p) => {
            p.winner = p.team === winningTeam;
            p.endState = endReason;
        });

        updateGame(updatedGame).then(() => {
            onOpenChange();
        });
    };

    return (
        <>
            <Card
                className="w-full max-w-[400px] mb-4 border-none shadow-lg dark:bg-zinc-900"
                shadow={'none'}
            >
                <CardHeader className="flex gap-3 justify-between items-center">
                    <div className="flex items-center gap-2">
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
                                <i className="fa-solid fa-trophy text-success"></i>
                            </Button>
                        </Tooltip>
                    )}
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex justify-between items-center w-full">
                        {/* Team 1 */}
                        <div className="w-2/5 flex flex-col items-center text-center">
                            {props.game.players.find((x) => x.winner)?.team ===
                                1 && (
                                <i className="fa-solid fa-trophy text-success"></i>
                            )}
                            {props.game.players.find((x) => x.winner)?.team !==
                                1 &&
                                props.game.endTime && (
                                    <i className="fa-solid fa-x text-danger"></i>
                                )}
                            {props.game.players
                                .filter((p) => p.team === 1)
                                .map((p) => (
                                    <p
                                        key={p.player.userId}
                                        className="font-semibold text-lg mt-2"
                                    >
                                        {p.player.username}
                                    </p>
                                ))}
                        </div>

                        <p className="w-1/5 text-center font-bold text-zinc-500 text-2xl">
                            vs
                        </p>

                        {/* Team 2 */}
                        <div className="w-2/5 flex flex-col items-center text-center">
                            {props.game.players.find((x) => x.winner)?.team ===
                                2 && (
                                <i className="fa-solid fa-trophy text-success"></i>
                            )}
                            {props.game.players.find((x) => x.winner)?.team !==
                                2 &&
                                props.game.endTime && (
                                    <i className="fa-solid fa-x text-danger"></i>
                                )}
                            {props.game.players
                                .filter((p) => p.team === 2)
                                .map((p) => (
                                    <p
                                        key={p.player.userId}
                                        className="font-semibold text-lg mt-2"
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
                                Declare Winner & Outcome
                            </ModalHeader>
                            <ModalBody className="h-auto py-8">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <p className="text-center mb-2 font-semibold">
                                            Who won?
                                        </p>
                                        <ButtonGroup fullWidth>
                                            <Button
                                                color={
                                                    winningTeam === 1
                                                        ? 'primary'
                                                        : 'default'
                                                }
                                                onPress={() =>
                                                    setWinningTeam(1)
                                                }
                                            >
                                                Team 1
                                            </Button>
                                            <Button
                                                color={
                                                    winningTeam === 2
                                                        ? 'primary'
                                                        : 'default'
                                                }
                                                onPress={() =>
                                                    setWinningTeam(2)
                                                }
                                            >
                                                Team 2
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    <div>
                                        <p className="text-center mb-2 font-semibold">
                                            Reason
                                        </p>
                                        <ButtonGroup fullWidth>
                                            <Button
                                                color={
                                                    endReason === 'win'
                                                        ? 'primary'
                                                        : 'default'
                                                }
                                                onPress={() =>
                                                    setEndReason('win')
                                                }
                                            >
                                                Standard Win
                                            </Button>
                                            <Button
                                                color={
                                                    endReason ===
                                                    'loss_by_8_ball'
                                                        ? 'primary'
                                                        : 'default'
                                                }
                                                onPress={() =>
                                                    setEndReason(
                                                        'loss_by_8_ball'
                                                    )
                                                }
                                            >
                                                Foul on 8-Ball
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="success"
                                    onPress={handleEndGame}
                                    disabled={winningTeam === null}
                                >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default GameCard;
