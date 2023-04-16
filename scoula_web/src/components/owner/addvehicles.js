import React, { useState } from "react";
import "./ownercomp.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { addVehicleValidate } from "../../helper/validate";
import { addVehicle } from "../../helper/helper";
import convertToBase64 from '../../helper/convert';

const AddVehicles= () =>
{
    const navigate= useNavigate()
    const [file,setFile]= useState()

    const formik= useFormik({
        initialValues:{
            vehicle_model:'',
            vehicle_number:'',
            mobile:'',
            seating_capacity:'',
            start_location:'',
            end_location:'',
            start_time:'',
            end_time:'',
            route:''
        },
        validate: addVehicleValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
            values= await Object.assign(values,{photo : file || ''})
            let vehiclePromise= addVehicle(values)
            toast.promise(vehiclePromise,{
                loading:'Creating....',
                success:<b>Vehicle Added</b>,
                error: <b>Could not add vehicle</b>
            });
            vehiclePromise.then(function(){navigate('/ownerdashboard')})
        }
    })

    /** Convert image because formik doesnt support file uploading */
    const onUpload= async e=>{
        const base64= await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    return (
        <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="cover">

            <form className="cover" onSubmit={formik.handleSubmit}>
            
            <h1 className="text-5xl font-bold">Add Vehicle</h1>
            
            
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Update your account</span>
            
            <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('vehicle_model')} name="vehicle_model" id="vehicle_model" type="text" placeholder="Vehicle Model"></input>
                <input {...formik.getFieldProps('vehicle_number')} name="vehicle_number" id="vehicle_number"  type="text" placeholder="Vehicle Number"></input>
            </div>
            <div className="name flex w-3/4 gap-10">
            <input {...formik.getFieldProps('mobile')} type="text" placeholder="Enter your Mobile Number" name="mobile" id="mobile"></input>
                <input {...formik.getFieldProps('seating_capacity')} name="seating_capacity" id="seating_capacity" type="number" placeholder="Seating Capacity"></input>
            </div>
            <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('start_location')} name="start_location" id="start_location" type="text" placeholder="Start Location"></input>
                <input {...formik.getFieldProps('end_location')} name="end_location" id="end_location" type="text" placeholder="End Location"></input>
            </div>
            <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('start_time')} name="start_time" id="start_time" type="text" placeholder="Start Time"></input>
                <input {...formik.getFieldProps('end_time')} name="end_time" id="end_time" type="text" placeholder="End Time"></input>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
                <textarea {...formik.getFieldProps('route')} name="route" id="route" type="text" placeholder="Route"></textarea>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
            <label htmlFor="photo" className="photoUp"> Click here to upload photo </label>
                <input onChange={onUpload} type="file" name="photo" id="photo"></input>
            </div>
            
            <div className="login-btn">
                <button><h1 className="buttontext">Add Vehicle</h1></button>
            </div>
            
            <span className="text-gray-500">Back to Dashboard <Link className="text-red-500"  to="/ownerdashboard">Click me!</Link></span>
            </form> 

        </div>
        </div>
    );
}
export default AddVehicles