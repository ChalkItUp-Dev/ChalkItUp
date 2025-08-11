import { Link } from '@heroui/link';
import './footer.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export enum FooterLink {
    Games = '/games',
    Home = '/',
    Players = '/players',
    Profile = '/profile',
}

export function Footer() {
    const router = useLocation();

    const [activeLink, setActiveLink] = useState(router.pathname as FooterLink);

    return (
        <div className="bg-background z-50 pt-2 fixed bottom-0 max-w-[1024px] w-full mx-auto">
            <footer className="">
                <div className="flex flex-row items-center p-4 justify-center space-x-8 bg-background">
                    <Link
                        href="/games"
                        onClick={() => setActiveLink(FooterLink.Games)}
                    >
                        <i
                            className={
                                activeLink === FooterLink.Games
                                    ? 'fa-solid fa-chart-column text-primary footer-icon'
                                    : 'fa-solid fa-chart-column text-gray-400 footer-icon'
                            }
                        ></i>
                    </Link>
                    <Link
                        href="/"
                        onClick={() => setActiveLink(FooterLink.Home)}
                    >
                        <i
                            className={
                                activeLink === FooterLink.Home
                                    ? 'fa-solid fa-house text-primary footer-icon'
                                    : 'fa-solid fa-house text-gray-400 footer-icon'
                            }
                        ></i>
                    </Link>
                    <Link
                        href="/players"
                        onClick={() => setActiveLink(FooterLink.Players)}
                    >
                        <i
                            className={
                                activeLink === FooterLink.Players
                                    ? 'fa-solid fa-trophy text-primary footer-icon'
                                    : 'fa-solid fa-trophy text-gray-400 footer-icon'
                            }
                        ></i>
                    </Link>
                    <Link
                        href="/profile"
                        onClick={() => setActiveLink(FooterLink.Profile)}
                    >
                        <i
                            className={
                                activeLink === FooterLink.Profile
                                    ? 'fa-solid fa-user text-primary footer-icon'
                                    : 'fa-solid fa-user text-gray-400 footer-icon'
                            }
                        ></i>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
