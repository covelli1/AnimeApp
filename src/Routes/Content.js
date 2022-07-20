import { useState, React, useRef, useEffect } from "react";
import {Routes, Route, useNavigate, Router} from 'react-router-dom';

import { 
    signInWithEmailAndPassword, 
    getAuth, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged, 
    signOut  } 
from "firebase/auth";

import {app, auth, db, analytics} from '../firebase.config'
import { connectFirestoreEmulator } from "firebase/firestore/lite";




function Content() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(user)
              // ...
            } else {
                console.log('here')
                navigate('/')
            }
          });

    }, [auth]);




    function Logout() {
        signOut(auth).then(() => {
            navigate('/')
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
           
        <div className="flex flex-col">
            <button
                onClick={Logout}
            >
                Logout
            </button>
            
            
        </div>
           
    )
}

export default Content;