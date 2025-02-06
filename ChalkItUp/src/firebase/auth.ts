import {auth} from "./firebase.ts";
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from "firebase/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doUpdateProfile = async (displayName: string, photoURL?: string): Promise<void> => {
    if (!auth.currentUser) {
        throw new Error("Kein Benutzer angemeldet");
    }

    try {
        await updateProfile(auth.currentUser, {
            displayName,
            photoURL: photoURL || auth.currentUser.photoURL || ""
        });
        console.log("Profil aktualisiert:", { displayName, photoURL });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Profils:", error);
        throw error;
    }
};

export const doSignOut = () => {
    return auth.signOut();
}

// Google Login
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Google Login Error:", error);
        throw error;
    }
};

// GitHub Login
export const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("GitHub Login Error:", error);
        throw error;
    }
};