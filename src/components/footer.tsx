import { Link } from "@heroui/link";
import "./footer.css"
import { GrScorecard } from 'react-icons/gr';
import { BiHome, BiTrophy } from 'react-icons/bi';
import { PiGearBold } from 'react-icons/pi';

export function Footer() {
    return (
        <div className="footerd bg-background z-50 w-full pb-2 pt-2 ">
            <footer className="flex justify-center w-full h-12">
                <div className="flex flex-row items-center justify-center w-full footere border rounded-full space-x-8">
                    <Link href="/"><GrScorecard size={36} color={"black"}/></Link>
                    <Link href="/"><BiHome size={36} color={"black"}/></Link>
                    <Link href="/players"><BiTrophy size={36} color={"black"}/></Link>
                    <Link href="/profile"><PiGearBold size={36} color={"black"}/></Link>
                </div>
            </footer>
        </div>
    );
}
