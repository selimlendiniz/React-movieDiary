import React, {useEffect, useState} from 'react';
import {json, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import './movie.css'
import {
    addMovie,
    changeDraftMovieId,
    changeDraftMovieImagePath,
    changeDraftMovieName,
    deleteMovie, getUserMovie
} from "../../redux/movieSlice";
import {useDispatch, useSelector} from "react-redux";
import {movieDidWatched, useMoviesLister} from "../../config/firebase";

function Movie(props) {

    const [watched,setWatched] = useState(false);

    const API_URL = "https://api.themoviedb.org/3";
    const MOVIE_API_KEY = "e06bddda7744a28a17a1125d9773eb36";

    const [movie,setMovie] = useState(null);
    const urlParams = useParams();
    const location = useLocation();
    const dispatch = useDispatch();







    const fetchMovie = async (movie) => {
        const data = await axios.get(`${API_URL}/movie/${movie}`,{
            params:{
                api_key:MOVIE_API_KEY,
            },

        })
        dispatch(changeDraftMovieId(data.data.id));
        dispatch(changeDraftMovieName(data.data.title));
        dispatch(changeDraftMovieImagePath(data.data.poster_path));
        setMovie(data.data);

    }









    useEffect(() => {
        fetchMovie(urlParams.movieid)
        movieDidWatched(urlParams.movieid).then((e) => {
            setWatched(e)
        })



    },[urlParams.movieid])





    const handleClick = () => {

        if (watched)
        {
            dispatch(deleteMovie(movie.id))
            setWatched(false);
        }
        else
        {
            dispatch(addMovie())
            setWatched(true);
        }





    }



    return (
        <div className={"movie-page"}>



            {movie &&

                <div className={"movie-container"}>
                    <div className={"page-up-container"}>

                        <img className={"movie-page-img"} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>

                        <div>
                            <div>
                                <div className={"title-container"}>
                                    <h1 className={"text title"}>{movie.title}</h1>
                                    <h2 className={"text"}>Vote Average: {movie.vote_average}</h2>
                                </div>
                                <div className={"title-container"}>
                                    <p className={"text title"}>Release Date: {movie.release_date}</p>
                                    <p className={"text"}>Populartiy: {movie.popularity}</p>
                                </div>

                            </div>
                            <div>
                                <p className={"text"}>{movie.overview}</p>
                            </div>
                            <div className={"movie-page-button-container"}>
                                <button onClick={handleClick} className={"movie-page-button"}>{watched ? "Remove Watched" :"Add Watched"}</button>
                            </div>
                        </div>
                    </div>
                </div>



            }



        </div>
    );
}

export default Movie;