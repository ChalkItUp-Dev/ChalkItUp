import { Link } from "@heroui/link";
import "./footer.css"

export function Footer() {
    return (
        <div className="footerd">
            <footer className="flex justify-center w-full">
                <div className="flex flex-row items-center w-full justify-between footere">
                    <Link href="https://github.com/gabrielakbarov/ChalkItUp">
                        Visit Github-Repo
                    </Link>
                    <p className="text-gray-700">© {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
