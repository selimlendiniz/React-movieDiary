import React, {useEffect, useState} from 'react';
import {signOut} from "firebase/auth";
import {auth,  useMoviesLister} from "../../config/firebase";
import axios from "axios";
import MovieCard from "../../components/moviecard/MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import {useDispatch, useSelector} from "react-redux";



function Home() {

    const API_URL = "https://api.themoviedb.org/3";
    const MOVIE_API_KEY = "e06bddda7744a28a17a1125d9773eb36";
    const [movies,setMovies] = useState([]);

    const fetchMovies = async () => {
        const data = await axios.get(`${API_URL}/discover/movie`,{
            params:{
                api_key:MOVIE_API_KEY
            }
        })
        setMovies(data.data.results);
    }


    useEffect(() => {
       fetchMovies();
    },[])

    const renderMovies = () => (

      movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
      ))


    )

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useMoviesLister();
    const dispatch = useDispatch();

    const movies2 = useSelector((state) => state.movies.movies)




    return (
        <div className={"home-page"}>



            <div className={"slider-container"}>
                <h1 style={{color:"white"}}>Vizyondakiler</h1>
                <Slider {...settings}>
                    {renderMovies()}
                </Slider>





            </div>


            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div>
                Selim
            </div>




        </div>
    );
}

export default Home;