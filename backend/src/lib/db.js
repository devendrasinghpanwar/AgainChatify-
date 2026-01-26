import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB= async ()=>{
    try{
        // fetch the maongo uri frist then think about other thing ok 
        const {MONGO_URI}= ENV;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");

        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log("mongodb connected successfully:",conn.connection.host);
    }
    catch(error){
        console.error("error connection to MONGODB:",error);
        process.exit(1); // 1 status code means fail, 0 means success

    }
};