import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {setDoc, doc, deleteDoc, getDoc, collection, onSnapshot} from "firebase/firestore";
import {auth, db} from "../config/firebase";
import {useEffect, useState} from "react";

const initialState = {
    draftMovie:{
        name:'avatar',
        movieId:'123123',
        poster_path:'salla'
    },
    movies:[]

}

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        changeDraftMovieName:(state, action) => {
            state.draftMovie.name = action.payload;
        },
        changeDraftMovieId:(state, action) => {
            state.draftMovie.movieId = action.payload;
        },
        changeDraftMovieImagePath:(state, action) => {
            state.draftMovie.poster_path = action.payload;
        },
        clearDraftMovie: state => {
            state.draftMovie = initialState.draftMovie;
        },
        setMovie: (state, action) => {
            state.movies = action.payload
        }

    }


})

export const addMovie = createAsyncThunk("movies/addMovie",async (_,{getState}) => {
    const uid = auth.currentUser?.uid
    console.log(getState().movies.draftMovie)
    await setDoc(doc(db,`users/${uid}/movies/${getState().movies.draftMovie.movieId}`), {
        title:getState().movies.draftMovie.name,
        id:getState().movies.draftMovie.movieId,
        poster_path:getState().movies.draftMovie.poster_path
    })


})


export const deleteMovie = createAsyncThunk("movies/deleteMovie",async (movieId) => {
    const uid = auth.currentUser?.uid
    await deleteDoc(doc(db,`users/${uid}/movies/${movieId}`))
})






export const {changeDraftMovieName,changeDraftMovieId,changeDraftMovieImagePath,clearDraftMovie,setMovie} = movieSlice.actions;

export default movieSlice.reducer;