import React from 'react';
import {useMoviesLister} from "../../config/firebase";
import {useSelector} from "react-redux";
import "./Profile.css"
import MovieCard from "../../components/moviecard/MovieCard";
import FlatList from 'flatlist-react';

function Profile() {

    useMoviesLister();
    const movies = useSelector(state => (state.movies.movies));



    return (
        <div className={"profile-page"}>
            <div className={"profile-page-container"}>
                <h1 className={"profile-page-title"}>İzlediklerim</h1>
                <div className={"profile-page-watched-container"}>
                    <FlatList
                        list={movies}
                        renderItem={(movie) => <MovieCard movie={movie} />}
                        displayGrid={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;