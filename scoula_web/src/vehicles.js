import React,{useEffect,useState} from "react";
import axios from 'axios';
import "./components/styles/home.css"
axios.defaults.baseURL= "http://localhost:8080";
const ViewVehicles= () =>{
    const [vehicles, setVehicles]= useState([]);
    useEffect(()=>{
        const getVehicledata = async()=>{
            const result= await axios('/api/getVehicledata');
            setVehicles(result.data);            
        };
        getVehicledata();
    },[]);
    return(
        <div>
            {vehicles.map(vehicle=>(
                <div key={ vehicle._id }>
                    <img className="listingimg" src={vehicle.photo}></img>
                    <h1>{vehicle.vehicle_model}</h1>
                </div> 
            ))}
        </div>
    )
}
export default ViewVehicles