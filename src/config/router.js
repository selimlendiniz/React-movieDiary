import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import AuthLayout from "../layout/AuthLayout";
import Layout from "../layout/Layout";

function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route path={"/"} element={<Home/>} />
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