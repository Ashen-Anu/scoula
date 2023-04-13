import React from "react";
import "../styles/login.css";
import avatar from "../../assets/images/logo.png"
import { Link,useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../../helper/validate";
import useFetch from "../../hooks/fetch.hook";
import { useAuthStore } from "../../store";
import { verifyPassword } from "../../helper/helper";

const Password= () =>
{
    const navigate=useNavigate()
    const { email }= useAuthStore(state=> state.auth)
    const [{isLoading, serverError}] =useFetch(`/user/${email}`)
    const formik= useFormik({
        initialValues:{
            password:'',
        },
        validate: passwordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{

            
            let loginPromise= verifyPassword({email, password:values.password})
            toast.promise(loginPromise,{
                loading: 'Verifying your account...',
                success: <b>Login Successful</b>,
                error:<b>Password do not match</b>
            });
            loginPromise.then (res=>{
                let {token} = res.data;
                localStorage.setItem('token',token)
                navigate('/home')
            })
        }
    })

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
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
                <input {...formik.getFieldProps('password')} type="password" placeholder="Enter your Password" name="password" id="password"></input>
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
export default Password