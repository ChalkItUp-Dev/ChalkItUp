import DefaultLayout from '../layouts/default';
import {
    fetchGames,
    fetchPlayers, Game,
    Player, PlayerGame,
    saveGame,
} from '../service/api.service';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Tooltip } from '@heroui/react';
import {
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@heroui/modal';
import { BiPlus } from 'react-icons/bi';
import { Select, SelectItem } from '@heroui/react';
import GameCard from '../components/gameCard';

export default function IndexPage() {

    const [player, setPlayer] = useState<Player[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
        fetchGames().then(game => {
            setGames(game);
        })
    }, [isOpen]);

    const [team1, setTeam1] = useState<string[]>([]);
    const [team2, setTeam2] = useState<string[]>([]);

    const handleSelectionChangeForTeam1 = (e: ChangeEvent<HTMLSelectElement>) => {
        setTeam1(e.target.value.split(','));
    };

    const handleSelectionChangeForTeam2 = (e: ChangeEvent<HTMLSelectElement>) => {
        setTeam2(e.target.value.split(','));
    };

    const startNewGame = () => {
        const players: PlayerGame[] = [];

        if(team1.length  === 0 || team2.length === 0) return;

        team1.forEach((p) => {
            players.push({
                userId: p,
                team: 1,
                winner: false,
            })
        })
        team2.forEach((p) => {
            players.push({
                userId: p,
                team: 2,
                winner: false,
            })
        })
        saveGame(players).then(() => console.log('Created success'));
    }

    return (
        <DefaultLayout title={"Game history"}>
            {games.map((stat, index) => {
                return (
                    <div
                        className="flex w-full justify-center"
                        key={index + ' Card'}
                    >
                        <GameCard game={stat} player={player}  key={index + ' GameCard'}/>
                    </div>
                );
            })}
            <div className="fixed bottom-24 right-4">
                <Tooltip content="Create new Game" >
                    <Button
                        className="rounded-full shadow-xl bg-green-500 font-bold text-xl "
                        isIconOnly
                        onPress={() => {
                            onOpen();
                        }}
                    >
                        <BiPlus />
                    </Button>
                </Tooltip>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius={'sm'}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Start new game
                            </ModalHeader>
                            <ModalBody className="h-60">
                                <Form>
                                    <Select
                                        className="mb-6"
                                        label="Select Players for Team 1"
                                        selectionMode="multiple"
                                        isRequired
                                        onChange={handleSelectionChangeForTeam1}
                                    >
                                        {player.map((p) => (
                                            <SelectItem key={p.userId}>
                                                {p.username}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        className="mb-6"
                                        label="Select Players for Team 2"
                                        selectionMode="multiple"
                                        isRequired
                                        onChange={handleSelectionChangeForTeam2}
                                    >
                                        {player.map((p) => (
                                            <SelectItem key={p.userId}>
                                                {p.username}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </Form>
                                <div>
                                    <Button
                                        color={'success'}
                                        variant={'flat'}
                                        fullWidth
                                        disabled={team1.length === 0 || team2.length === 0}
                                        type={"submit"}
                                        onPress={() => {
                                            startNewGame();
                                            onClose();
                                        }}
                                    >
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
