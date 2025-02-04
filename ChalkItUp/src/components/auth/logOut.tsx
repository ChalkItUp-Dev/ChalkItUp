import {Button} from "@heroui/button";
import { useAuth } from "@/contexts/authContext";
import { doSignOut } from "@/firebase/auth.ts";

const LogoutButton = () => {
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await doSignOut();
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    if (!currentUser) return null;

    return (
        <Button
            color="danger"
            variant="flat"
            onPress={handleLogout}
            className="ml-4"
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
