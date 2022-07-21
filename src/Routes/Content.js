import { useState, React, useRef, useEffect } from "react";
import {Routes, Route, useNavigate, Router} from 'react-router-dom';

import TrendingAnime from "../Components/TrendingAnime";

import { 
    signInWithEmailAndPassword, 
    getAuth, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged, 
    signOut  } 
from "firebase/auth";

import {app, auth, analytics} from '../firebase.config'
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore/lite";



function Content() {
    const db = getFirestore(app)

    const [username, setUsername] = useState("");
    const [logout, setLogout] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    const navigate = useNavigate();


    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              // ...
                
                const docRef = doc(db, "users", auth.currentUser.email)
                getDoc(docRef).then(docSnap => {
                    if (docSnap.exists()) {
                        setUsername(docSnap.data().username)
                    } else {
                      console.log("No such document!");
                    }
                  })
            } else {
                setLoggedIn(false)
                
            }
          });

    }, [auth]);



    //Logs the user out
    async function Logout() {
        await signOut(auth).then(() => {
            setLogout(true)
            
          }).catch((error) => {
            // An error happened.
          });
    }

    //Nvaigates back to the home page if no user is logged in
    useEffect(() => {
        if(loggedIn == false) {
            navigate('/')
        }
    }, [loggedIn])


    //Nvaigates back to the home page if the user is logged out
    useEffect(() => {
        if(logout) {
            navigate('/')
        }
    }, [logout])

    




    return (
           
        <div className="flex flex-col">
            WELCOME {username}
            <div>
                CURRENT TRENDING ANIME
            </div>
            <TrendingAnime></TrendingAnime>
            <button
                onClick={Logout}
            >
                Logout
            </button>
            
            
        </div>
           
    )
}

export default Content;