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
import {app, auth, analytics} from '../firebase.config'
import AnimeCard from "../Components/AnimeCard";

import "@fortawesome/fontawesome-svg-core";
import {faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


function My_List() {
    const db = getFirestore(app)

    const [animeList, setAnimeList] = useState([]);
    const [content, setContent] = useState(<div/>)

    const navigate = useNavigate();

    


    useEffect(() => 
    {
        onAuthStateChanged(auth, (user) => {
            if (!(user)) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              // ...
                
              navigate('/')
            } 
            else{
                const docRef = doc(db, "users", auth.currentUser.email)
                getDoc(docRef).then(docSnap => {
                    
                    if (docSnap.exists()) {
                        setAnimeList(docSnap.data().anime_list)
                    } else {
                        console.log("No such document!");
                    }
                })


                if(animeList.length > 0) {
                    let temp =
                    animeList.map((anime) => {
                            return(
                                <AnimeCard anime={anime} user={auth.currentUser.email} added={true} key={anime.attributes.posterImage.small}></AnimeCard>   
                            )
                            
                        })

                    setContent(temp)
                }else {
                    setContent(<div>YOUR ANIME LIST IS CURRENTLY EMPTY</div>)
                }
                    }
                        
                });
  
    }, [auth, animeList]);

    return (
        <div className="flex flex-col">
            <div>
                THIS IS MY LIST
            </div>

            <div className="flex flex-wrap">
                {content}
            </div>
            

            
        </div>
        
    )
}

export default My_List;