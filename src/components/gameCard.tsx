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
            <Card className="w-full max-w-[400px] mb-4 border" shadow={'none'}>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-row justify-between w-full items-center">
                        <p className="text-md flex flex-row items-center">
                            Game{' '}
                            <RiBilliardsFill size={24} className={'ml-1'} />{' '}
                        </p>
                        {!props.game.endTime && (
                            <Tooltip content="Set winner" showArrow={true}>
                                <Button
                                    isIconOnly
                                    variant={'bordered'}
                                    color={'success'}
                                    onPress={() => {
                                        onOpen();
                                    }}
                                >
                                    <FaTrophy size={20} />
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-row justify-between align-middle items-center w-full">
                        <div className="w-3/7 flex flex-row items-center justify-start">
                            {props.game.players.find((x) => x.winner)?.team ==
                                1 && (
                                <div className={'mr-1 text-green-500'}>
                                    <FaTrophy size={24} />
                                </div>
                            )}
                            <div>
                                {props.game.players
                                    .filter((p1) => p1.team === 1)
                                    .map((p1) => {
                                        return (
                                            <p
                                                className="flex flex-row w-full items-center justify-start"
                                                key={p1.player.userId}
                                            >
                                                {p1.player.username}
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                        <p className="w-1/7 text-center">vs</p>
                        <div className="w-3/7 flex flex-row items-center justify-end">
                            <div>
                                {props.game.players
                                    .filter((p2) => p2.team === 2)
                                    .map((p2) => {
                                        return (
                                            <p
                                                className="flex flex-row w-full items-center justify-end"
                                                key={p2.player.userId}
                                            >
                                                {p2.player.username}
                                            </p>
                                        );
                                    })}
                            </div>
                            {props.game.players.find((x) => x.winner)?.team ==
                                2 && (
                                <div className={'ml-1 text-green-500'}>
                                    <FaTrophy size={24} />
                                </div>
                            )}
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
                            <ModalBody className="h-60">
                                <Button
                                    color={'success'}
                                    variant={'flat'}
                                    onPress={() => {
                                        endGame(1);
                                        onClose();
                                    }}
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
