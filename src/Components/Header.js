import { useState, React, useRef, useEffect } from "react";
import Navigation from "./Navigation";
import {Routes, Route, useNavigate, Router} from 'react-router-dom';

import {app, auth, analytics} from '../firebase.config'
import { 
    signInWithEmailAndPassword, 
    getAuth, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged, 
    signOut  } 
from "firebase/auth";


function Header() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [nav, setNav] = useState(<div></div>)
    const [logout, setLogout] = useState(<div></div>)

    const navigate = useNavigate();

    // const [displayNav, setDisplayNav] = useState(false)
    // const [displayLogout, setDisplayLogout] = useState(false)

    //Logs the user out
    async function Logout() {
        await signOut(auth).then(() => {
            setNav(<div/>)
            setLogout(<div/>)
            navigate('/')
            
          }).catch((error) => {
            // An error happened.
          });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setLoggedIn(true)
            } else {
                setLoggedIn(false)
                
            }
          });

    }, [auth]);


    useEffect(() => {
        if(loggedIn === true) {
            setNav(<Navigation></Navigation> )

            setLogout(<button
                onClick={Logout}
                className="bg-rose-600 text-white ml-4 p-2 rounded"
            >
                Logout
            </button> )
            
        }

    }, [loggedIn]);


    return(
        <header className="border-b border-b-white p-3 bg-sky-800	">
           <div className="flex flex-row items-center justify-center">
                <a className="flex title-font font-medium items-center  justify-center text-gray-900">
                    <img src="/smug_anya.png"  width={75} height={75}></img>
                    <span className="ml-3 text-xl text-white">Weeb Info</span>
                </a>

                
            </div>
            <div className="flex justify-between items-center">
                <div className="">
                    {nav}
                </div>
                <div className="">
                    {logout}
                </div>
     
            </div>
            
        </header>
    )
}

export default Header;