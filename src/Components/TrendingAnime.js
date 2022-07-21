import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AnimeCard from "./AnimeCard";

function TrendingAnime() {

    const [trendingList, setTrendingList] = useState([])
    const [content, setContent] = useState(<div></div>)
    const url = "https://kitsu.io/api/edge/trending/anime"

    useEffect(() =>     
    {
        axios.get(url)
            .then( (response) => {
                
                    setTrendingList(response.data.data)
                
       
            })
            .catch((err) => console.log(["APIGet error:", err]));
    }, [])

    useEffect(() =>     
    {
        if(trendingList.length > 0) {
            let temp =
                trendingList.map((anime) => {
                    
                    return(
                        <AnimeCard anime={anime} key={anime.attributes.posterImage.small}></AnimeCard>   
                    )
                    
                })

            setContent(temp)
        }
        
    }, [trendingList])



   

    return (
        <div className="flex flex-wrap">
           {content}
        </div>
    )
}

export default TrendingAnime;