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
            <p className={'font-medium text-4xl ml-6 mt-4'}>{prop.title}</p>
        </>
    );
};

export default Navbar;
