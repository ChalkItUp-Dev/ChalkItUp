import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../config/firebase-config.ts';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
