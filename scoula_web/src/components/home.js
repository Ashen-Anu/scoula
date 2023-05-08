import React from "react";
import "./styles/redirect.css";
import logo from "../assets/images/logoo.png";
import { useNavigate} from "react-router-dom";

const Home= () =>
{
    const navigate=useNavigate();
    
    function userLogout(){
        localStorage.removeItem('token');
        navigate('/')
    }
    return (
        <div className="gg">
            <nav className="navbar">
                <img src={logo} className="logo" alt=""></img>
                <ul className="list">
                    <li className="li"><a className="anch" href="/home">Home</a></li>
                    <li className="li"><a className="anch" href="/viewvehicles">Search</a></li>
                    <li className="li"><a className="anch" href="/parentdashboard">Parent</a></li>
                    <li className="li"><a className="anch" href="/ownerdashboard">Owner</a></li>
                    <li className="li"><a className="anch" href="/aboutus">About Us</a></li>
                    <li className="li"><a className="anch" onClick={userLogout} href="/">Logout</a></li>
                </ul>
            </nav>
        </div>
    )
}
export default Home