import React from "react";
import "./styles/reg.css";
import { Link , useNavigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

const Profile= () =>
{
    const navigate=useNavigate();
    const formik= useFormik({
        initialValues:{
            fname:'',
            lname:'',
            nic:'',
            email:'',
            address:'',
        },
        
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
            console.log(values);
        }
    })
    function userLogout(){
        localStorage.removeItem('token');
        navigate('/')
    }
    return (
        <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="cover">

            <form className="cover" onSubmit={formik.handleSubmit}>
            
            <h1 className="text-5xl font-bold">Profile</h1>
            
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Update your account</span>

            <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('fname')} type="text" placeholder="First Name" name="fname" id="fname"></input>
                <input {...formik.getFieldProps('lname')} type="text" placeholder="First Name" name="lname" id="lname"></input>
            </div>
            <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('nic')} type="text" placeholder="NIC" name="nic" id="nic"></input>
                <input {...formik.getFieldProps('email')} type="email" placeholder="Email" name="email" id="email"></input>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
                <textarea {...formik.getFieldProps('address')} type="text" placeholder="Address" name="address" id="address"></textarea>
            </div>
            
            <div className="login-btn">
                <button><h1 className="buttontext">Update</h1></button>
            </div>
            
            <span className="text-gray-500">Logout <Link onClick={userLogout} className="text-red-500"  to="/">Click me!</Link></span>
            </form> 

        </div>
        </div>
    );
}
export default Profile