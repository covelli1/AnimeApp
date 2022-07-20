import { useState, React, useRef, useEffect } from "react";
import Login from '../Components/Login'
import axios from "axios";
import {Routes, Route, useNavigate, Router} from 'react-router-dom';
import { 
    signInWithEmailAndPassword, 
    getAuth, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence } 
from "firebase/auth";
import {app, auth, db, analytics} from '../firebase.config'


function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

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
            console.log('here')
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    
                })
                .catch((error) => {
                    console.log(error.message)
                    setErrorMessage(
                        <div className="text-red-600 font-bold">
                            {error.message}
                        </div>
                    )
                    
                    // ..
            });

            
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                navigate('/Content');
                // ...
            })
            .catch((error) => {
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
    


    useEffect(() => {
        console.log('run')
    }, [errorMessage]);



    
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