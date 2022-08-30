import { useState, React, useRef, useEffect } from "react";
import {Routes, Route, useNavigate, Router} from 'react-router-dom';
import { 
    signInWithEmailAndPassword, 
    getAuth, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence,
    inMemoryPersistence, 
    GithubAuthProvider} 
from "firebase/auth";
import {app, auth, db, analytics} from '../firebase.config'

import {signInWithPopup, FacebookAuthProvider, TwitterAuthProvider} from "firebase/auth";


function Login() {

    const facebookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
    
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [persist, setPersist] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const [loggedIn, setLoggedIn] = useState(false)
    

    const navigateToRegister = () => {
        // 👇️ navigate to /contacts
        navigate('/Register');
      };


    //Facebook Login
    const auth = getAuth();

    async function facebookLogin () {
      console.log('here')
      signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user)

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        setLoggedIn(true)

        // ...
      })
      .catch((error) => {
        console.log(error.customData.email)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(
          <div className="text-red-600 font-bold">
              The email: {error.customData.email} is already associated with another account
          </div>
      )
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
    }

    async function GithubLogin () {
      console.log('here')
      signInWithPopup(auth, githubProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user)

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        setLoggedIn(true)

        // ...
      })
      .catch((error) => {
        console.log(error.customData.email)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(
          <div className="text-red-600 font-bold">
              The email: {error.customData.email} is already associated with another account
          </div>
      )
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);

        // ...
      });
    }

    async function twitterLogin () {
      console.log('here')
      signInWithPopup(auth, twitterProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user)

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        setLoggedIn(true)

        // ...
      })
      .catch((error) => {
        console.log(error.customData.email)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(
          <div className="text-red-600 font-bold">
              The email: {error.customData.email} is already associated with another account
          </div>
      )
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);

        // ...
      });
    }
    

    //email login
    async function signIn () {
        if(persist) {
            //login with provided email and password
            //the state will persist in the current session/tab, will only be cleared when the tab or window
            //in which the user authenticated is closed.
            await setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        setLoggedIn(true)
                    })
                    .catch((error) => {
                        setErrorMessage(
                            <div className="text-red-600 font-bold">
                                {error.message}
                            </div>
                        )
                    });
                    
                })
                .catch((error) => {
                    // Handle Errors here.
                    setErrorMessage(
                        <div className="text-red-600 font-bold">
                            {error.message}
                        </div>
                    )
                });
        } else {
            //login with provided email and password
            //the state will only be stored in memory, so it  will be cleared when the window or activity is refreshed.
            await setPersistence(auth, inMemoryPersistence)
                .then(() => {
                    
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      setLoggedIn(true)
                    })
                    .catch((error) => {
                        setErrorMessage(
                            <div className="text-red-600 font-bold">
                                {error.message}
                            </div>
                        )
                    });
                    
                })
                .catch((error) => {
                    // Handle Errors here.
                    setErrorMessage(
                        <div className="text-red-600 font-bold">
                            {error.message}
                        </div>
                    )
                });
        }
        
    }

    useEffect(() => {
        if(loggedIn) {
            navigate('/Content');
        }
    }, [loggedIn])


    return(
    
        
        <div className="px-6 text-gray-800 flex flex-grow justify-center items-center">
          <div
            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap  g-6"
          >
            <div
              className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
            >
              <img
                src="/home-image.png"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4 text-white">Sign in with</p>

                  {/* <!-- Facebook --> */}
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    onClick={facebookLogin}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                      {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                      <path
                        fill="currentColor"
                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                      />
                    </svg>
                  </button>
      

                  {/* <!-- Twitter --> */}
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    onClick={twitterLogin}
                  >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                      {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      />
                    </svg>
                  </button>
      

                   {/* <!-- Github --> */}
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    onClick={GithubLogin}
                  >
                   
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                    <path 
                      fill="currentColor"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  </button>
                </div>
      
                <div
                  className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                >
                  <p className="text-center font-semibold mx-4 mb-0 text-white">Or</p>
                </div>
      
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    onChange={e => 
                        {
                            
                            setEmail(e.target.value)
                        }
                    }
                    required
                  />
                </div>
      
                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                    {errorMessage}
                </div>



                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.checked) {
                            setPersist(true)
                          } else {
                            setPersist(false)
                          }
                      }}
                    />
                    <label className="form-check-label inline-block text-white" htmlFor="exampleCheck2"
                      >Remember me</label
                    >
                  </div>
                  
                </div>
      
                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={signIn}
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-white">
                    Don't have an account?  &nbsp; &nbsp;
                    <a
                    //   href="#!"
                      onClick={navigateToRegister}
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out cursor-pointer"
                      >Register</a
                    >
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
     

    )
}

export default Login;