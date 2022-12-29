import {configureStore} from "@reduxjs/toolkit";
import auth from './authSlice'
import movies from './movieSlice'

export const store= configureStore({
    reducer:{
        auth,
        movies,
    }
})