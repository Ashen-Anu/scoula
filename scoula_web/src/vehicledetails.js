import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
axios.defaults.baseURL="http://localhost:8080";
const Vehicledetails = () => {

  /** Have to solve the error which prevents getting the data */
  const { id }= useParams();
  const [vehicle, setVehicle]=useState([]);
  useEffect(()=>{
    const getVehicle= async()=>{
      try {
        const response= await axios.get(`/api/vehicledetails/${id}`);
        setVehicle(response.data);
      } catch (error) {
        console.error("Error",error);
      }
      console.log(id)
    }
    getVehicle();
    },[id] );
  if(!vehicle){
    return <div>Vehicle Not Found</div>
  }
  return (
    <div>
        <div>
        <h1>Route: {vehicle.route}</h1>
        <img src={vehicle.photo} alt={vehicle.vehicle_model}></img>
        </div>
        <Link to='/studentreg'>Hi</Link>
    </div>
  )
}

export default Vehicledetails