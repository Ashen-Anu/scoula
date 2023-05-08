import mongoose, { mongo } from "mongoose";

export const OwnerSchema= new mongoose.Schema({
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

export default mongoose.model.Owners || mongoose.model('Owner',OwnerSchema);