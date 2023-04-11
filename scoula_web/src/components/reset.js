import React, { useEffect } from "react";
import "./styles/reset.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetpasswordVal } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store";
import { useNavigate, Navigate, Link } from "react-router-dom";
import useFetch from '../hooks/fetch.hook'

const Reset= () =>
{
    const {email}=useAuthStore(state=>state.auth)
    const navigate= useNavigate()
    const [{isLoading,apiData,status,serverError }] = useFetch('createResetSession')

    
    
    const formik= useFormik({
        initialValues:{
            password:'',
            cpassword:'',
        },
        validate: resetpasswordVal,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
           let resetPromise= resetPassword({ email, password:values.password })

           toast.promise(resetPromise,{
            loading:'updating...',
            success:<b>Reset Successfully</b>,
            error:<b>Could not Reset!</b>
           });

           resetPromise.then(function(){navigate('/password')})
        }
    })

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if(status && status!==201) return <Navigate to={'/password'} replace={true}></Navigate>
    
    return (
        <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="cover">

            <form className="cover" onSubmit={formik.handleSubmit}>
            
            <h1 className="text-5xl font-bold">Reset</h1>
            

            <div style={{ marginTop:"10px"}} className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('password')} type="password" placeholder="New Password" name="password" id="password"></input>
                <input {...formik.getFieldProps('cpassword')} type="password" placeholder="Re-enter New Password" name="cpassword" id="cpassword"></input>
            </div>
            
            <div className="login-btn">
                <button><h1 className="buttontext">Sign In</h1></button>
                
            </div>
            <span className="text-gray-500">Forgot Password? <Link className="text-red-500"  to="/PasswordRecover">Recover Now</Link></span>
            </form> 

        </div>
        </div>
    );
}
export default Reset