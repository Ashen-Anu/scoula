import React from "react";
import "../styles/login.css";
import avatar from "../../assets/images/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../../helper/validate";
import { useAuthStore } from "../../store";

const LoginEmail= () =>
{

    const navigate = useNavigate();

    const setEmail= useAuthStore(state=> state.setEmail)
    

    
    const formik= useFormik({
        initialValues:{
            email:'',
        },
        validate: usernameValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
            setEmail(values.email)
            navigate('/password')
        }
    })
    return (
        <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="cover">

            <form className="cover" onSubmit={formik.handleSubmit}>
            
            <h1 className="text-5xl font-bold">Login</h1>
            
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Hurry up! Login to find your child a school van</span>

            <div className="profile flex justify-center py-4">
                <img className="profile_img" src={avatar} alt="avatar"></img>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('email')} type="email" placeholder="Enter your Email" name="email" id="email"></input>
            </div>
            
            <div className="login-btn">
                <button><h1 className="buttontext">Let's Go</h1></button>
                
            </div>
            <span className="text-gray-500">Not a member? <Link className="text-red-500"  to="/registration">Register Now</Link></span>
            </form> 

        </div>
        </div>
    );
}
export default LoginEmail