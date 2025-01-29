import { Link } from "@heroui/link";
// import { Image } from "@heroui/image";
// import Logo from "@/assets/logo.jpg";

export function Footer() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow"></div>
            <footer className="w-full bg-gray-200 p-4">
                <div className="flex flex-row items-center justify-between max-w-3xl mx-auto">
                    <Link href="https://github.com/gabrielakbarov/ChalkItUp">
                        Visit Github-Repo
                    </Link>
                    <p className="text-gray-700">© {new Date().getFullYear()} Alle Rechte vorbehalten.</p>
                    {/*<Image src={Logo} alt="Logo" width="50px" />*/}
                </div>
            </footer>
        </div>
    );
}
