import { Link } from '@heroui/link';
import './footer.css';

import { FaChartBar, FaHome, FaTrophy } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

export function Footer() {
    return (
        <div className="footerd bg-background z-50 w-full pb-2 pt-2 ">
            <footer className="flex justify-center w-full h-12">
                <div className="flex flex-row items-center justify-center w-full footere border rounded-full space-x-8">
                    <Link href="/games">
                        <FaChartBar size={36} color={'black'} />
                    </Link>
                    <Link href="/">
                        <FaHome size={36} color={'black'} />
                    </Link>
                    <Link href="/players">
                        <FaTrophy size={36} color={'black'} />
                    </Link>
                    <Link href="/profile">
                        <FaGear size={36} color={'black'} />
                    </Link>
                </div>
            </footer>
        </div>
    );
}
