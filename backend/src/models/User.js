import { type } from "firebase/firestore/pipelines";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true    
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },

},{timestamps:true}) // createdAt & updatedAt

const User = mongoose.model("User",userSchema);// it means create a "User" model based on userSchema 

export default User;