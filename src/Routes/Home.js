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
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          navigate('/Content')
          // ...
        } else {
          // User is signed out
          // ...
        }
      });


    return (
           
            <Login></Login>
           
    )
}

export default Home;