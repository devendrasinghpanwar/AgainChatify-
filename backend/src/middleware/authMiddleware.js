// my algorithms to check the user is avaliable in databse or not 
import User from "../models/User.js";
import { ENV } from "../lib/env.js";
import jwt from "jsonwebtoken";


export const protectRoute =async(req,res,next)=>{ // it will take three arguments req( which is used for fetching data) , res for giving response to frontend from backend , and next is used for next () function which is used for calling next method ( function ) which on queue 
    console.log("Cookies:", req.cookies);

    // user  is exist of not in our databse
    try {
 
        const token = req.cookies.jwt; // fetch token from  database
        if(!token) return res.status(401).json({message:"Unauthorized: no token provided"});

        // after getting token decode(varify) it 
        
        const decoded = jwt.verify(token,ENV.JWT_SECRET); // varify whatever token you got from  databse using jwt   
        if(!decoded) return res.status(401).json({message:"Unauthorized Invalid Token"});

        // we've varified user token now it's time fo user 

        const user = await User.findById(decoded.userId).select("-password"); // find UserId from User model ( from databse) and leave password there 
        if(!user) return res.status(401).json({message:"User not found"}); 

        req.user=user; // if we found everything so put all this user in req.user ( which means current user)
        next(); //  call the next function is "function updateProfile" in authRoutes  

    } catch (error) {
        console.error("Error is protectRoute middleware: ",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}