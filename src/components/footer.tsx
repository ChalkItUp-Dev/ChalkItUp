import { Link } from '@heroui/link';
import './footer.css';

export function Footer() {
    return (
        <div className="footerd bg-background z-50  pt-2 ">
            <footer className="">
                <div className="flex flex-row items-center p-4 justify-center space-x-8 bg-background">
                    <Link href="/games">
                        <i className="fa-solid fa-clipboard-list"></i>
                    </Link>
                    <Link href="/">
                        <i className="fa-solid fa-house"></i>
                    </Link>
                    <Link href="/players">
                        <i className="fa-solid fa-trophy"></i>
                    </Link>
                    <Link href="/profile">
                        <i className="fa-solid fa-user"></i>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
