import { useState, React, useRef, useEffect } from "react";
import {Routes, Route, useNavigate, Router} from 'react-router-dom';

import TrendingAnime from "../Components/TrendingAnime";


import {app, auth, analytics} from '../firebase.config'
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore/lite";


import axios from "axios";
import { 
    signInWithEmailAndPassword, 
    getAuth, 
    createUserWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    onAuthStateChanged } 
from "firebase/auth";
import AnimeCard from "../Components/AnimeCard";

import "@fortawesome/fontawesome-svg-core";
import {faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Content() {
    const db = getFirestore(app)

    const [username, setUsername] = useState("");
    const [logout, setLogout] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    const [animeSearch, setAnimeSearch] = useState("");
    const [anime, setAnime] = useState(null);
    
    const [content, setContent] = useState(<div></div>);
    const [contentNav, setContentNav] = useState(<div/>);

    const [pageNum, setPageNum] = useState(1);
    const [maxPages, setMaxPages] = useState(null);

    const navigate = useNavigate();

    

    let animeURL = `https://kitsu.io/api/edge/anime?filter[text]=${animeSearch}`

    function getAnime() {
        axios.get(animeURL)
        .then(response => {
            
            setAnime(response.data)

            let count = response.data.meta.count
            setMaxPages(Math.floor(count/10))
            

        })
        .catch(() => {
        })

    }

    function navigatePages(pageURL) {
        axios.get(pageURL)
        .then(response => {
            
            setAnime(response.data)
        })
        .catch(() => {
        })
    }
    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              // ...
                setContent(<TrendingAnime user={auth.currentUser.email}/>)
                const docRef = doc(db, "users", auth.currentUser.email)
                getDoc(docRef).then(docSnap => {
                    if (docSnap.exists()) {
                        setUsername(docSnap.data().username)
                    } else {
                      console.log("No such document!");
                    }
                  })


                  if(anime) {
                    let temp =
                        anime.data.map((anime) => {
                            
                            return(
                                <AnimeCard anime={anime} user={auth.currentUser.email} added={false} key={anime.attributes.posterImage.small}></AnimeCard>   
                            )
                            
                        })
        
                    setContent(temp)
        
        
                    // let firstPage = anime.links.first
                    // let lastPage = anime.links.last
                    

                    if(anime.data.length > 0){
                        //check if first page
                        setPageNum(1)
                        if(!("prev" in anime.links)){
                            setContentNav(
                                <div className="flex justify-center">
                                    <div>
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(1)
                                                navigatePages(anime.links.first)
                                            }}  
                                            hidden  
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAnglesLeft} />
                                                    </div>
            
                                                    <div>
                                                        first
                                                    </div>
                                                </div>
                                                
                                        </button>
            
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(pageNum - 1)
                                                navigatePages(anime.links.prev)
                                            }}    
                                            hidden 
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </div>
            
                                                    <div>
                                                        prev
                                                    </div>
                                                </div>
                                                
                                        </button>




                                        {pageNum} / {maxPages}



                                        
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(pageNum + 1)
                                                navigatePages(anime.links.next)
                                            }}   
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
            
                                                    <div>
                                                        next
                                                    </div>
                                                </div>
                                                
                                        </button>
            
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(maxPages)
                                                navigatePages(anime.links.last)
                                            }} 
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAnglesRight} />
                                                    </div>
            
                                                    <div>
                                                        last
                                                    </div>
                                                </div>
                                                
                                        </button>
                                    </div>
                                </div>
                                
                            )
                        } 
                        //check if last page
                        else if(!("next" in anime.links)) {
                            setPageNum(1)
                            setContentNav(
                                <div className="flex justify-center">
                                    <div>
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(1)
                                                navigatePages(anime.links.first)
                                            }}  
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAnglesLeft} />
                                                    </div>
            
                                                    <div>
                                                        first
                                                    </div>
                                                </div>
                                                
                                        </button>
            
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(pageNum - 1)
                                                navigatePages(anime.links.prev)
                                            }}                                          
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </div>
            
                                                    <div>
                                                        prev
                                                    </div>
                                                </div>
                                                
                                        </button>



                                        {pageNum} / {maxPages}


            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(pageNum + 1)
                                                navigatePages(anime.links.next)
                                            }}    
                                            hidden  
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
            
                                                    <div>
                                                        next
                                                    </div>
                                                </div>
                                                
                                        </button>
            
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(maxPages)
                                                navigatePages(anime.links.last)
                                            }}      
                                            hidden
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAnglesRight} />
                                                    </div>
            
                                                    <div>
                                                        last
                                                    </div>
                                                </div>
                                                
                                        </button>
                                    </div>
                                </div>
                                
                            )
                            
                        }
                        //else
                        else{
                            setContentNav(
                                <div className="flex justify-center">
                                    <div>
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(1)
                                                navigatePages(anime.links.first)
                                            }}     
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAnglesLeft} />
                                                    </div>
            
                                                    <div>
                                                        first
                                                    </div>
                                                </div>
                                                
                                        </button>
            
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(pageNum - 1)
                                                navigatePages(anime.links.prev)
                                            }}      
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </div>
            
                                                    <div>
                                                        prev
                                                    </div>
                                                </div>
                                                
                                        </button>

                                        {pageNum} / {maxPages}
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(pageNum + 1)
                                                navigatePages(anime.links.next)
                                            }}  
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
            
                                                    <div>
                                                        next
                                                    </div>
                                                </div>
                                                
                                        </button>
            
            
                                        <button 
                                            type="button" 
                                            className="bg-rose-600 text-white ml-4 p-2 rounded"
                                            onClick={() => {
                                                setPageNum(maxPages)
                                                navigatePages(anime.links.last)
                                            }}      
                                        >
                                                <div className="flex-col">
                                                    <div>
                                                        <FontAwesomeIcon icon={faAnglesRight} />
                                                    </div>
            
                                                    <div>
                                                        last
                                                    </div>
                                                </div>
                                                
                                        </button>
                                    </div>
                                </div>
                                
                                
                            )
        
                        }
                    } else{
                        setContent(
                            <div>
                                No Content. Try Another Search. (Titles are 'space senstive')
                            </div>
                        )
                        setContentNav(<div></div>)
                    }
                    
                    
                    
                }
            } else {
                setLoggedIn(false)

                
            }
                
        })
    

    }, [auth, anime]);

    



    

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
                <input
                id="animeName"
                name="animeName"
                value={animeSearch}
                onChange={e => 
                    {
                    setAnimeSearch(e.target.value);
                    }
                }
                onKeyPress={(e) => {
                    if(e.key === "Enter") {
                        getAnime()
                    }}
                }
                className="border border-solid border-gray-300 rounded"
                />

                <button 
                    type="button" 
                    className="bg-rose-600 text-white ml-4 p-2 rounded"
                    onClick={() => getAnime()}
                >
                    SUBMIT
                </button>
            </div>

            <div className="">
                {content}
            </div>
            
            {contentNav}
            
            
            
        </div>
           
    )
}

export default Content;