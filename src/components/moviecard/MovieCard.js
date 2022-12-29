import React from 'react';
import "./movieCard.css"
import {useNavigate} from "react-router-dom";

function MovieCard({movie}) {

    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
    const navigate = useNavigate();


    return (



        <div className={"movie-card"}>
            <button className={"movie-card movie-card-btn"} onClick={() => {
                navigate(`/moviePage/${movie.id}`)
            }
            }>
            <img className={"movie-card-img"} src={`${IMAGE_PATH}${movie.poster_path}`} />
            <p className={"movie-card-title"}>{movie.title}</p>
            </button>
        </div>

    );
}

export default MovieCard;