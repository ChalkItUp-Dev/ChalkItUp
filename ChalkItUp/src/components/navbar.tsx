import {Link} from "@heroui/link";
import {
    Navbar as NavBar,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";

import {ThemeSwitch} from "@/components/theme-switch";
import {Image} from "@heroui/image";
import Logo from "@/assets/logo.jpg"
import {useNavigate} from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const onHome = () => {
        navigate("/");
    }

    return (
        <NavBar isBordered isBlurred={false}>
            <NavbarContent
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <NavbarItem style={{flexShrink: 0}}>
                    <Image src={Logo} alt="Logo" height="50px" onClick={onHome}/>
                </NavbarItem>
                <NavbarItem style={{display: 'flex', justifyContent: 'space-evenly', flexGrow: 1}}>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                    <Link color="foreground" href="/docs">
                        Docs
                    </Link>
                    <Link color="foreground" href="/about">
                        About
                    </Link>
                </NavbarItem>
                <ThemeSwitch/>
            </NavbarContent>
        </NavBar>
    );
};