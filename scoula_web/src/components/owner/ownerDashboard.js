import React from "react";
import "./ownercomp.css";
import { Link, useNavigate } from "react-router-dom";




export default function OwnerDashboard(){
    const navigate=useNavigate();

    function userLogout(){
        localStorage.removeItem('token');
        navigate('/')
    }
    return(
        <div className="main">
            <div className="sidebar">
            <ul className="comp-sidebar">
                <Link to="/parentdashboard">
                <ul>
                    <li>Parent Dashboard</li>
                </ul>
                </Link>
                <Link to="/home">
                <ul>
                    <li>Home</li>
                </ul>
                </Link>
                <Link to="/searchvehicles">
                <ul>
                    <li>Search Vehicles</li>
                </ul>
                </Link>
                <Link to="/enrolledstudents">
                <ul>
                    <li>Students Enrolled</li>
                </ul>
                </Link>
                <Link to='/location'>
                <ul>
                    <li>Location</li>
                </ul>
                </Link>
                <Link onClick={userLogout} to="/">
                <ul>
                    <li>Log Out</li>
                </ul>
                </Link>
            </ul>
            </div>
        </div>
    )
}