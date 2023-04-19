import React,{useEffect,useState} from "react";
import axios from 'axios';
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
                    <img src={vehicle.photo} alt={vehicle.vehicle_model}></img>
                </div> 
            ))}
        </div>
    )
}
export default ViewVehicles