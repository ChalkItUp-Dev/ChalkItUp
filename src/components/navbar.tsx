import {
    useState,
    useEffect,
} from 'react';
import { auth } from '../firebase/firebase.ts';
import { onAuthStateChanged, User } from 'firebase/auth';

function Navbar(
    prop: {
        title: string,
    }
) {
    const [,setUser] = useState<User | null>(null);

    useEffect(() => {
        // Überwache den Authentifizierungsstatus
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Aufräumen der Subscription
        return () => unsubscribe();
    }, []);

    return (
        <>
            <div className="flex justify-center">
                <p className={'font-medium text-4xl ml-6 pt-4 mb-2 fixed z-50 h-16 bg-background max-w-[1024px] min-w-96'}> {prop.title}</p>
            </div>

        </>
    );
};

export default Navbar;
