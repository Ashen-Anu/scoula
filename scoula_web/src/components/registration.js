import React from "react";
import "./styles/reg.css";
import avatar from "../assets/images/logo.png"
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidate } from "../helper/validate";
import { registerUser } from "../helper/helper";


const Registration= () =>
{
    const navigate= useNavigate()
    const formik= useFormik({
        initialValues:{
            email:'',
            mobile:'',
            password:'',
            role:''
        },
        validate: registerValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
            let registerPromise= registerUser(values)
            toast.promise(registerPromise,{
                loading:'Creating....',
                success:<b>Registered Successfully</b>,
                error: <b>Could not Register</b>
            });

            registerPromise.then(function(){navigate('/')})
        }
    })
    return (
        <div className="bgcol">
        <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="cover">

            <form className="cover" onSubmit={formik.handleSubmit}>
            
            <h1 className="text-5xl font-bold">Register</h1>
            
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Hurry up! Register to find your child a school van</span>

            <div className="profile flex justify-center py-4">
                <label htmlFor="">
                    <img className="profile_img" src={avatar} alt="avatar"></img>
                </label>
                <input type="file" id="profile" name="profile"></input>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('email')} type="email" placeholder="Enter your Email" name="email" id="email"></input>
                <input {...formik.getFieldProps('mobile')} type="text" placeholder="Enter your Mobile Number" name="mobile" id="mobile"></input>
                <input {...formik.getFieldProps('password')} type="password" placeholder="Enter your password" name="password" id="password"></input>
                <input {...formik.getFieldProps('role')} type="text" placeholder="Role (Parent, Driver, Owner)" name="role" id="role"></input>
            </div>
            
            <div className="login-btn">
                <button><h1 className="buttontext">Sign Up</h1></button>
            </div>
            
            <span className="text-gray-500">Already have an account? <Link className="text-red-500"  to="/">Login Now</Link></span>
            </form> 

        </div>
        </div>
        </div>
    );
}
export default Registration