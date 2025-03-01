import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDjl4Wcfvmm2GXR3H2wVZ_WVDgpNYnqHO4",
    authDomain: "aluzswlu-academy.firebaseapp.com",
    projectId: "aluzswlu-academy",
    storageBucket: "aluzswlu-academy.firebasestorage.app",
    messagingSenderId: "110516823107",
    appId: "1:110516823107:web:cf2908afc07524532720f6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };