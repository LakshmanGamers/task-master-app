import React from "react";
import {useNavigate } from 'react-router-dom';
export default function Error(){
    const navigate = useNavigate();
    function handleClick(){
        localStorage.removeItem('user');
        localStorage.removeItem('uid');

        navigate('/')
    }
    return(
        <div style={{display : "flex"  , justifyContent : "center" , alignItems : "center"}}>
        <p>You are not authorized to view this page</p>
        <p> Please Login to access this page</p>
        <button onClick={handleClick}> 
            Home
        </button>
        </div>
    )
}