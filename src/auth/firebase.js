
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBYlEcUoXP7QE2HNDLY4huINmMJFSBvH_Y",
    authDomain: "chatsphere-452a9.firebaseapp.com",
    projectId: "chatsphere-452a9",
    storageBucket: "chatsphere-452a9.firebasestorage.app",
    messagingSenderId: "130564462997",
    appId: "1:130564462997:web:29c7f802b59e9ff914be9c",
    // measurementId: "G-GH1VLJCQ8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);