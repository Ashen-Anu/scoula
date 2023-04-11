import React, { useEffect, useState } from "react"
import "./styles/login.css";
import { useAuthStore } from "../store"
import { Toaster, toast } from "react-hot-toast"
import { generateOTP, verifyOTP } from '../helper/helper'
import { useNavigate } from 'react-router-dom'


const PasswordRecover= () =>
{
    const { email }= useAuthStore(state=>state.auth)
    const [OTP, setOTP]=useState();
    const navigate =useNavigate();
    useEffect(()=>{
        generateOTP(email).then((OTP)=>{
            console.log(OTP)
            if(OTP) return toast.success('OTP has been send to your email!')
            return toast.error('Problem while generating the OTP')
        })
    },[email])
    
    async function onSubmit(e){
        e.preventDefault();
        try {
            let {status}= await verifyOTP({email, code: OTP})
        if(status===201){
            toast.success('Verified!')
            return navigate('/reset')
        }}
        catch (error) {
            return toast.error('Wrong OTP! Check your email again')
        }
    }

    //resend OTP 
    function resendOTP(){
        let sendPromise= generateOTP(email);
        toast.promise(sendPromise,{
            loading:'Sending...',
            success:<b>OTP has been send to your email successfully</b>,
            error:<b>Could not send it</b>
        })
        sendPromise.then(OTP=>{
           // console.log(OTP)
        })
    }
    return (
        <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="cover">

            <form className="cover" onSubmit={onSubmit}>
            
            <h1 className="text-5xl font-bold">Password Recovery</h1>
            
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter OTP to recover the password</span>
    
            
            <div className="textbox flex flex-col items-center gap-6">
    
                <div className="input text-center">
                <input onChange={(e)=>setOTP(e.target.value)} type="password" placeholder="OTP" name="password" id="password"></input>
                </div>
            </div>
            
            <div className="login-btn">
                <button><h1 className="buttontext">Recover Now</h1></button>
                
            </div>
            </form>
            <span className="text-gray-500">Can't get OTP? <button onClick={resendOTP} className="text-red-500">Resend</button></span> 

        </div>
        </div>
    );
}
export default PasswordRecover