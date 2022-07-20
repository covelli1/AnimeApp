// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjfRemXJ0u8uI4c5gykleEmsPvEykl61Y",
  authDomain: "anime-fbb4e.firebaseapp.com",
  projectId: "anime-fbb4e",
  storageBucket: "anime-fbb4e.appspot.com",
  messagingSenderId: "185329364597",
  appId: "1:185329364597:web:7c3244557d82b0a1bf123c",
  measurementId: "G-P2PTVF74QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const analytics = getAnalytics(app);

export {app, auth, db, analytics}