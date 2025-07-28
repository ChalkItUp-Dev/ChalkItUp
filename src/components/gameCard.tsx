import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Game, Player, updateGame } from '../service/api.service';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { Button, Tooltip } from '@heroui/react';
import { FaTrophy } from 'react-icons/fa6';

function GameCard(props: {
    game: Game;
    player: Player[];
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const endGame = (team: number) => {

        props.game.players.forEach((p) => {
            if(p.team === team) p.winner = true;

        })
        props.game.endTime = new Date();

        updateGame(props.game).then(() => console.log('Update success'));
    }

    return (
        <>
            <Card className="w-full max-w-[400px] mb-4 border" shadow={'none'}>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-row justify-between w-full items-center">
                        <p className="text-md">Game</p>
                        {!props.game.endTime &&
                            <Tooltip content="Set winner" showArrow={true}>
                            <Button
                                isIconOnly
                                variant={'bordered'}
                                color={'success'}
                                onPress={() => {
                                    onOpen();
                                }}
                            >
                                <FaTrophy />
                            </Button>
                        </Tooltip>}

                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-row justify-between align-middle items-center w-full">
                        { props.game.players.find(x => x.winner)?.team == 1 &&
                            <div className={'mr-1 text-green-500'}>
                                <FaTrophy />
                            </div>
                        }
                        <div className="w-1/3">
                            {props.game.players
                                .filter((p1) => p1.team === 1)
                                .map((p1) => {
                                    return (
                                        <p
                                            className="flex flex-row w-full items-center"
                                            key={p1.userId}
                                        >
                                            {
                                                props.player.find(
                                                    (p) =>
                                                        p.userId === p1.userId
                                                )?.username
                                            }{' '}
                                        </p>
                                    );
                                })}
                        </div>
                        <p className="w-1/3 text-center">vs</p>
                        <div className="w-1/3 ">
                            {props.game.players
                                .filter((p2) => p2.team === 2)
                                .map((p2) => {
                                    return (
                                        <p
                                            className="flex flex-row w-full items-center justify-end"
                                            key={p2.userId}
                                        >
                                            {
                                                props.player.find(
                                                    (p) =>
                                                        p.userId === p2.userId
                                                )?.username
                                            }{' '}
                                        </p>
                                    );
                                })}
                        </div>
                        {props.game.players.find(x => x.winner)?.team == 2 &&
                        <div className={'ml-1 text-green-500'}>
                            <FaTrophy />
                        </div>
                        }
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
                            <ModalBody className="h-60">
                                <Button
                                    color={"success"}
                                    variant={'flat'}
                                    onPress={() => {
                                        endGame(1);
                                        onClose();
                                    }}
                                >
                                    Team 1
                                </Button>
                                <Button
                                    color={"success"}
                                    variant={'flat'}
                                    onPress={() => {
                                        endGame(2);
                                        onClose();
                                    }}
                                >
                                    Team 2
                                </Button>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default GameCard;