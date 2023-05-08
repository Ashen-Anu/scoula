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
        <div className="container">
            <div className="header">
                <h1>Our Vehicles</h1>
            </div>
            <div className="products">
            {vehicles.map(vehicle=>(
                <div className="product" key={vehicle._id}>
                    <div className="image">
                        <img src={vehicle.photo} alt=""></img>
                    </div>
                    <div className="name">
                        <h3>{vehicle.vehicle_model}</h3>
                        <span>{vehicle.vehicle_number}</span>
                    </div>
                    <p>{vehicle.route}</p>
                    <div className="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div className="view">
                        <button>View Vehicle</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
export default ViewVehicles