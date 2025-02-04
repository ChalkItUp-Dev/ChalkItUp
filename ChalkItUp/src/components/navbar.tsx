import { Link } from '@heroui/link';
import { Navbar as NavBar, NavbarContent, NavbarItem } from '@heroui/navbar';
import { ThemeSwitch } from '@/components/theme-switch';
import { Image } from '@heroui/image';
import Logo from '@/assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import LogOutButton from "@/components/auth/logOut.tsx";
import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.ts';
import { onAuthStateChanged } from 'firebase/auth';

export const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Überwache den Authentifizierungsstatus
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Aufräumen der Subscription
        return () => unsubscribe();
    }, []);

    const onHome = () => {
        navigate('/');
    };

    return (
        <NavBar isBordered isBlurred={false}>
            <NavbarContent
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <NavbarItem style={{ flexShrink: 0 }}>
                    <Image
                        src={Logo}
                        alt="Logo"
                        height="50px"
                        onClick={onHome}
                    />
                </NavbarItem>
                <NavbarItem
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexGrow: 1,
                    }}
                >
                    {!user && location.pathname === "/register" && <h2>Welcome to ChalkItUp!</h2>}
                    {!user && location.pathname === "/login" && <h2>Welcome back!</h2>}
                    {user && (
                        <>
                            <Link color="foreground" href="/">
                                Matches
                            </Link>
                            <Link color="foreground" href="/players">
                                Players
                            </Link>
                            <Link color="foreground" href="/">
                                About
                            </Link>
                        </>
                    )}
                </NavbarItem>
                <ThemeSwitch />
                {user && <LogOutButton />}
            </NavbarContent>
        </NavBar>
    );
};
