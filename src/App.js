import React, {useEffect, useMemo, useRef, useState} from 'react'
import './Styles/App.css'
import {BrowserRouter, Link, Navigate, Route, Router, Routes} from "react-router-dom";
import About from "./Pages/About";
import Posts from "./Pages/Posts";
import Navbar from "./Components/UI/Navbar/Navbar";
import Error from "./Pages/Error";
import AppRouter from "./Components/AppRouter";
import {AuthContext} from "./context";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
