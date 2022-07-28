import React, { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase.config";

import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'




function AnimeCard(props) {
    const db = getFirestore(app)

    const [overlay, setOverlay] = useState(<div/>)

    const userRef = doc(db, "users", props.user);


    useEffect(() => {
        if(props.added === false){
            setOverlay(
                <div className=" flex-col h-full w-50 cursor-pointer opacity-0 hover:opacity-90 block absolute top-0 left-0   bg-slate-400">
                    <img 
                        className="" 
                        src='/add-icon.png'
                        onClick={()=> {add(props.anime)}}
                    >
                    </img>
                    <div className="flex justify-center text-slate-600 font-extrabold text-xl">
                        ADD
                    </div>
                    
                </div>
            )
        } else {
            setOverlay(
                <div className="flex-col h-full w-50 cursor-pointer opacity-0 hover:opacity-90 block absolute top-0 left-0   bg-slate-400">
                    <img 
                        className="" 
                        src='/remove-icon.png'
                        onClick={()=> {remove(props.anime)}}
                    >
                    </img>
                    <div className="flex justify-center text-slate-600 font-extrabold text-xl">
                        REMOVE
                    </div>
                        
                </div>
            )
        }
    })


    function addedToast(animeName) {
        toast(`Successfully Added ${animeName}`, {
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    function removeToast(animeName) {
        toast(`Successfully Removed ${animeName}`, {
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    async function add(animeData) {
        await updateDoc(userRef, {
            anime_list: arrayUnion(animeData)
        });
        console.log(animeData)
        addedToast(animeData.attributes.canonicalTitle)
    }


    async function remove(animeData) {
        await updateDoc(userRef, {
            anime_list: arrayRemove(animeData)
        });
        removeToast(animeData.attributes.canonicalTitle)
    }

    return (
        

            <div className="h-100 w-80 p-2.5 relative">
                <img 
                    className="h-90 w-80 cursor-pointer" 
                    src={props.anime.attributes.posterImage.small}
                    onClick={()=> {
                        if(props.added === false) {
                            add(props.anime)
                            
                        } else {
                            remove(props.anime)
                        }   
                        
                    }}
                />
               
                
                {overlay}
                    
                
                

                {props.anime.attributes.canonicalTitle}


                <ToastContainer draggable={false} transition={Zoom} autoClose={4000} />

                
            </div>

    

    )
}

export default AnimeCard;