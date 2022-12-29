import React, {useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useCurrentUser, useIsLoggedIn} from "../config/hooks";
import SearchIcon from '@mui/icons-material/Search';
import {
    alpha,
    AppBar, Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, InputBase,
    Menu,
    MenuItem, styled,
    Toolbar,
    Typography
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Navbar from "../components/navbar/Navbar";
import PrimarySearchAppBar from "../components/navbar/Navbar";

function Layout() {

    const isLoggedIn = useIsLoggedIn();


    if (isLoggedIn === null) return <h1>Loading...</h1>;
    else if (isLoggedIn === false ) return <Navigate replace to="/signIn" />




    return (
        <>
            <Navbar />
            <Outlet/>


        </>

    );
}

export default Layout;