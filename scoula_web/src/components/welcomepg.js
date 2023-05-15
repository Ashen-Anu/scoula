import React from "react";
import "./welcome.css";
import { Link } from "react-router-dom";

const WelcomePage=()=>
{
    return(
        <div className="flex justify-center items-center h-screen">
        <div className="coverr">
        <h1 className="text-5xl font-bold">Welcome to ScoulaLK</h1>
        <span className="py-3 text-xl w-2/3 text-center text-gray-500">Select your Role</span>
        <div className="login-btnn">
        <Link to='/parentLogin'><button><h1 className="buttonntext"> Login as Parent </h1></button></Link>
        </div>
        <div className="login-btnn">
        <Link to='/ownerLoginEmail'><button><h1 className="buttonntext"> Login as Owner </h1></button></Link>
        </div>
        </div>
        </div>
    )
}
export default WelcomePage