import mongoose, { mongo } from "mongoose";

export const DriverSchema= new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please provide a Email"],
        unique: [true, "Email Exists"],
    },
    mobile:{
        type: Number,
        required: [true, "Please provide a password"],
        unique:[false],
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        unique:false,
    }
});

export default mongoose.model.Drivers || mongoose.model('Driver',DriverSchema);