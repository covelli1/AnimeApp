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
    inMemoryPersistence } 
from "firebase/auth";
import {app, auth, analytics} from '../firebase.config'
import { addDoc, collection, Firestore } from "firebase/firestore/lite";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 


function Register() {

    const db = getFirestore(app)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const [loggedIn, setLoggedIn] = useState(false)


    const navigate = useNavigate();

    
    let checkifEmail = ( email ) => {

        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(email) ) {
            return true
        }
        else {
            return false
        }
    
    }

    



    async function createNewUser() {
        
        if(checkifEmail(email)){

            // create email and password auth on firebase
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setPersistence(auth, inMemoryPersistence)
                        .then(() => {
                            //login with the newly created email and password auth
                            //the state will only be stored in memory, so it  will be cleared when the window or activity is refreshed.
                            signInWithEmailAndPassword(auth, email, password)
                            .then(async (userCredential) => {
                                await setDoc(doc(db, "users", userCredential.user.email), {
                                    username: username
                                });
                                console.log('got here')
                                setLoggedIn(true)
                                // addDoc(usersCollectionRef, {email: email, password: password, username: username})
                                
                                
                            })
                            .catch((error) => {
                                setErrorMessage(
                                    <div className="text-red-600 font-bold">
                                            {error.message}
                                        </div>
                                )
                            });
                            
                        })
                })
                .catch((error) => {
                    // Handle Errors here.
                    setErrorMessage(
                        <div className="text-red-600 font-bold">
                                {error.message}
                            </div>
                    )
                });
        } else{
            setErrorMessage(
            <div>
                <p className="text-red-600 font-bold">
                    Invalid email or password provided. Please re-enter.
                </p>
            </div>
            ) 
            
        }
        
    }
    

    //reloads page when the error message is changed, so it is displayed
    useEffect(() => {
    
    }, [errorMessage]);


    //routes tot Content page if logged in
    useEffect(() => {
        if(loggedIn) {
            navigate('/Content');
        }
    }, [loggedIn])


    
    return (
          
            <div className="flex flex-col justify-center items-center pt-60">
                <input 
                    type='email' 
                    placeholder="Type your email" 
                    id="email"
                    className="w-2/5 text-center"
                    onChange={e => 
                        {
                            
                            setEmail(e.target.value)
                        }
                    }
                    required
                >

                </input>
                <br></br>

                <input 
                    type='text' 
                    placeholder="Type your username" 
                    id="username"
                    className="w-2/5 text-center"
                    onChange={e => 
                        {
                            
                            setUsername(e.target.value)
                        }
                    }
                    required
                >

                </input>
                <br></br>

                <input 
                    type='password' 
                    placeholder="Enter your password" 
                    id="password"
                    className="w-2/5 text-center"
                    onChange={e => setPassword(e.target.value)}
                    
                    required
                >

                </input>

                <br></br>
                {errorMessage}
                <button 
                    id='signUp'
                    className="text-white border-2 border-black p-1 rounded bg-red-600"
                    onClick={createNewUser}
                >
                    Sign Up
                    
                </button>
           </div>
    )
}

export default Register;