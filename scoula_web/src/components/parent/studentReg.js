import React from "react";
import "./parentcomp.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { studentVal } from "../../helper/validate";
import { addVehicle } from "../../helper/helper";

const StudentEnrol= () =>
{
    const navigate= useNavigate()
    const formik= useFormik({
        initialValues:{
            student_name:'',
            mobile_number:'',
            start_location:'',
            end_location:'',
        },
        validate: [studentVal],
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
            let studentPromise= addVehicle(values)
            toast.promise(studentPromise,{
                loading:'Creating....',
                success:<b>Student Added</b>,
                error: <b>Could not add Student</b>
            });
            studentPromise.then(function(){navigate('/parentdashboard')})
        }
    })
    return (
        <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="cover">

            <form className="cover" onSubmit={formik.handleSubmit}>
            
            <h1 className="text-5xl font-bold">Profile</h1>
            
            
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Add your student</span>
            
            <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('student_name')} type="text" placeholder="Student Name"></input>
                <input {...formik.getFieldProps('mobile_number')} type="number" placeholder="Mobile Number"></input>
            </div>
            <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('start_location')} type="text" placeholder="Start Location"></input>
                <input {...formik.getFieldProps('end_location')} type="text" placeholder="End Location"></input>
            </div>
            
            <div className="login-btn">
                <button><h1 className="buttontext"> Enrol Student</h1></button>
            </div>
            
            <span className="text-gray-500">Back to Dashboard <Link className="text-red-500"  to="/parentdashboard">Click me!</Link></span>
            </form> 

        </div>
        </div>
    );
}
export default StudentEnrol