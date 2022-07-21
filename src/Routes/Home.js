import { useState, React, useRef, useEffect } from "react";
import Login from '../Components/Login'
import axios from "axios";
import {Routes, Route, useNavigate, Router} from 'react-router-dom';
import { 
    signInWithEmailAndPassword, 
    getAuth, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged } 
from "firebase/auth";
import {app, auth, db, analytics} from '../firebase.config'




function Home() {

    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setLoggedIn(true)
          
          // ...
        } else {
            setLoggedIn(false)
          // User is signed out
          // ...
        }
      });

    useEffect(() => {
        if(loggedIn == true) {
            navigate('/Content')
        }
    }, [loggedIn])


    return (
           
            <Login></Login>
           
    )
}

export default Home;