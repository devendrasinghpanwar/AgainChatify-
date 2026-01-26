import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
// this function will generate the token 


export const generateToken = (userId,res)=>{

    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configure");
    } 
     const token= jwt.sign({userId},ENV.JWT_SECRET,{expiresIn:"7d"});


     res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, // Milleseconds
        httpOnly:true, // prevent xss attacks: cross-site scripting
        sameSite:"strict", // CSRF attacks 
        secure:ENV.NODE_ENV ==="development"?false:true
     })


     return token;
}


// http:// localhost 
// https:// chatify.com  
