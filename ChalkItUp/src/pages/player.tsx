import DefaultLayout from '@/layouts/default';
import { fetchPlayers, Player, updatePlayer } from '@/service/api.service';
import { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Input,
} from '@heroui/react';

export default function PlayerPage() {
    const [player, setPlayer] = useState<Player[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [playerUpdate, setPlayerUpdate] = useState<Player>({
        PlayerID: 0,
        FirstName: '',
        LastName: '',
    });

    const submitPlayer = () => {
        updatePlayer(
            playerUpdate.PlayerID,
            playerUpdate.FirstName,
            playerUpdate.LastName
        ).then(() => {
            console.log('Player got updated');
        });
    };

    useEffect(() => {
        fetchPlayers().then((player) => {
            setPlayer(player);
        });
    }, [submitPlayer]);

    return (
        <DefaultLayout>
            {player.map((player, index) => {
                return (
                    <div className="flex w-full justify-center " key={index}>
                        <Card className="w-full max-w-[400px] mb-4">
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-row justify-between w-full items-center">
                                    <p className="text-md">
                                        {player.FirstName}, {player.LastName}
                                    </p>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button variant="bordered">
                                                Open Menu
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem
                                                key="edit"
                                                onPress={() => {
                                                    setPlayerUpdate(player);
                                                    onOpen();
                                                }}
                                            >
                                                Edit
                                            </DropdownItem>
                                            <DropdownItem
                                                key="delete"
                                                className="text-danger"
                                                color="danger"
                                            >
                                                Delete
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Wins: 0</p>
                                <p>Loss: 0</p>
                                <p>K/D: 1.0</p>
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
                                Edit user
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Firstname"
                                    onChange={(firstname) => {
                                        setPlayerUpdate({
                                            ...playerUpdate,
                                            FirstName: firstname.target.value,
                                        });
                                    }}
                                    value={playerUpdate.FirstName}
                                ></Input>
                                <Input
                                    label="Lastname"
                                    onChange={(lastname) => {
                                        setPlayerUpdate({
                                            ...playerUpdate,
                                            LastName: lastname.target.value,
                                        });
                                    }}
                                    value={playerUpdate.LastName}
                                ></Input>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        onClose();
                                        submitPlayer();
                                    }}
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </DefaultLayout>
    );
}
