import React, { useEffect, useState } from "react";




function AnimeCard(props) {
    console.log(props.anime)



    return (
        <div>
            <img className="object-cover h-70 w-50" src={props.anime.attributes.posterImage.small}></img>
            {props.anime.attributes.canonicalTitle}
        </div>
    )
}

export default AnimeCard;