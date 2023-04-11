import mongoose, { mongo } from "mongoose";

export const UserSchema= new mongoose.Schema({
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
    },
    role:{
        type: String,
        required: [true, "Please provide a role"],
        unique:false,
    },
    fname:{ type: String },
    lname:{ type: String },
    nic:{ type: String },
    address:{ type: String }
});

export default mongoose.model.Users || mongoose.model('User',UserSchema);