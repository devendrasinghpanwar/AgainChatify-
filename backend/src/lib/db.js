import mongoose from "mongoose";

export const connectDB= async ()=>{
    try{
        // fetch the maongo uri frist then think about other thing ok 
        const {MONGO_URI}= process.env;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully:",conn.connection.host);
    }
    catch(error){
        console.error("error connection to MONGODB:",error);
        process.exit(1); // 1 status code means fail, 0 means success

    }
};