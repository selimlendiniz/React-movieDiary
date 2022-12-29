import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useEffect} from "react";
import axios, {options} from "axios";
import {Autocomplete, Stack, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase";





export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [result, setResult] = React.useState([
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 }]);

    const navigate = useNavigate();


    const isMenuOpen = Boolean(anchorEl);


    const API_URL = "https://api.themoviedb.org/3";
    const MOVIE_API_KEY = "e06bddda7744a28a17a1125d9773eb36";

    const fetchSearch = async (movie) => {
        const data = await axios.get(`${API_URL}/search/movie?query=${movie}`,{
            params:{
                api_key:MOVIE_API_KEY,
            },

        })
        setResult(data.data.results);
    }

    const handleSearch = (event) => {

        fetchSearch(event.target.value);

    }

    const handleChange = (event,newValue) => {
        navigate(`/moviePage/${newValue.id}`, { state:{movie:newValue}})
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickProfile = () => {
        navigate("/profile")
        setAnchorEl(null);

    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }



    const handleLogOutClose = (e) => {

        signOut(auth);
        setAnchorEl(null);

    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleClickProfile}>Watched</MenuItem>
            <MenuItem onClick={handleLogOutClose}>Log Out</MenuItem>
        </Menu>
    );





    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}

                    >
                        <div onClick={() => {
                            navigate("")
                        }
                        }>
                            Movie Diary
                        </div>

                    </Typography>
                    <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                        onChange={handleChange}
                        style={{marginLeft:"30px"}}
                        onInputChange={handleSearch}
                        freeSolo
                        id="search-input"
                        disableClearable
                        options={result}
                        getOptionLabel={ (option) => option.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    </Stack>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
