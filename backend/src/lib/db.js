import mongoose from "mongoose";

export const connectDB= async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully:",conn.connection.host);
    }
    catch(error){
        console.error("error connection to MONGODB:",error);
        process.exit(1); // 1 status code means fail, 0 means success

    }
};