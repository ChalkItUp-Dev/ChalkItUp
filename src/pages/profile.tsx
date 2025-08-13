import DefaultLayout from '../layouts/default';
import LogoutButton from '../components/auth/logOut';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import {
    checkUsername,
    fetchPlayersWithStats, // Geändert
    updatePlayer,
    fetchPlayerByUserId, // Hinzugefügt
} from '../service/firebase.service';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { Player } from '../service/api.service';

function ProfilePage() {
    const [user, setUser] = useState<Player>({
        lossesCount: 0,
        winRate: 0,
        winsCount: 0,
        userId: '',
        username: '',
        email: '',
        id: '',
        lastWins: [],
        wonBy8Ball: 0,
        lostBy8Ball: 0,
    });
    const [disabled, setDisabled] = useState<boolean>(true);
    const [players, setPlayers] = useState<Player[]>([]);
    const [isValid, setIsValid] = useState<boolean>(false);
    const { currentUser } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkIfUserNameExist(e.target.value);
        setUser({
            ...user,
            username: e.target.value,
        });
    };

    useEffect(() => {
        if (currentUser)
            fetchPlayerByUserId(currentUser.uid).then((player) => {
                if (player) setUser(player);
            });
    }, []);

    const updateUser = () => {
        if (isValid) return;
        updatePlayer(user).then(() => {
            setDisabled(true);
        });
    };

    const checkIfUserNameExist = (userName: string) => {
        checkUsername(userName).then((username) => {
            if (username) setIsValid(true);
            else setIsValid(false);
        });
        return isValid;
    };

    return (
        <DefaultLayout title={'Profile'}>
            <>
                <div className="pb-10">
                    <Input
                        label={'Username'}
                        value={user.username}
                        onChange={handleInputChange}
                        disabled={disabled}
                        readOnly={disabled}
                        classNames={{
                            inputWrapper: [
                                disabled ? 'bg-zinc-200' : 'bg-background',
                            ],
                        }}
                        endContent={
                            disabled ? (
                                <Button
                                    isIconOnly
                                    variant={'light'}
                                    color={'success'}
                                    onPress={() => setDisabled(false)}
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </Button>
                            ) : (
                                <Button
                                    isIconOnly
                                    variant={'light'}
                                    color={'success'}
                                    onPress={updateUser}
                                >
                                    <i className="fa-solid fa-check"></i>
                                </Button>
                            )
                        }
                        validate={(value: string) => {
                            if (value.length < 3) {
                                return 'Username must be at least 3 characters long';
                            }
                            if (checkIfUserNameExist(value)) {
                                return 'Username exist';
                            }
                            return null;
                        }}
                    />
                </div>
                <div className="flex justify-end w-full">
                    <LogoutButton />
                </div>
            </>
        </DefaultLayout>
    );
}

export default ProfilePage;
