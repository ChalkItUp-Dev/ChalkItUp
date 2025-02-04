import {auth} from "./firebase.ts";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

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