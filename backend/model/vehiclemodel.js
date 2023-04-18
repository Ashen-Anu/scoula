import mongoose, { mongo } from "mongoose";

export const VehicleSchema= new mongoose.Schema({
    vehicle_model:{
        type: String,
        required: [true, "Please Enter the Vehicle Model"],
        unique: false,
    },
    vehicle_number:{
        type: String,
        required: [true, "Please provide the vehicle number"],
        unique:[true, "Vehicle Exists"],
    },
    mobile:{
        type: String,
        required: [true, "Please provide a contact number"],
        unique:false,
    },
    seating_capacity:{
        type: String,
        required: [true, "Please provide the seating capacity"],
        unique:false,
    },
    start_location:{
        type: String,
        required: [true, "Please provide the start location"],
        unique:false,
    },
    end_location:{
        type: String,
        required: [true, "Please provide the end location"],
        unique:false,
    },
    start_time:{
        type: String,
        required: [true, "Please provide the start time"],
        unique:false,
    },
    end_time:{
        type: String,
        required: [true, "Please provide the end time"],
        unique:false,
    },
    route:{
        type: String,
        required: [true, "Please provide the route"],
        unique:false,
    },
    photo:{
        type: String,
        required: [true, "Please provide a photo"],
        unique:false,
    },
});

export default mongoose.model.Vehicles || mongoose.model('Vehicle',VehicleSchema);