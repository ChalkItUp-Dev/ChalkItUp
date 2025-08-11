import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.ts';
import { onAuthStateChanged, User } from 'firebase/auth';

function Navbar(prop: { title: string }) {
    const [, setUser] = useState<User | null>(null);

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
            <div className="bg-gray-300 w-full z-50">
                <p
                    className={
                        'text-4xl font-bold pl-6 pt-4 pb-2 fixed z-50 h-16 bg-gray-100 dark:bg-gray-800 w-full md'
                    }
                >
                    {prop.title}
                </p>
            </div>
        </>
    );
}

export default Navbar;
