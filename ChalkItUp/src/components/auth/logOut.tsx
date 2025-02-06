import {Button} from "@heroui/button";
import {useAuth} from "@/contexts/authContext";
import {doSignOut} from "@/firebase/auth.ts";

const LogoutButton = () => {
    const {currentUser} = useAuth();

    const handleLogout = async () => {
        await doSignOut();
    };

    if (!currentUser) return null;

    return (
        <Button
            color="danger"
            variant="flat"
            onPress={handleLogout}
            className="logout-button"
        >
            Log out
        </Button>
    );
};

export default LogoutButton;
