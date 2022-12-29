import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import AuthLayout from "../layout/AuthLayout";
import Layout from "../layout/Layout";
import Movie from "../pages/Movie/Movie";
import Profile from "../pages/Profile/Profile";

function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/profile"} element={<Profile/>} />
                    <Route path={"/moviePage/:movieid"} element={<Movie/>} />
                </Route>



                <Route element={<AuthLayout/>}>
                    <Route path="/signIn" element={<SignIn/>} />
                    <Route path="/signUp" element={<SignUp/>} />
                </Route>


            </Routes>
        </BrowserRouter>
    );
}

export default Router;