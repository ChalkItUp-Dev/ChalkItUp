import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAI8BYekdwhBjlXUAz8Myti3Z73x1mtyQQ",
    authDomain: "chalkitup-95340.firebaseapp.com",
    projectId: "chalkitup-95340",
    storageBucket: "chalkitup-95340.firebasestorage.app",
    messagingSenderId: "536463964659",
    appId: "1:536463964659:web:9d327419028932881bba86",
    measurementId: "G-GEV22723D1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};