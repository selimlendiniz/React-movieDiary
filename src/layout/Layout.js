import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useIsLoggedIn} from "../config/hooks";

function Layout() {

    const isLoggedIn = useIsLoggedIn();

    if (isLoggedIn === null) return <h1>Loading...</h1>;
    else if (isLoggedIn === false ) return <Navigate replace to="/signIn" />

    return (
        <Outlet />
    );
}

export default Layout;